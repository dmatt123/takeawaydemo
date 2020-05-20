const express = require("express");
const multer = require("multer");

const productsRepo = require("../../repositories/products");
const usersRepo = require("../../repositories/users");
const newProdTemplate = require("../../views/admin/products/new");
const productsTemplate = require("../../views/admin/products/index");
const productEditTemplate = require("../../views/admin/products/edit");

const {
  productTitleValidation,
  productPriceValidation,
} = require("./validators");

const { handleErrors, isLoggedIn } = require("./middlewares");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// get all products
router.get("/admin/products", isLoggedIn, async (req, res) => {
  const products = await productsRepo.getAll();

  //  products.forEach(element => {
  //    console.log(element.title)
  //  });
  res.send(productsTemplate({ products }));
});

// router.get("/admin/products/sorted", isLoggedIn, async (req, res) => {
//   const products = await productsRepo.getAll();
//   products.sort(function(a, b) {
//     var textA = a.title
//     var textB = b.title
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
// });
//   res.send(productsTemplate({ products }));
// });

router.get("/admin/products/new", isLoggedIn, (req, res) => {
  res.send(newProdTemplate({}));
});

// save new product

router.post(
  "/admin/products/new",
  upload.single("image"),
  isLoggedIn,
  [productTitleValidation, productPriceValidation],
  handleErrors(newProdTemplate),
  async (req, res) => {
    let { title, price, RRP, metatitle, metadescription, description } = req.body;
    price = (Math.round(price * 100) / 100).toFixed(2)
    const product = await productsRepo.create({
      title,
      price,
      RRP,
      metatitle,
      metadescription,
      description,
      productUrl: title.replace(/ /g, "_"),
      categories: []
    });
    
    res.redirect("/admin/products");
  }
);

// get and update product

router.get("/admin/products/:id/edit", isLoggedIn, async (req, res) => {
  const product = await productsRepo.getOne(req.params.id);
  if (!product) {
    return res.send("no product found");
  }

  res.send(productEditTemplate({ product }));
});

//update product post route

router.post(
  "/admin/products/:id/edit",
  isLoggedIn,
  upload.single("image"),
  [productTitleValidation, productPriceValidation],
  handleErrors(productEditTemplate, async (req) => {
    const product = await productsRepo.getOne(req.params.id);
    return { product };
  }),
  async (req, res) => {
    const changes = req.body;

    if (req.file) {
      changes.image = req.file.buffer.toString("base64");
    }
    try {
      await productsRepo.update(req.params.id, changes);
    } catch {
      res.send(productEditTemplate({ errors, product }));
    }
    res.redirect("/admin/products");
  }
);

//delete product route

router.post("/admin/products/:id/delete", isLoggedIn, async (req, res) => {
  const product = await productsRepo.delete(req.params.id);
  res.redirect("/admin/products");
  // res.send("test")
});

//route for adding new fields
router.get("/admin/products/addnewfields", async (req, res) => {
  // const products = await productsRepo.getAll();
  // products.map (product => {
  // product.RRP = product.price * 2
  // product.metatitle = "metatitle",
  // product.metadescription = "metadesc"
  // product.productUrl = product.title.replace(/ /g, '_'
  // product.categories = []
  // product.upsellingProds = []
  // })
  // console.log(products)
  // await productsRepo.writeAll(products)
  // res.send("updated")
});

module.exports = router;

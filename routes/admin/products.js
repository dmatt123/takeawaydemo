const express = require("express");
const multer = require("multer");

const productsRepo = require("../../repositories/products");
const categoryRepo = require("../../repositories/category")
const usersRepo = require("../../repositories/users");
const extrasRepo = require("../../repositories/extras");
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
router.get("/products", isLoggedIn, async (req, res) => {
  const products = await productsRepo.getAll();

  //  products.forEach(element => {
  //    console.log(element.title)
  //  });
  res.send(productsTemplate({ products }));
});

// router.get("/products/sorted", isLoggedIn, async (req, res) => {
//   const products = await productsRepo.getAll();
//   products.sort(function(a, b) {
//     var textA = a.title
//     var textB = b.title
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
// });
//   res.send(productsTemplate({ products }));
// });

router.get("/products/new", isLoggedIn, async (req, res) => {
  let extras = await extrasRepo.getAll();
  
  res.send(newProdTemplate({extras}));
})

// save new product

router.post(
  "/products/new",
  upload.single("image"),
  isLoggedIn,
  [productTitleValidation, productPriceValidation],
  handleErrors(newProdTemplate),
  async (req, res) => {
    let { title, price, description, spice, extras } = req.body;
    console.log(extras)
    price = parseFloat((price * 100) / 100)
    if (extras.length < 1) {
      extras = []
    }

    const product = await productsRepo.create({
      title,
      price,
      description,
      spice,
      categories: [],
      extras
    });
    
    res.redirect("/admin/products");
  }
);

// get and update product

router.get("/products/:id/edit", isLoggedIn, async (req, res) => {
  const extras = await extrasRepo.getAll();
  const product = await productsRepo.getOne(req.params.id);
  if (!product) {
    return res.send("no product found");
  }

  res.send(productEditTemplate({ product, extras }));
});

//update product post route

router.post(
  "/products/:id/edit",
  isLoggedIn,
  upload.single("image"),
  [productTitleValidation, productPriceValidation],
  handleErrors(productEditTemplate, async (req) => {
    const product = await productsRepo.getOne(req.params.id);
    return { product };
  }),
  async (req, res) => {
    let { title, price, description, spice, extras } = req.body;
    price = parseFloat((price * 100) / 100)
    if (extras.length < 1) {
      extras = []
    }
    const changes = {title,price,description,spice, extras}
    try {
      await productsRepo.update(req.params.id, changes);
    } catch {
      res.send(productEditTemplate({ errors, product }));
    }
    res.redirect("/admin/products");
  }
);

//delete product route

router.post("/products/:id/delete", isLoggedIn, async (req, res) => {
let product = await productsRepo.getOne(req.params.id);
let category;
let products;
  ///REMEMBER TO DELETE PRODUCTID FROM ALL CATEGORIES

  for (prod of product.categories) {
   category = await categoryRepo.getOne(prod);
   products = category.products.filter((item) => item.id !== req.params.id);

   await categoryRepo.update(prod, { products });

  }
  
  const productDelete = await productsRepo.delete(req.params.id)

  res.redirect("/admin/products");
  // res.send("test")
});

//route for adding new fields
router.get("/products/addnewfields", async (req, res) => {
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

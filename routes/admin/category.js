const express = require("express");

const categoryRepo = require("../../repositories/category");
const productsRepo = require("../../repositories/products");

const newCategoryTemplate = require("../../views/admin/categories/new");
const categoryListTemplate = require("../../views/admin/categories/index");
const categoryEditTemplate = require("../../views/admin/categories/edit");
const categoryAddProductsTemplate = require("../../views/admin/categories/addproducts");

const { handleErrors, isLoggedIn } = require("./middlewares");

const router = express.Router();

// get all products
router.get("/admin/categories", isLoggedIn, async (req, res) => {
  const category = await categoryRepo.getAll();

  //  products.forEach(element => {
  //    console.log(element.title)
  //  });
  res.send(categoryListTemplate({ category }));
});

router.get(
  "/admin/categories/new",
  isLoggedIn,
  handleErrors(newCategoryTemplate),
  async (req, res) => {
    res.send(newCategoryTemplate({}));
  }
);

router.post("/admin/categories/new", isLoggedIn, async (req, res) => {
  const { name, metatitle, metadescription, description } = req.body;
  const category = await categoryRepo.create({
    name,
    metatitle,
    metadescription,
    description,
    categoryUrl: name.replace(/ /g, "_"),
    products: []
  });
  res.redirect("/admin/categories");
});

router.post("/admin/categories/:id/delete", isLoggedIn, async (req, res) => {
const products = await productsRepo.getAll();


  // for (prods of products) {
  //   console.log(prods.categories) }


  for ( product of products ) {
  if (product.categories.includes(req.params.id)) {
    product.categories.pop(req.params.id) }
    }

for (prods of products) {
    console.log(prods.categories) }


  const category = await categoryRepo.delete(req.params.id);
  await productsRepo.writeAll(products)

  res.redirect("/admin/categories");
});

router.get("/admin/categories/:id/edit", isLoggedIn, async (req, res) => {
  const category = await categoryRepo.getOne(req.params.id);
  if (!category) {
    return res.send("no category found");
  }

  res.send(categoryEditTemplate({ category }));
});

router.post("/admin/categories/:id/edit", isLoggedIn, async (req, res) => {
  const changes = req.body;
  console.log(changes);
  await categoryRepo.update(req.params.id, changes);
  res.redirect("/admin/categories");
});

router.get(
  "/admin/categories/:id/addproducts",
  isLoggedIn,
  async (req, res) => {
    const category = await categoryRepo.getOne(req.params.id);

    const products = await productsRepo.getAll();

    for (product of products) {
      const result = category.products.filter((products) => products.id === product.id);
      for (let i = 0; i < result.length; i++) {
         product.position = result[i].position
      }
      }

    res.send(categoryAddProductsTemplate({ category, products }));
  }
);

router.post("/admin/categories/changeRank/:id", isLoggedIn, async (req,res) => {
  const category = await categoryRepo.getOne(req.params.id);
  const {productIdChangeRank, changeRank} = req.body

  for (product of category.products) {
       if (product.id === productIdChangeRank) {
         product.position = changeRank
       }
      }
  await categoryRepo.update(req.params.id, category)
  res.redirect(`/admin/categories/${req.params.id}/addproducts`)

})

router.post(
  "/admin/categories/:id/addproducts",
  isLoggedIn,
  async (req, res) => {
    const { productId } = req.body;
    const category = await categoryRepo.getOne(req.params.id);
    const product = await productsRepo.getOne(productId);

    if (!category.products) {
      category.products = [];
    }

    if (!category.products.includes(product.id)) {
      category.products.push({id: product.id, position: 0});
      console.log(category);
      product.categories.push(req.params.id);
      await categoryRepo.update(req.params.id, { products: category.products });
      await productsRepo.update(product.id, { categories: product.categories });
      res.redirect(`/admin/categories/${category.id}/addproducts`);
    } else {
      res.send("product already in category");
    }
  }
);

router.post("/admin/categories/delete/:id", isLoggedIn, async (req, res) => {
  const { productIdDelete } = req.body;
  const category = await categoryRepo.getOne(req.params.id);
  const product = await productsRepo.getOne(productIdDelete);

  console.log(productIdDelete);

  const itemsRemove = category.products.filter(
    (item) => item.id !== productIdDelete
  );
  const categoryRemove = product.categories.filter(
    (item) => item !== req.params.id
  );

console.log(categoryRemove)

  await categoryRepo.update(req.params.id, { products: itemsRemove });
  await productsRepo.update(productIdDelete, { categories: categoryRemove });

  res.redirect(`/admin/categories/${req.params.id}/addproducts`);
});

module.exports = router;

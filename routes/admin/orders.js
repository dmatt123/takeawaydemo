const express = require("express");

const categoryRepo = require("../../repositories/category");
const productsRepo = require("../../repositories/products");
const ordersRepo = require("../../repositories/orders")

const orderIndexTemplate = require("../../views/admin/orders/index");
const orderSummary = require("../../views/admin/orders/orderSummary");

const { handleErrors, isLoggedIn } = require("./middlewares");

const router = express.Router();

// get all products
router.get("/admin/orders", isLoggedIn, async (req, res) => {
  const orders = await ordersRepo.getAll();

  //  products.forEach(element => {
  //    console.log(element.title)
  //  });
  res.send(orderIndexTemplate({ orders }));
});

router.get("/admin/orders/:id", isLoggedIn, async (req,res) => {
  const order = await ordersRepo.getOneBy({orderNo: parseInt(req.params.id)})

  console.log(order)
  
  res.send(orderSummary({order}))
})

module.exports = router;
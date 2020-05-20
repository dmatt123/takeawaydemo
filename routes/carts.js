const express = require("express");
const moment = require("moment");
const cartsRepo = require("../repositories/carts");
const productsRepo = require("../repositories/products");
const categoryRepo = require("../repositories/category");
const ordersRepo = require("../repositories/orders");
const promosRepo = require("../repositories/promotions")


const cartShowTemplate = require("../views/carts/show");
const orderCompleteTemplate = require("../views/orders/checkoutdetails");
const orderConfirmationTemplate = require("../views/orders/orderconfirmation")
const productListings = require("../views/products/index");

const router = express.Router();

router.get("/:cartId", async (req,res,next) => {
  const cart = await cartsRepo.getOne(req.params.cartId)
  .then(cart => {
    res.status(200).json({cart: cart})
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      message: err
    })
  })
})

router.post("/:cartId/:prodId", async (req,res) => {
let existingItem; 
const product = await productsRepo.getOne(req.params.prodId)

const cart = await cartsRepo.getOne(req.params.cartId)
.then(cart => {
existingItem = cart.items.find(
          (item) => item.id === req.params.prodId
        );
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.items.push({ id: req.params.prodId, title: product.title, price: product.price, quantity: 1 });
        }
         cartsRepo.update(cart.id, {
          items: cart.items,
        }); 
 res.status(200).json({
  cart: cart
  }); }
).catch(err => {
    console.log(err)
    res.status(500).json({error: err})
})
})

//show cart page
router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    res.redirect("/");
  }
  const categories = await categoryRepo.getAll();
  const cart = await cartsRepo.getOne(req.session.cartId);
  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items, categories, cart }));
});

router.post("/cart/:id/promo/remove", async (req,res) => {
 await cartsRepo.update(req.params.id, {discount: []})

 res.redirect('/cart')

})

// for discount codes
router.post("/cart", async (req,res) => {
  if (!req.session.cartId) {
    res.redirect("/");
  }

  let code = req.body.code.toUpperCase();

  const promo = await promosRepo.getOneBy({code: code})
  const categories = await categoryRepo.getAll();
  const cart = await cartsRepo.getOne(req.session.cartId);
  
  if (promo) {
    cart.discount = promo
  }
  
await cartsRepo.update(cart.id, cart)
  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }

  res.send(cartShowTemplate({items: cart.items, categories, cart}))


})

//get order complete page
router.get("/cart/review", async (req, res) => {
  const categories = await categoryRepo.getAll()
  if (!req.session.cartId) {
    res.redirect("/");
  }

  const cart = await cartsRepo.getOne(req.session.cartId);
  res.send(orderCompleteTemplate({categories}));
});

router.post("/cart/review", async (req, res) => {
  if (!req.session.cartId) {
    res.redirect("/");
  }
  const cart = await cartsRepo.getOne(req.session.cartId);
  const orders = await ordersRepo.getAll()
  const categories = await categoryRepo.getAll();
  console.log(orders.length)
  const {
    firstName,
    surname,
    email,
    firstLineDel,
    secondLineDel,
    postcode,
    telnumber,
  } = req.body;
  
  let orderTotal = 0


for (item of cart.items) {
  const orders = await ordersRepo.getAll()
  const product = await productsRepo.getOne(item.id)
  item.price = product.price
  item.title = product.title
  item.url = product.productUrl
  item.image = product.image
  orderTotal += item.quantity * item.price
}

const orderNo = orders.length + 1


const orderDate = moment().format('MMMM Do YYYY, h:mm:ss a')

let grandTotal = 0;

let discountValue;

  if (cart.discount.length === 0) {
    discountValue = 0;
    grandTotal = parseFloat((orderTotal / 100 * 100).toFixed(2));
  } else if 
(cart.discount.type == "£") {
  discountValue = cart.discount.discount;
  grandTotal = parseFloat((orderTotal - cart.discount.discount / 100 * 100).toFixed(2));
} else if 
(cart.discount.type == "%") {
      let percDisc = parseFloat(orderTotal * (cart.discount.discount / 100) / 100 * 100).toFixed(2)
      discountValue = percDisc;
     grandTotal = parseFloat((orderTotal - percDisc / 100 * 100).toFixed(2));
     }

if (grandTotal < 0) {
  grandTotal = 0 }

  const completedOrder = await ordersRepo.create({
    firstName,
    surname,
    email,
    firstLineDel,
    secondLineDel,
    postcode,
    telnumber,
    cart,
    orderNo,
    orderDate,
    orderTotal,
    discountValue,
    grandTotal
  });

  req.session.cartId = null;
  res.send(orderConfirmationTemplate({categories, completedOrder}))
});

//add product to cart
router.post("/cart/products/", async (req, res) => {
  //figure out the card - if cart, get cart number else assign new cart number?
  let cart;
  if (!req.session.cartId) {
    //create a cart
    cart = await cartsRepo.create({ items: [], discount: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  //either increment qty for existing product or push product into cart
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }


  await cartsRepo.update(cart.id, {
    items: cart.items,
  });
  res.send(200);
});

//delete product from cart
router.post("/cart/products/delete", async (req, res) => {
  const cart = await cartsRepo.getOne(req.session.cartId);
  console.log(cart);
  const { itemId } = req.body;

  const items = cart.items.filter((item) => item.id !== itemId);

  await cartsRepo.update(req.session.cartId, { items });
  res.redirect("/cart");
});

router.post("/cart/delete/:prodId", async (req,res) => {
  const cart = await cartsRepo.getOne(req.session.cartId)
  .then(cart => {
    const items = cart.items.filter((item) => item.id !== req.params.prodId);
    cartsRepo.update(req.session.cartId, {items})
    res.status(201).json({
      message: "item deleted from cart"
    })

  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
  

  
})

module.exports = router;

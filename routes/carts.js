const express = require("express");
const moment = require("moment");
const cartsRepo = require("../repositories/carts");
const productsRepo = require("../repositories/products");
const categoryRepo = require("../repositories/category");
const ordersRepo = require("../repositories/orders");
const promosRepo = require("../repositories/promotions")
const extrasRepo = require("../repositories/extras");



const {
  requireFirstName,
  requireSurname,
  requireFirstLineDel,
  requireSecondLineDel,
  requireTelNumber,
  Email,
  postcodeValidation
} = require("./admin/validators");

const {
  handleErrors
} = require("./admin/middlewares");

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
      error: err
    })
  })
})

router.get("/:cartId/:prodId/:extrasId/show", async(req,res,next) => {
  const extras = await extrasRepo.getOne(req.params.extrasId)
  .then(product => {
    res.status(200).json({product: product})
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })

})

router.post("/:cartId/:prodId/:extrasId/add", async (req,res) => {
  const product = await productsRepo.getOne(req.params.prodId)

    const allExtras = await extrasRepo.getOne(product.extras)
    console.log(allExtras)
  let extra = []
  
  
 let found = allExtras.products.find((item) => item.id == req.params.extrasId);
      
  extra.push(found);
    console.log(extra)
  
    
    product.price = (product.price + extra[0].price)




  const cart = await cartsRepo.getOne(req.params.cartId)
  .then(cart => {
            cart.items.push({ id: req.params.prodId + '-' + req.params.extrasId, title: product.title, price: product.price, extras: extra, quantity: 1 });
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

router.post("/:cartId/promos/:discount", async(req,res) => {

  let promo
  let cart
 const code = req.params.discount.toUpperCase()
 const cartId = req.params.cartId
 
 promo = await promosRepo.getOneBy({code: code})
 
cart = await cartsRepo.getOne(cartId);
 

 
 if (promo) {
  cart.discount = promo
}

 await cartsRepo.update(cart.id, cart)

 if (promo) {
   res.status(200).json({message: "Valid Code"})
} 

 console.log(cart)


 

})

// for discount codes
router.post("/cart/promos/discount", async (req,res) => {
  if (!req.session.cartId) {
    res.redirect("/");
  }

  let code = req.body.code.toUpperCase();
  console.log(code)

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

 

  res.send(orderCompleteTemplate({cart}));



})

//get order complete page
router.get("/cart/review", async (req, res) => {
  if (!req.session.cartId) {
    res.redirect("/takeawaydemo");
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  if (cart.items.length < 1) {
    res.redirect("/takeawaydemo")
  }
  res.send(orderCompleteTemplate({cart}));
});

router.post("/cart/review/confirm", 
[
  Email, 
  postcodeValidation,
  requireFirstName,
  requireSurname,
  requireFirstLineDel,
  requireTelNumber
]
  , handleErrors(orderCompleteTemplate), async (req, res) => {
  if (!req.session.cartId) {
    res.redirect("/");
  }


  const cart = await cartsRepo.getOne(req.session.cartId);
  
/// change this to display an error
  if (cart.items.length < 1) {
    res.redirect("/takeawaydemo")
  }

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
    deliveryTime

  } = req.body;
  
  let orderTotal = 0


for (item of cart.items) {
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
    grandTotal,
    deliveryTime
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

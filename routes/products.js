const express = require("express");
const productsRepo = require("../repositories/products");
const categoryRepo = require("../repositories/category");
const cartsRepo = require("../repositories/carts");

const productListings = require("../views/products/index");



const router = express.Router();


router.get('/takeawaydemo', async (req,res) => {

let cart

try {
cart = await cartsRepo.getOne(req.session.cartId) 
} catch {
req.session.cartId = null
}

if (cart === undefined) {
    console.log("undefined cart")
    req.session.cartId = null;
}
    if (!req.session.cartId) {
        //create a cart
        cart = await cartsRepo.create({ items: [], discount: [] });
        req.session.cartId = cart.id;
    }



    const products = await productsRepo.getAll()
    const category = await categoryRepo.getAll()
    const cartId = req.session.cartId 
res.send(productListings({products, category, cartId})) 

});



router.get('/department/:id', async (req,res) => {
    const categories = await categoryRepo.getAll()
    const category = await categoryRepo.getOneBy({categoryUrl: req.params.id})
    const products = await productsRepo.getAll()


    const deptProducts = products.filter((item) => item.categories.includes(category.id))

    for (product of deptProducts) {
    const result = category.products.filter((products) => products.id === product.id);
    for (let i = 0; i < result.length; i++) {
       product.position = result[i].position
    }
    }

    res.send(categoryListings({products: deptProducts, category: category, categories}))
}
)


//-----sort by price-----------///

// router.get('/sortedbyPrice', async (req,res) => {
//     const products = await productsRepo.getAll()
//       products.sort(function(a, b) {
//     var numA = a.price
//     var numB = b.price
//     return (numA > numB) ? -1 : (numA < numB) ? 1 : 0;
// });
// res.send(productListings({products}))
// })

//-----end of sort by price------///

//filter by Colour
router.get("/products/filters/colours", async (req,res) => {
    // const productstoFind = await productsRepo.getAll();
    
    // const products = productstoFind.filter((product) => product.colour === "Khaki");
    
    // res.send(productListings({products}))
    })

module.exports = router;
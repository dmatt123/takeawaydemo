const express = require("express");
const productsRepo = require("../repositories/products");
const categoryRepo = require("../repositories/category");
const cartsRepo = require("../repositories/carts");

const productListings = require("../views/products/index");
const productDisplayPage = require("../views/products/display.js");
const categoryListings = require("../views/products/categorylistings");

const searchListings = require("../views/products/searchlistings");


const router = express.Router();

router.get('/', async (req,res) => {
let cart
    if (!req.session.cartId) {
        //create a cart
        cart = await cartsRepo.create({ items: [], discount: [] });
        req.session.cartId = cart.id;
    };


if (req.query.search) { 
    let query = req.query.search
    const products = await productsRepo.getAll();
    const categories = await categoryRepo.getAll();

    query = query.toUpperCase()

    const results = products.filter((product) => product.title.toUpperCase().includes(query) || product.description.toUpperCase().includes(query))

res.send(searchListings({products: results,categories, query})) 
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
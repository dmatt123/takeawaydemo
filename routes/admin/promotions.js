const express = require("express");
const moment = require("moment");


const categoryRepo = require("../../repositories/category");
const productsRepo = require("../../repositories/products");
const promosRepo = require("../../repositories/promotions")

const promoTemplate = require("../../views/admin/promotions/index")

const { handleErrors, isLoggedIn } = require("./middlewares");

const router = express.Router();

// get all products
router.get("/admin/promos", isLoggedIn, async (req, res) => {
const promotions = await promosRepo.getAll();
res.send(promoTemplate({promotions}))
})

router.post("/admin/promos/new/create", isLoggedIn, async (req,res) => {
    console.log("route")
    const {code, type, discount} = req.body;

    const newpromotion = await promosRepo.create({code: code.toUpperCase(), type, discount, creationDate: orderDate = moment().format('MMMM Do YYYY, h:mm:ss a')});
    res.redirect("/admin/promos")
});

router.post("/admin/promos/:id/delete", isLoggedIn, async (req,res) => {
const promo = await promosRepo.delete(req.params.id)
res.redirect("/admin/promos/new")
});

module.exports = router;

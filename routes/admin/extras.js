const express = require("express");
const crypto = require("crypto");


const extrasRepo = require('../../repositories/extras');
const usersRepo = require('../../repositories/users');

const extrasIndexTemp = require('../../views/extras/index');
const extrasAddRemoveTemp = require('../../views/extras/addextras');

const { handleErrors, isLoggedIn } = require("./middlewares");

const router = express.Router();


// get all Extras
router.get("/", isLoggedIn, async (req, res) => {
    const extras = await extrasRepo.getAll();
  
    res.send(extrasIndexTemp({extras}))
    // send extras list template
  });


  router.post("/create/newExtra", isLoggedIn, async (req, res) => {
    const { title } = req.body;
    const extras = await extrasRepo.create({
      title,
      products: []
    });
    res.redirect("/admin/extras");
  });

  router.get("/addExtras/:id", isLoggedIn, async (req,res) => {
      const extras = await extrasRepo.getOne(req.params.id)

      res.send(extrasAddRemoveTemp({extras}))
  })

  router.post("/addProducts/:id", isLoggedIn, async (req,res) => {
      let products
      let {name, price} = req.body;
        price = parseFloat(price * 100 / 100)
      const extras = await extrasRepo.getOne(req.params.id);
    extras.products.push({name, price, id: crypto.randomBytes(4).toString("hex")})
    console.log(extras);

    await extrasRepo.update(req.params.id, extras)
    res.redirect(`/admin/extras/addExtras/${extras.id}`)

  })


  router.post("/delete/:id", isLoggedIn, async (req, res) => {
    
      const extras = await extrasRepo.delete(req.params.id);
    
      res.redirect("/admin/extras");
    });

    router.post("/delete/:extraId/:prodId", isLoggedIn, async (req, res) => {
        console.log(req.params)
        const extras = await extrasRepo.getOne(req.params.extraId);
      console.log(extras)
        const itemRemove = extras.products.filter(
            (item) => item.id !== req.params.prodId
          );

          await extrasRepo.update(req.params.extraId, { products: itemRemove });


        res.redirect(`/admin/extras/addExtras/${req.params.extraId}`);
      });


module.exports = router;

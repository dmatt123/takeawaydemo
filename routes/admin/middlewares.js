const { validationResult } = require("express-validator");

module.exports = {
  handleErrors(templateFunc, dataCb) {
    let cart = {}
    return async (req, res, next) => {
      const errors = validationResult(req);
      cart.id = req.session.cartId
      console.log(req.body)
      prevValues = req.body
      if (!errors.isEmpty()) {
        let data = {};
        if (dataCb) {
          data = await dataCb(req);
        }
        return res.send(templateFunc({ prevValues, cart, errors, ...data }));
      }
      next();
    };
  },

  isLoggedIn(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/login");
    }
    next();
  },
};

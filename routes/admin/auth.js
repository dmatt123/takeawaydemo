const express = require("express");

const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");

const {
  requireEmail,
  requirePassword,
  requirePasswordConf,
  existingEmail,
  existingPassword,
} = require("./validators");

const {
  handleErrors
} = require("./middlewares")

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConf], handleErrors(signupTemplate),
  async (req, res) => {
 
    const { email, password, passwordConfirmation } = req.body;

    //create a new user code
    const user = await usersRepo.create({ email: email, password: password });

    req.session.userId = user.id;

    res.redirect('/admin/products')
  }
);

router.get("/login", (req, res) => {
  res.send(signinTemplate({ req }));
});

router.post("/login", [existingEmail, existingPassword], handleErrors(signinTemplate), async (req, res) => {
  const { email, password } = req.body;

  res.redirect('/admin/products')
});

router.get("/signout", async (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

module.exports = router;

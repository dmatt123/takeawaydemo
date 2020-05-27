const { check } = require("express-validator");
const usersRepo = require("../../repositories/users");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error("Email in use");
      }
    }),
  existingEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email address not found")
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email: email });
      if (!existingUser) {
        throw new Error("Email address not found on our db");
      }
    }),
  existingPassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Incorrect Password")
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email });
      if (user) {
        const validPassword = await usersRepo.comparePassword(
          user.password,
          password
        );
        if (!validPassword) {
          throw new Error("incorrect password");
        }
        req.session.userId = user.id;
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),

  requirePasswordConf: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters")
    .custom(async (passwordConfirmation, { req }) => {
      if (passwordConfirmation != req.body.password) {
        throw new Error("passwords must match");
      }
    }),

  productTitleValidation: check("title")
    .trim()
    .isLength({ min: 5, max: 40 })
    .withMessage("Must be a valid title between 5 and 40 characters"),
    
  postcodeValidation: check("postcode")
  .trim()
  .isLength({ min: 6, max: 10 })
  .withMessage("Postcode is invalid"),

  requireFirstName: check("firstName")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("First Name must be provided"),

  requireSurname: check("surname")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("Surname must be provided"),

  requireFirstLineDel: check("firstLineDel")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("First Line of address must be provided"),

  requireTelNumber: check("telNumber")
  .trim()
  .isInt()
  .isLength({ min: 6, max: 50 })
  .withMessage("Telephone Number must be provided"),

  Email: check("email")
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage("Must be a valid email address"),

  productPriceValidation: check("price")
    .trim()
    .isFloat({ min: 1 })
    .toFloat()
    .withMessage("Must be a price greater than 1"),
};

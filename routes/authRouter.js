const { signup, login } = require("../controllers/authcontroller");
const { sendEmail, checkUser } = require("../controllers/sendEmail");
const { signupValidation, loginValidation } = require("../middlewares/authValidation");

const router = require("express").Router();

router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, signup);

router.post("/sendOtp", sendEmail);

router.post('/check-user', checkUser);

module.exports = router;
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const fetchuser=require("../middleware/fetchuser")
// using jwttoken for authorization ki user vahi hai ki nhi

const jwt = require("jsonwebtoken");
// USING bcrypt to generate salts and hashes
const bcrypt = require("bcryptjs");
// ROUTE1: Creating a post request at /api/auth/createuser and creating a new user no login reqruied
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must have a minimum of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Validating if any error has occurred due to above conditions are mismatch
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Finding if user with same email exists or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      }
      // size of salt
      const salt = bcrypt.genSaltSync(10);
      let seqPass = bcrypt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: seqPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const awthToken = jwt.sign(data, JWT_SECRET_KEY);

      res.json(awthToken);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error });
    }
  }
);

//ROUTE2:Auntheicating a new user,login requried
router.post(
  "/login",
  [
    // User login karega apne email or password se to phele ye dekhenge valid emaail hai bhi ya nhi
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must have a minimum of 5 characters").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Validating if any error has occurred due to above conditions are mismatch
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({email});
      // checinkg if the user with the above email exits or not
      if (!user) {
        return res.status(400).json({ errors: "Invalid login credentials" });
      }
      // Agar  uss email ke naam se user hai to check kare kya password sahi dala hai ki nhi
      let passwordEntered = bcrypt.compareSync(password, user.password);
    
      if (!passwordEntered) {
        return res.status(400).json({ errors: "Invalid login credentials" });
      }
      // if sahi to ek token bhegdo usko taki baar baar aunthenticate na karna pade
      const data = {
        user: {
          id: user.id
        },
      };
      const awthToken = jwt.sign(data, JWT_SECRET_KEY);

      return res.json(awthToken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async function (req, res) {
try {
  let userId=req.user.id;

  const user=await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
})

module.exports = router;

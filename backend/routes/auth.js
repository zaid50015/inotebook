require('dotenv').config()
const express=require("express")
const router=express.Router();
const { body, validationResult } = require('express-validator');
const User=require("../models/User")
// using jwttoken for authorization ki user vahi hai ki nhi
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY

const  jwt = require('jsonwebtoken');
// USING bcrypt to generate salts and hashes
const bcrypt = require('bcryptjs');
// Creating a post request at /api/auth/createuser
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
  ],async(req,res)=>{
    const errors = validationResult(req);
    // Validating if any error has occurred due to above conditions are mismatch
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        //Finding if user with same email exists or not
        let user= await User.findOne({email:req.body.email})
        if(user){
          return res.status(400).json({email:"Email already exists"})
        }
        // size of salt
        const salt = bcrypt.genSaltSync(10);
        let seqPass= bcrypt.hashSync(req.body.password,salt);
         user=await User.create({
          name: req.body.name,
          email: req.body.email,
          password: seqPass
      })
      const data={
        user:{
          id:user.id
        }
      }
      const awthToken=jwt.sign(data,JWT_SECRET_KEY)

        res.json(awthToken)
      } catch (error) {
        console.log("Some error occured")
        res.status(500).json({error})
      }
   
   
})
module.exports=router
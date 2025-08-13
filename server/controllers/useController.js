import validator from 'validator'; // Used for validating strings like email, URLs, etc.
import bcrypt from 'bcrypt'; // Used for hashing passwords and comparing hashed passwords
import jwt from 'jsonwebtoken'; // Used for creating and verifying JSON Web Tokens (JWT)
import userModel from '../models/userModels.js';

//Create JWT Token
const createToken = (id) => {
  // jwt.sign(payload, secret) → Creates a token with user ID as payload, signed with secret from .env
  return jwt.sign({id},process.env.JWT_SECRET)
}


//Route for userlogin
const loginUser = async(req, res) =>{

  try{
    const { email, password } = req.body;

    // Find a user in the database by email
    const user = await userModel.findOne({email})
     // If user doesn't exist OR password doesn't match stored hash 
    if(!user || !(await bcrypt.compare(password, user.password))){
      return res.json({success:false, message: "Invalid  password or username"})
    }else{
       // If credentials are valid → generate a JWT token for the user
      const token = createToken(user._id)
      res.json({success:true, token})
    }

  }catch(error){
    console.log(error)
    res.json({success:false, message:error.message})
  }

}


//Route for user registration
const registerUser = async (req, res) => {
  try{

    const {name, password, email} = req.body;

    //checking email if existing on the user schema
    const exist = await userModel.findOne({email});
    if(exist){
      return res.json({success:false, message:"User already exist"})
    }

    //validate email format & strong password
    if(!validator.isEmail(email)){
      return res.json({success:false, message:"Please enter valid email"})
    }
    if(password.length < 8){
      return res.json({success:false, message:"Please enter a strong password"})
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a new user document with hashed password
    const newUser = new userModel({
      name,
      email,
      password:hashedPassword
    })
    // Save the new user to the database
    const user = await newUser.save()

    // Generate JWT token for the newly registered user
    const token = createToken(user._id)
    res.json({success:true, token})

  }catch(error){
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

//Route for admin login
const adminLogin = async (req, res) => {
  try{
    const {email, password} = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password, process.env.JWT_SECRET)
      res.json({success:true,token})
    }else{
      res.json({succes:false, message:"Invalid Credentials"})
    }

  }catch(error){
    console.log(error)
    res.json({success:false, message:error})
  }
}


export { loginUser, registerUser, adminLogin} 
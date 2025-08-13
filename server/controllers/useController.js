import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';

//Create JWT Token
const createToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET)
}


//Route for userlogin
const loginUser = async(req, res) =>{

  try{
    const { email, password } = req.body;

    const user = await userModel.findOne({email})
    if(!user || !(await bcrypt.compare(password, user.password))){
      return res.json({success:false, message: "Invalid  password or username"})
    }else{
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

    const newUser = new userModel({
      name,
      email,
      password:hashedPassword
    })

    const user = await newUser.save()

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
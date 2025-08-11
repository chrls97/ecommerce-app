import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';

//App Config
const app = express();
const port = process.env.PORT || 4000;

//database connection
connectDB();
//cloudinary connection
connectCloudinary();



//Middlewares
app.use(express.json())
//access backend from any ip 
app.use(cors())

// api endpoint
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send("API Working")
})


app.listen(port, () => console.log("Server Started on Port: "+ port))
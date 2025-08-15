import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

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
//user router
app.use('/api/user', userRouter)
//product router
app.use('/api/product', productRouter)
//cart router
app.use('/api/cart', cartRouter)
//order router
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send("API Working")
})


app.listen(port, () => console.log("Server Started on Port: "+ port))
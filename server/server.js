import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js'; //this imports the connectDB function from the mongodb.js file
import authRouter from './routes/authRoutes.js'; //this imports the authRouter from the authRoutes.js file
import userRouter from './routes/userRoutes.js';

const app=express();
const port= process.env.PORT || 4000
connectDB(); //this calls the connectDB function to connect to the database

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['https://login-signup-jwt-frontend-q7t3.onrender.com'];

app.use(cors({
  origin: allowedOrigins[0], // explicitly allow only this
  credentials: true,         // allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors()); // allow preflight


app.use('/api/auth',authRouter)//this will use the authRouter for all routes that start with /api/auth
app.use('/api/user',userRouter)//this will use the userAuth middleware for all routes that start with /api/user

app.get('/',(req,res)=>{ //this is a test route to see if the server is working
    res.send('Hello World');
}); //now if we go to localhost:4000 we will see Hello World
app.listen(port,()=>console.log(`Server started on PORT: ${port}`)); //this will start the server on port 4000 but if wetry to go to localhost:4000 we will get a cannot GET/ error if we didnt set up app.get('/')

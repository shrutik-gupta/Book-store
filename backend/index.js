import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//middleware for parsing req body of json format
app.use(express.json());

//middleware for handling cors policy

//OPTION 1 - allow all origins 
app.use(cors());

//OPTION 2 - allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (req,res)=>{
    res.send("Hello world")
})

app.use('/books', booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App is connected to database");
        app.listen(PORT, ()=>{
            console.log(`app is running on port ${PORT}`)
        })
    })
    .catch((e)=>{
        console.log(e)
    })


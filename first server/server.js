import 'dotenv/config';
import express from 'express'
import {router1} from './routers/auth-router.js'
import { router2 } from './routers/contact-router.js';
import { router3 } from './routers/service-router.js';
import { router4 } from './routers/admin-router.js';
import mongodbCon  from './utils/db.js';
import { errorMiddleware } from './middlewares/error-middleware.js';
import cors from "cors";

const app = express();


var corsOptions = {
    origin: 'http://localhost:3000',
    credentials : true,
    method : "GET , POST, PUT, DELETE , PATCH , HEAD",

  }

// middleware
app.use(cors(corsOptions));
app.use( express.json());

app.use("/auth" , router1);
app.use("/auth" , router2);
app.use("/data" , router3);
app.use("/admin" , router4);

app.get( '/' , (req , res)=>{
    res.status(200).send("hello world")
} )


app.use(errorMiddleware);

mongodbCon().then( ()=>{
    app.listen('5000', ()=>{
        console.log("server is running on port 5000")
    })
} )

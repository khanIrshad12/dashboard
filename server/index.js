import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet'
import bodyParser from 'body-parser';
import kpiRoutes from './routes/kpi.js'
import KPI from './models/KPI.js';
import { kpis,products,transactions } from './data/data.js';
import Product from './models/Product.js';
import TransactionRoute from './routes/Transaction.js';
import Transaction from './models/Transaction.js';
import ProductRoutes from "./routes/Product.js"
/*Configurations*/
dotenv.config();        
const app=express();
app.use(express.json()); //inbulid middleware in express for parse the json files
app.use(helmet());// its use for the secuirty purpose
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json());//inbulid middleware in express for parse the respoonse from the user to the network
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

/* Routes*/
app.use('/kpi',kpiRoutes);
app.use("/product",ProductRoutes);
app.use('/transaction',TransactionRoute)
/*mongoose database connection*/ 

const PORT =process.env.PORT || 9000;

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
).then(async()=>{
    app.listen(PORT,()=>console.log(`Server Connected to ${PORT}` ));

    /* await mongoose.connection.db.dropDatabase();
    KPI.insertMany(kpis)*/
    //Product.insertMany(products);
    //Transaction.insertMany(transactions);

}).catch((err)=> console.log(`error: ${err}`))
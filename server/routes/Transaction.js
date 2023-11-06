import express from "express";
import Transaction from '../models/Transaction.js';
const routes = express.Router();

routes.get("/transactions",async(req,res)=>{
    try{
        const Transactions=await Transaction.find().limit(50).sort({createdOn:-1})
        res.status(200).json(Transactions);
        
    }catch(error)
    {
    
        res.status(404).json({message:error});
    }
})
export default routes;
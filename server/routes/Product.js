import express from "express";
import product from '../models/Product.js';
const routes = express.Router();

routes.get("/products",async(req,res)=>{
    try{
        const products=await product.find()
        res.status(200).json(products);
        
    }catch(error)
    {
    
        res.status(404).json({message:error});
    }
})
export default routes;
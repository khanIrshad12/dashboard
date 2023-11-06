import express from "express";
import KPI from '../models/KPI.js';
const routes = express.Router();

routes.get("/kpis",async(req,res)=>{
    try{
        const kpis=await KPI.find()
        res.status(200).json(kpis);
        
    }catch(error)
    {
    
        res.status(404).json({message:error});
    }
})
export default routes;
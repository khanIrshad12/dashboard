import mongoose from "mongoose";
import {loadType} from "mongoose-currency";
loadType(mongoose);

const Schema=mongoose.Schema;
const productSchema = new Schema({
    price:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    },
    expense:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    },
    transactions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction"
    }],
  
},{timestamps:true,toJSON:{getters:true}});

const Product = mongoose.model('product',productSchema);

export default Product
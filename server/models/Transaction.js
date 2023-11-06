import mongoose from "mongoose";
import {loadType} from "mongoose-currency";
loadType(mongoose);

const Schema=mongoose.Schema;
const transactionSchema = new Schema({
    amount:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    },
    buyer:String,
    productIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
  
},{timestamps:true,toJSON:{getters:true}});

const Transaction = mongoose.model('transaction',transactionSchema);

export default Transaction
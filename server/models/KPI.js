import mongoose from "mongoose";
import {loadType} from "mongoose-currency";
loadType(mongoose);

const Schema=mongoose.Schema;

//Montly Schema
const MonthSchema=new Schema({
    month:String,
    revenue:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    },
    expenses:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    },
    operationalExpenses:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    },
    nonOperationalExpenses:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    }
},{toJSON:{getters:true}});

//DailySchema
const daySchema=new Schema({
    date:String,
    revenue:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    },
    expenses:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    }
},{toJSON:{getters:true}});


const kpiSchema = new Schema({
    totalProfit:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    },
    totalRevenus:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    },
    totalProfit:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    },
    totalExpenses:{
        type:mongoose.Types.Currency,
        Currency:"USD",
        get:(v)=> v/100
    },
    expensesByCategory:{
        type:Map,
        of:{
            type:mongoose.Types.Currency,
            Currency:"USD",
            get:(v)=> v/100
        }
    },
    monthlyData:[MonthSchema],
    dailyData:[daySchema]


},{timestamps:true,toJSON:{getters:true}});

const KPI = mongoose.model('KPI',kpiSchema);

export default KPI
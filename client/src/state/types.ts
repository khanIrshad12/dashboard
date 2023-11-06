//this file is use for avoiding the typscript error here we specifing the data model which is going to be used in rechart.
//GetKipsResponse is specified in api.ts file this will act as a argument with data will going to be passed
export interface month {
    id:string;
  month: string;
  revenue: Number;
  expenses: Number;
  nonOperationalExpenses:Number;
  operationalExpenses:Number;
}
export interface expensesByCategory {
  salaries: Number;
  services: Number;
  supplies: Number;
}
export interface Days{
    _id:string;
    date: string;
  revenue: Number;
  expenses: Number;
}
export interface GetKpisResponse {
  id: string;
  _id: string;
  __v: Number;
  totalExpenses: Number;
  totalProfit: Number;
  totalRevenue: Number;
  monthlyData: Array<month>;
  expensesByCategory: expensesByCategory;
  dailyData:Array<Days>;
  createAt:string;
  updateAt:string;
}
export interface GetProductResponse{
  id:string;
  _id:string;
  __v:Number
  price:Number;
  expense:Number;
  transactions:Array<String>;
}
export interface GetTransactionResponse{
  id:string;
  _id:string;
  __v:Number
  buyer:string;
  amount:Number;
  productIds:Array<String>;
}

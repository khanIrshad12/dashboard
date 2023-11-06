import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const Row1 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();
  //console.log("Data", data);
  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);

  const revenueProfit=useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: revenue - expenses
        };
      })
    );
  }, [data]);

  const MonthbyMonth = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue,operationalExpenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          operationalExpenses: operationalExpenses,
        };
      })
    );
  }, [data]);
  return (
    <>
      <DashboardBox gridArea="a">
      <BoxHeader
        title="Revenue & Expenses"
        subtitle="Top one indicates revenue and bottom one indicate expenses"
        sideText="+4%"
        />
        <div style={{width:"100%" ,height:"100%"}}>
        <ResponsiveContainer>
        <AreaChart
           width={500}
           height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              bottom: 60,
              left: -10,
            }}
          >
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              domain={[8000, 23000]}
              style={{ fontSize: "10px" }}
            />
            <defs>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#71f5de" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#71f5de" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#71f5de" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#71f5de" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              dataKey="revenue"
              type="monotone"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              dataKey="expenses"
              type="monotone"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
            <Tooltip />
          </AreaChart>
          </ResponsiveContainer>
        </div>
         
          
      </DashboardBox>
             {/*Profit & Revenue second chart 0f b */}
      <DashboardBox  gridArea="b">
     
        <BoxHeader
        title="Profit & Revenue"
        subtitle="Top one indicates revenue and bottom one indicate Profit"
        sideText="+4%"
        />
        <div style={{width:"100%",height:"100%"}}> 
        <ResponsiveContainer >
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              bottom: 55,
              left: -10,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              
              style={{ fontSize: "10px" }}
            />
            <Legend verticalAlign="top" wrapperStyle={{
              fontWeight:700,
              margin:'0 0 10px 0'
            }} height={20} />
            <Line
              dataKey="profit"
              yAxisId="left"
              type="monotone"
              stroke={palette.primary.tertiary}
              
            />
            <Line
              dataKey="revenue"
              yAxisId="right"
              type="monotone"
              dot={true}
              stroke={palette.primary.main}
              
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
        </div>
      </DashboardBox>

      {/*Profit & Revenue second chart 0f c */}
      <DashboardBox gridArea="c">
        
      <BoxHeader
        title="Month By Month Revensue with Optional Expenses"
        subtitle="graph represent the revenue and optionalExpenses Month by Month"
        sideText="+4%"
        />
        <div style={{width:"100%" ,height:"100%"}}> 
      <ResponsiveContainer >
      <BarChart
          width={500}
          height={300}
          data={MonthbyMonth}
          margin={{
            top: 17,
            right: 15,
            left: -5,
            bottom: 58,
          }}
        >
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#71f5de" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#71f5de" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="optionalExpences" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
          <XAxis  tickLine={false} style={{ fontSize: "10px" }} dataKey="name" />
          <YAxis tickLine={false} axisLine={false} style={{ fontSize: "10px" }}/>
          <Tooltip />
          <Legend  wrapperStyle={{
              fontWeight:700,
              color:"white",
              margin:'0 0 10px 0'
            }} />
          <Bar dataKey="revenue" stackId="a"  
              fill="url(#colorRevenue)" />
          <Bar dataKey="operationalExpenses" stackId="a"
              fill="url(#optionalExpences)" />
        </BarChart>
        </ResponsiveContainer>
        </div>
      </DashboardBox>
    </>
  );
};

export default Row1;

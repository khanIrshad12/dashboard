import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetwwen";
import { useGetKpisQuery, useGetProductQuery } from "@/state/api";
import { useTheme } from "@mui/material/styles";
import {Box,Typography} from '@mui/material'
import { useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
const pieData = [
  { name: "Group A", value: 500 },
  { name: "Group B", value: 300 },
];
const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: productdata } = useGetProductQuery();
  console.log("Products", productdata);
  const { data: kpiData } = useGetKpisQuery();
  console.log(kpiData);
  const OENOE = useMemo(() => {
    return (
      kpiData &&
      kpiData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            operationalExpenses: operationalExpenses,
            nonOperationalExpenses: nonOperationalExpenses,
          };
        }
      )
    );
  }, [kpiData]);

  const price_Expense=useMemo(()=>{
    return(
      productdata && productdata.map(({_id,expense,price})=>{
        return{
          _id:_id,
          expense:expense,
          price:price
        }
      })
    )
  },[productdata])

  return (
    <>
      <DashboardBox  gridArea="d">
        <BoxHeader
          title="operationalExpenses & NONOpE"
          subtitle="Top one indicates revenue and other indicate Profit"
          sideText="+4%"
        />
        <div style={{ width: "100%", height: "100%" }}>
          <ResponsiveContainer>
            <LineChart
              width={500}
              height={400}
              data={OENOE}
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

              <Line
                dataKey="operationalExpenses"
                yAxisId="left"
                type="monotone"
                stroke={palette.primary.tertiary}
              />
              <Line
                dataKey="nonOperationalExpenses"
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
      <DashboardBox gridArea="e">
        <BoxHeader title="Target & capacity" sideText="+4%"/>
        <FlexBetween mt="0.25rem" gap="1.6rem" pr="1rem">
        <PieChart width={110} height={100}>
          <Pie
            data={pieData}
            stroke="none"
            innerRadius={18}
            outerRadius={32}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index]} />
            ))}
          </Pie>
        </PieChart>
        <Box mr="0.7rem" flexBasis="40%" textAlign="center">
          <Typography variant="h5" >Target Sales</Typography>
          <Typography variant="h3" color={palette.primary[300]} m="0.3rem 0">88.7</Typography>
          <Typography variant="h6">Finanace goals of the campaign that is desired </Typography>
        </Box>
        <Box flexBasis="40%">
          <Typography variant="h5" >Losses in Revenues</Typography>
          <Typography variant="h6">Loses are down 25%</Typography>
          <Typography variant="h5"mt="0.4rem">Profit Margins </Typography>
          <Typography variant="h6">Margin are up to 30% from last month </Typography>
        </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader title=" Product Price Vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 25,
            bottom: 40,
            left: -10,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]} />
          <XAxis type="number" dataKey="price" name="price" axisLine={false} tickLine={false} style={{fontSize:'10px'}} tickFormatter={(v)=>`$${v}`} />
          <YAxis type="number" dataKey="expense" name="expense" axisLine={false} tickLine={false} style={{fontSize:'10px'}} tickFormatter={(v)=>`$${v}`} />
          <ZAxis type="number" range={[20]} />
          <Tooltip formatter={(v) => `$${v}`} />
          <Scatter name="Price and Expenses" data={price_Expense} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;

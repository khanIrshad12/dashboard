import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetwwen";
import {
  useGetKpisQuery,
  useGetProductQuery,
  useGetTranactionQuery,
} from "@/state/api";

import { Box, useTheme,Typography } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, LabelList, Pie, PieChart } from "recharts";
const Row3 = () => {
  const { palette } = useTheme();
  const pieColors =[palette.primary[800],palette.primary[500]]
  const { data: kpiData } = useGetKpisQuery();
  const { data: productdata } = useGetProductQuery();
  const { data: TransactionData } = useGetTranactionQuery();
 console.log("kpis",kpiData);

const piechartData=useMemo(()=>{
  if(kpiData){
  const totalExpenses= kpiData[0].totalExpenses;
  return Object.entries(kpiData[0].expensesByCategory).map(
    ([key,value])=>{
      return[
        {
          name:key,
          value:value
        },
        {
          name:`${key} of Total`,
          value:totalExpenses-value
        }
      ]
    }
  )
}
},[kpiData])

  
  const columnDetails = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expenses",
      renderCell: (params: GridCellParams) => `$${params.value}`,
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      renderCell: (params: GridCellParams) => `$${params.value}`,
      flex: 0.5,
    },
  ];
  const TransactionDetails=[{
    field: "_id",
    headerName: "id",
    flex: 1,
  },
  {
    field: "buyer",
    headerName: "Buyer",

    flex: 0.67,
  },
  {
    field: "amount",
    headerName: "Amount",
    renderCell: (params: GridCellParams) => {
      console.log("Cell Params:", ); // Log the params object
      return `$${params.value}`;
    },
    flex: 0.35,
  },
  {
    field:"productIds",
    headerName:"counts",

    renderCell: (params: GridCellParams)=> (params.value as Array<string>).length,
    flex:0.1,
  }

];
  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="Products Details"
          sideText={`${productdata?.length}products`}
        />
        <Box
          mt="0.25rem"
          padding="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderRadius: `1px solid ${palette.grey[800]}`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "none",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            rows={productdata || []}
            columns={columnDetails}
            hideFooter={true}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="h">
      <BoxHeader
          title="Recent Transactions"
          sideText={`${TransactionData?.length} Transactions`}
        />
        <Box
          mt="1rem"
          padding="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderRadius: `1px solid ${palette.grey[800]}`,
              
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "none",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            rows={TransactionData || []}
            columns={TransactionDetails}
            hideFooter={true}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="i">
        <BoxHeader title="expense breakdown by catagory" sideText="+4%" />
        <FlexBetween p="0 1rem" gap= "0.5rem" textAlign="center">
         {piechartData?.map((data,i)=>(
          <Box key={`${data[0].name}-${i}` } >
            <PieChart width={110} height={85} >
          <Pie
            data={data}
            stroke="none"
            innerRadius={18}
            outerRadius={35}
            paddingAngle={2}
            dataKey="value"
          >
           
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index]} />
            ))}
          </Pie>
        </PieChart>
        <Typography  variant="h5" >{data[0].name}</Typography>
          </Box>
         )) }
        </FlexBetween>
      </DashboardBox>
      <DashboardBox  gridArea="j">
        <BoxHeader title="Overall Summary And Explanation Data" sideText="+15%" />
        <Box 
        height="15px"
        margin="1.25rem 1rem 0.4rem 1rem"
        bgcolor={palette.primary[800]}
        borderRadius="1rem"
        >
          <Box
           height="15px"
           bgcolor={palette.primary[600]}
           borderRadius="1rem"
           width="40%"
          >
          </Box>
        </Box>
        <Typography variant="h6" p="8px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa modi blanditiis sequi praesentium esse. Tempore quaerat similique rerum atque dolores. Labore sint, ipsam ut distinctio voluptatibus repellat eum obcaecati laborum!</Typography>
      </DashboardBox>
    </>
  );
};
export default Row3;

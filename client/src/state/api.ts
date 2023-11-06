// redux tool kit api connection

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductResponse,GetTransactionResponse } from "./types";
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis","products","transactions"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getProduct: build.query<Array<GetProductResponse>, void>({
      query: () => "product/products/",
      providesTags: ["products"],
    }),
    getTranaction: build.query<Array<GetTransactionResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["transactions"],
    }),
  }),
});

export const { useGetKpisQuery,useGetProductQuery,useGetTranactionQuery } = api;

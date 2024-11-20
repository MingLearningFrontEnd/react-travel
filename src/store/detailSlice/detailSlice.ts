import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



interface DetailSlice {
    loading: boolean,
    error: any | null,
    products: any,
}

const initialState: DetailSlice = {
    loading: true,
    error: null,
    products: null
}

const detailSlice = createSlice({
    name: 'detailSlice',
    initialState,
    reducers: {
        // fetchStart: (state) => {
        //     state.loading = true
        // },
        // fetchSuccess: (state, { payload }) => {
        //     state.products = payload
        //     state.loading = false
        //     state.error = null
        // },
        // fetchFail: (state, { payload }) => {
        //     state.loading = false
        //     state.error = payload
        // }
    },
    extraReducers:(builder)=>{
        builder.addCase(getProductDetail.pending, (state)=>{
            state.loading = true
        }).addCase(getProductDetail.fulfilled,(state, { payload })=>{
            state.products = payload
            state.loading = false
            state.error = null
        }).addCase(getProductDetail.rejected, (state, {payload})=>{
            state.loading = false
            state.error = payload
        })

       
    }
})

 export const getProductDetail = createAsyncThunk(
    'detailSlice/getProductDetail',
    async(touristRouteId:string)=>{
       const {data} = await axios.get(`http://82.157.43.234:8080/api/touristRoutes/${touristRouteId}`)
            return data
    }
 )



export default detailSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface SearchState{
    loading: boolean,
    error:string|null,
    data:any,
    pagination: any
}

const initialState:SearchState ={
    loading:true,
    error:null,
    data:null,
    pagination:null
}
 const searchSlice = createSlice({
    name:'searchSlice',
    initialState,
    reducers:{},    
    extraReducers:(builder)=>{
        builder.addCase(getSearch.pending,(state)=>{
            state.loading = true
        }).addCase(getSearch.fulfilled,(state,{payload})=>{
            state.loading =false
            state.data = payload.data
            state.pagination = payload.pagination
            state.error = null
        }).addCase(getSearch.rejected, (state, {payload}:any)=>{
            state.loading =false
            state.error = payload
        })
    }
})

export const getSearch = createAsyncThunk(
    'searchSlice/getSearch',
    async(parameters:{keywords:string,nextPage:number|string,pageSize:number|string})=>{
        let url = `/api/touristRoutes?pageNumber=${parameters.nextPage}&pageSize=${parameters.pageSize}`
        if(parameters.keywords){
            url+=`&keyword=${parameters.keywords}`
        }
      const response = await axios.get(url) 
      return {
        data:response.data,
        pagination:JSON.parse(response.headers["x-pagination"])
      }
    }
)

export default searchSlice.reducer
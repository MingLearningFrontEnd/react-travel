import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkOut } from "../shoppingCartSlice/shoppingCartSlice";


interface OrderState {
    currentOrder: any,
    error: any | null,
    loading: boolean
}

const initialState: OrderState = {
    currentOrder: null,
    error: null,
    loading: false
}

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
        bulider.addCase(getOrder.pending, (state) => {
            state.loading = true
        }).addCase(getOrder.fulfilled, (state, { payload }) => {
            state.loading = false
            state.currentOrder = payload
            state.error = null
        }).addCase(getOrder.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        .addCase(checkOut.pending, (state) => {
            state.loading = true
        }).addCase(checkOut.fulfilled, (state, { payload }) => {
            state.loading = false
            state.currentOrder = payload
            state.error = null
        }).addCase(checkOut.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
    }
})

export const getOrder = createAsyncThunk(
    'orderSlice/getOrder',
    async (parameters: { token: string, orderId: string }) => {
        const { data } = await axios.post(`/api/orders/${parameters.orderId}/placeOrder`,
            null,
            {
                headers: {
                    Authorization: `bearer ${parameters.token}`
                }
            }
        )
        return data
    }
)

export default orderSlice.reducer
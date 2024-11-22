import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ShoppingCartState {
    loading: boolean;
    error: string | null,
    items: any[]
}

const initialState: ShoppingCartState = {
    loading: false,
    error: null,
    items: []
}

 const shoppingCartSlice = createSlice({
    name: 'shoppingCartSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getShoppingCart.pending, (state) => {
            state.loading = true
        }).addCase(getShoppingCart.fulfilled, (state, { payload }) => {
            state.loading = false
            state.items = payload
            state.error = null
        }).addCase(getShoppingCart.rejected, (state, { payload }: any) => {
            state.loading = false
            state.error = payload
        })
        .addCase(addShoppingCart.pending, (state) => {
            state.loading = true
        }).addCase(addShoppingCart.fulfilled, (state, { payload }) => {
            state.loading = false
            state.items = payload
            state.error = null
        }).addCase(addShoppingCart.rejected, (state, { payload }: any) => {
            state.loading = false
            state.error = payload
        })
        .addCase(clearShoppingCart.pending, (state) => {
            state.loading = true
        }).addCase(clearShoppingCart.fulfilled, (state) => {
            state.loading = false
            state.items = []
            state.error = null
        }).addCase(clearShoppingCart.rejected, (state, { payload }: any) => {
            state.loading = false
            state.error = payload
        })
        .addCase(checkOut.pending, (state) => {
            state.loading = true
        }).addCase(checkOut.fulfilled, (state) => {
            state.items = []
            state.loading = false
            state.error = null
        }).addCase(checkOut.rejected, (state, { payload }: any) => {
            state.loading = false
            state.error = payload
        })
    }
})

export const getShoppingCart = createAsyncThunk(
    'shoppingCartSlice/getShoppingCart',
    async (token:string) => {
        const { data } = await axios.get(
            'http://82.157.43.234:8080/api/shoppingCart',
            {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }
        )
        return data.shoppingCartItems
    }
)

export const addShoppingCart = createAsyncThunk(
    'shoppingCartSlice/addShoppingCart',
    async (parameters: { token: string, touristRouteId: string }) => {
        const { data } = await axios.post(
            'http://82.157.43.234:8080/api/shoppingCart/items',
            {
                touristRouteId: parameters.touristRouteId
            },
            {
                headers: {
                    Authorization: `bearer ${parameters.token}`
                }
            }
        )
        return data.shoppingCartItems
    }
)

export const clearShoppingCart = createAsyncThunk(
    'shoppingCartSlice/clearShoppingCart',
    async (parameters: { token: string, itemIds: number[] }) => {
        return await axios.delete(
            `http://82.157.43.234:8080/api/shoppingCart/items/(${parameters.itemIds.join(',')})`,
            {
                headers: {
                    Authorization: `bearer ${parameters.token}`
                }
            }
        )

    }
)

export const checkOut = createAsyncThunk(
    'shoppingCartSlice/checkOut',
    async (token: string) => {
        const { data } = await axios.post(
            'http://82.157.43.234:8080/api/shoppingCart/checkout',
            null,
            {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }
        )
        return data.orderItems
    }
)

export default shoppingCartSlice.reducer
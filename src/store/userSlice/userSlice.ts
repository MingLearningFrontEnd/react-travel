import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface userState {
    loading: boolean,
    error: string | null,
    token: string|null
}

const initialState:userState= {
    loading: false,
    error: null,
    token: '',
}

 const userSlice = createSlice(
    {
        name: 'userSlice',
        initialState,
        reducers: {
            logOut:(state)=>{
                state.token = null
                state.error = null
                state.loading = false
                
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loginIn.pending, (state) => {
                state.loading = true
            }).addCase(loginIn.fulfilled, (state, { payload }: any) => {
                state.loading = false
                state.token = payload
                state.error = null
            }).addCase(loginIn.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
        }
    }
)


export const loginIn = createAsyncThunk(
    'userSlice/loginIn',
    async (parameters: {email: string,password: string}) => {
        const {data} = await axios.post(
            `/auth/login`,
            {
                email: parameters.email,
                password: parameters.password,
            }
        
        )
        return data.token
    }
)

export const {logOut} = userSlice.actions


export default userSlice.reducer
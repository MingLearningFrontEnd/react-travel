import { createSlice } from "@reduxjs/toolkit";
import i18next from "i18next";
interface LanguageState{
    language: string,
    languageList: {name:string,code:string}[]
}

const initialState:LanguageState = {
    language:'zh',
    languageList:[
        {name:'中文',code:'zh'},
        {name:'English',code:'en'}
    ]
}
const languageSlice = createSlice({
    name:'languageSlice',
    initialState,
    reducers:{
        languageChange: (state,{payload})=>{
            state.language = payload
            i18next.changeLanguage(payload)
        },
        addLangugae:(state,{payload})=>{
            state.languageList = payload
        }
    }
})

export const {languageChange,addLangugae} = languageSlice.actions
export default languageSlice.reducer
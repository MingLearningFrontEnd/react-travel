import { configureStore } from '@reduxjs/toolkit'
import detailSlice from './detailSlice/detailSlice'
import languageSlice from './LanguageSlice/languageSlice'
import searchSlice from './SearchSlice/searchSlice'

const store = configureStore({
    reducer: {
        detailSlice,
        languageSlice,
        searchSlice
    },
    devTools:true
    
})

export type AppDispatch = typeof store.dispatch
export default store 
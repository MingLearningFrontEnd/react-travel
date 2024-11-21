import { combineReducers, configureStore } from '@reduxjs/toolkit'
import detailSlice from './detailSlice/detailSlice'
import languageSlice from './LanguageSlice/languageSlice'
import searchSlice from './SearchSlice/searchSlice'
import userSlice  from './userSlice/userSlice'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig ={
    key:'root',
    storage,
    whitelist: ['userSlice']
}

//未持久化的reducer
const rootReducer = combineReducers({
    detailSlice,
    languageSlice,
    searchSlice,
    userSlice
})

const persistedReducer = persistReducer(persistConfig,rootReducer ) //持久化的reducer

const store = configureStore({
    reducer: persistedReducer, //持久化的reducer替换未持久化reducer
    devTools:true
})

const persistor = persistStore(store) //创建持久化store

export type AppDispatch = typeof store.dispatch
export default {store, persistor}
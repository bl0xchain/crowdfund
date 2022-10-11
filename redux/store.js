import { configureStore } from '@reduxjs/toolkit'
import walletSlice from './slices/walletSlice'

export default configureStore({
    reducer: {
        wallet: walletSlice,
    }
})
import { configureStore } from "@reduxjs/toolkit";

//SLICE IMPORTS
import walletReducer from "../features/Slice_Wallet"
import modalReducer from "../features/Slice_ModalShow"
import expenseReducer from "../features/Slice_Expense"

const store = configureStore({
    reducer:{
        wallet:walletReducer,
        modalvisibility: modalReducer,
        expense: expenseReducer,
    }
})


export default store;
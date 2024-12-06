import { createSlice } from "@reduxjs/toolkit";

const initialState = 
{
    balance:4500
}

const walletSLice = createSlice(
    {
        name:"wallet",
        initialState,
        reducers:
        {
            addFunds:(state,action)=>
            {
                state.balance += action.payload
            },
            deductFunds:(state,action)=>
            {
                state.balance -= action.payload
            }

        }
        
    }
    
)


export const {addFunds,deductFunds} = walletSLice.actions;
export default walletSLice.reducer;
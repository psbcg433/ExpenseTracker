import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";


const initialState = {
  expense: 0,
  items: []
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expense += action.payload.amount;
      state.items.push({
        key: Math.floor(Math.random() * 1000) + 1,
        item: action.payload.name,
        category: action.payload.category,
        date: action.payload.date,
        amount: action.payload.amount
      });
    },
    removeExpense: (state, action) => {
      const recordToRemove = state.items.find((record) => record.key === action.payload.key);

      if (recordToRemove) {
        state.items = state.items.filter((record) => record.key !== action.payload.key);
        state.expense -= recordToRemove.amount;
      }
    },
    editExpense: (state, action) => {
      const { key, name, category, date, amount } = action.payload;
      const index = state.items.findIndex((record) => record.key === key);

      if (index !== -1) {
        const oldAmount = state.items[index].amount;
       
        const amountDifference = amount - oldAmount;
        state.items[index] = { key, item: name, category, date, amount };
        state.expense += amountDifference;
       
        
      }
    }
  }
});

export const { addExpense, removeExpense, editExpense } = expenseSlice.actions;
export default expenseSlice.reducer;

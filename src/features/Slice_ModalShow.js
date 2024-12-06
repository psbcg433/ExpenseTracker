import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false, 
  modal_AddIncomeVisibility: false, 
  modal_AddExpensesVisibility: false, 
  modal_EditExpenseVisibility: false, // Added for editing expense
};

const modalSlice = createSlice({
  name: "modalvisibility",
  initialState,
  reducers: {
    show_AddIncomeModal: (state) => {
      state.modal_AddIncomeVisibility = true;
      state.showModal = true;
    },
    hide_AddIncomeModal: (state) => {
      state.modal_AddIncomeVisibility = false;
      state.showModal = false;
    },
    show_AddExpenseModal: (state) => {
      state.modal_AddExpensesVisibility = true;
      state.showModal = true;
    },
    hide_AddExpenseModal: (state) => {
      state.modal_AddExpensesVisibility = false;
      state.showModal = false;
    },
    show_EditExpenseModal: (state) => {
      state.modal_EditExpenseVisibility = true;
      state.showModal = true;
    },
    hide_EditExpenseModal: (state) => {
      state.modal_EditExpenseVisibility = false;
      state.showModal = false;
    },
  },
});

export const {
  show_AddExpenseModal,
  hide_AddExpenseModal,
  show_AddIncomeModal,
  hide_AddIncomeModal,
  show_EditExpenseModal, 
  hide_EditExpenseModal, 
} = modalSlice.actions;

export default modalSlice.reducer;

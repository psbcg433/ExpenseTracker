import React, { useState } from "react";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import {
  hide_AddExpenseModal,
  hide_AddIncomeModal,
} from "../features/Slice_ModalShow";
import { addFunds, deductFunds } from "../features/Slice_Wallet";
import { addExpense } from "../features/Slice_Expense";

const Modal = () => {
  const dispatch = useDispatch();
  const [income, setIncome] = useState("");

  const walletBalance = useSelector((state) => state.wallet.balance);

  // Expense data
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const { showModal, modal_AddIncomeVisibility, modal_AddExpensesVisibility } =
    useSelector((state) => state.modalvisibility);

  // Close modals
  const hideIncomeModal = () => {
    dispatch(hide_AddIncomeModal());
  };
  const hideExpenseModal = () => {
    dispatch(hide_AddExpenseModal());
  };

  // Add funds to wallet
  const addToWallet = () => {
    const parsedIncome = parseInt(income, 10);
    if (isNaN(parsedIncome) || parsedIncome <= 0) {
      alert("Please enter a valid income amount");
    } else {
      dispatch(addFunds(parsedIncome));
      hideIncomeModal();
      setIncome("");
    }
  };

  // Add expense
  const addExpenseList = () => {
    const parsedAmount = parseInt(amount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid expense amount");
    } else if (parsedAmount > walletBalance) {
      alert("Not Enough Balance");
    } else if (!name || !category || !date) {
      alert("Please fill in all the fields");
    } else {
      const list = {
        name,
        category,
        date,
        amount: parsedAmount,
      };
      dispatch(addExpense(list));
      dispatch(deductFunds(parsedAmount))
      
      setName("");
      setCategory("");
      setDate("");
      setAmount("");
      
      dispatch(hide_AddExpenseModal());
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal">
      {modal_AddIncomeVisibility && (
        <div className="addIncome_modal">
          <input
            type="number"
            placeholder="Enter the amount"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <Button
            color01="#F4BB4A"
            value="Add Balance"
            btnAction={addToWallet}
          />
          <Button
            color01="#D9D9D9"
            value="Cancel"
            btnAction={hideIncomeModal}
          />
        </div>
      )}
      {modal_AddExpensesVisibility && (
        <div className="addExpense_modal">
          <div>
            <input
              type="text"
              placeholder="Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a Category
              </option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <Button
              color01="#F4BB4A"
              value="Add Expense"
              btnAction={addExpenseList}
            />
            <Button
              color01="#D9D9D9"
              value="Cancel"
              btnAction={hideExpenseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

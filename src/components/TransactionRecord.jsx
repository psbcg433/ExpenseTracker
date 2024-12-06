import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineModeEdit, MdCardTravel } from "react-icons/md";
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import { FaGift } from "react-icons/fa";
import { PiPizzaLight } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { removeExpense } from "../features/Slice_Expense";
import { addFunds } from "../features/Slice_Wallet";

const TransactionRecord = () => {
  const ITEMS_PER_PAGE = 3;

  const [currentPage, setCurrentPage] = useState(1);

  function sortRecordsByDate(records) {
    return [...records].sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  const dispatch = useDispatch(); 

  const expenseList = useSelector((state) => state.expense.items);
  const sortedRecords = sortRecordsByDate(expenseList);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRecords = sortedRecords.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedRecords.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleDelete = (key, amount) => {
    dispatch(removeExpense({ key, amount })); 
    dispatch(addFunds(amount))
  };

  return (
    <div className="recordContainer">
      <h2>Recent Transactions</h2>
      <div className="record">
        {paginatedRecords.length > 0 ? (
          paginatedRecords.map((record) => (
            <div key={`${record.key}-${record.date}-${record.item}`} className="record_list_container">
              <div className="record_items">
                <div className="record_logo">
                  {record.category === "Travel" ? (
                    <MdCardTravel className="logo" />
                  ) : record.category === "Entertainment" ? (
                    <FaGift className="logo" />
                  ) : (
                    <PiPizzaLight className="logo" />
                  )}
                </div>
                <div className="record_item">
                  <h3>{record.item}</h3>
                  <p>{record.date}</p>
                </div>
              </div>
              <div className="record_actions">
                <p className="record_price">{record.amount}</p>
                <button
                  className="actionBTN-close"
                  onClick={() => handleDelete(record.key, record.amount)} 
                >
                  <IoIosCloseCircleOutline className="action-btn action-btn-close" />
                </button>
                <button className="actionBTN-edit">
                  <MdOutlineModeEdit className="action-btn action-btn-edit" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No expenses for this month</p>
        )}
        {sortedRecords.length > ITEMS_PER_PAGE && (
          <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
              <GrFormPreviousLink />
            </button>
            <span>{currentPage}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              <GrFormNextLink />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionRecord;

import React from "react";
import Button from "./Button";

const ExpenseCard = ({ title, balance, btnTxt, btnCol01, btnCol02 ,btnAction }) => {
  return (
    <div className="expenseCard">
      <h2>
        {title}: <span style={{ color: btnCol01 }}>₹{balance}</span>
      </h2>

      <Button color01={btnCol01} color02={btnCol02} value={btnTxt} btnAction={btnAction} />
    </div>
  );
};

export default ExpenseCard;

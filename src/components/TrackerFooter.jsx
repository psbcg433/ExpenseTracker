import React from "react";
import TransactionRecord from "./TransactionRecord";
import HorizontalBarChart from "./Chart_Transaction";

const TrackerFooter = () => {
  return (
    <div className="footer">
      <TransactionRecord />
      <HorizontalBarChart />
    </div>
  );
};

export default TrackerFooter;

import React from 'react';
import ExpenseCard from './ExpenseCard';
import PieChart from './Chart_Pie';

import { useDispatch,useSelector} from 'react-redux';
import { show_AddIncomeModal, show_AddExpenseModal } from '../features/Slice_ModalShow';

const TrackerHeader = () => {
  const dispatch = useDispatch();
  const walletBalance = useSelector((state)=>state.wallet.balance)
  const expense = useSelector((state)=>state.expense.expense)
  const showIncomeModal = () => {
    
    dispatch(show_AddIncomeModal());
  };

  const showExpenseModal = () => {
  
    dispatch(show_AddExpenseModal());
  };
  
  return (
    <div className='header'>
      <h1>Expense Tracker</h1>
      <div className='trackerHeaderContainer'>
        <ExpenseCard 
          title="Wallet Balance" 
          balance={walletBalance} 
          btnTxt="+ Add Income" 
          btnCol01="#B5DC52" 
          btnCol02="#89E148" 
          btnAction={showIncomeModal}
        />
        <ExpenseCard 
          title="Expenses" 
          balance={expense}
          btnTxt="+ Add Expense" 
          btnCol01="#FF4747" 
          btnCol02="#FF3838" 
          btnAction={showExpenseModal} 
        />
        <PieChart />
      </div>
    </div>
  );
};

export default TrackerHeader;

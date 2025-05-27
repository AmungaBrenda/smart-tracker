// hooks/useTransactions.js
import { useState } from 'react';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transactionData) => {
    const transaction = {
      id: Date.now(),
      ...transactionData,
      amount: parseFloat(transactionData.amount),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };
    
    setTransactions(prev => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction
  };
};

export const categories = {
  income: ['sales', 'services', 'other income'],
  expense: ['inventory', 'rent', 'utilities', 'marketing', 'transport', 'other expense']
};
import { useState, useEffect } from 'react';
import { Transaction, TransactionSummary } from '../types';
import { calculateSummary, generateId, saveTransactions, loadTransactions } from '../utils/helpers';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    profit: 0,
    monthlyData: []
  });

  // Load transactions from localStorage on initial render
  useEffect(() => {
    const loadedTransactions = loadTransactions();
    setTransactions(loadedTransactions);
    setSummary(calculateSummary(loadedTransactions));
  }, []);

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: generateId(),
    };
    
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    setSummary(calculateSummary(updatedTransactions));
    saveTransactions(updatedTransactions);
  };

  // Delete a transaction
  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    setSummary(calculateSummary(updatedTransactions));
    saveTransactions(updatedTransactions);
  };

  return {
    transactions,
    summary,
    addTransaction,
    deleteTransaction
  };
};
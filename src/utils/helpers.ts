import { Transaction, TransactionSummary, MonthlyData } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

const calculateMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
  const monthlyMap = new Map<string, number>();
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    const amount = transaction.type === 'income' ? transaction.amount : -transaction.amount;
    
    monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + amount);
  });

  return Array.from(monthlyMap.entries())
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([month, amount]) => ({ month, amount }));
};

export const calculateSummary = (transactions: Transaction[]): TransactionSummary => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    totalIncome,
    totalExpenses,
    profit: totalIncome - totalExpenses,
    monthlyData: calculateMonthlyData(transactions)
  };
};

export const getCommonCategories = (type: 'income' | 'expense'): string[] => {
  if (type === 'income') {
    return ['Sales', 'Services', 'Refunds', 'Investments', 'Other'];
  }
  return ['Inventory', 'Rent', 'Utilities', 'Salary', 'Equipment', 'Marketing', 'Other'];
};

export const saveTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

export const loadTransactions = (): Transaction[] => {
  const saved = localStorage.getItem('transactions');
  return saved ? JSON.parse(saved) : [];
};
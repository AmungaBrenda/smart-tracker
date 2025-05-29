export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: TransactionType;
  imageUrl?: string;
}

export interface MonthlyData {
  month: string;
  amount: number;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpenses: number;
  profit: number;
  monthlyData: MonthlyData[];
}
import React, { useState } from 'react';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/helpers';
import { Trash2, Image, ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onDeleteTransaction 
}) => {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">No transactions yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Transactions</h2>
        
        <div className="flex space-x-2">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'income' | 'expense')}
              className="pl-8 pr-4 py-1 text-sm rounded-md border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
            <Filter size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            className="flex items-center text-sm py-1 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
          >
            {sortOrder === 'newest' ? (
              <>
                <ChevronDown size={16} className="mr-1" /> Newest
              </>
            ) : (
              <>
                <ChevronUp size={16} className="mr-1" /> Oldest
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {sortedTransactions.map((transaction) => (
          <div 
            key={transaction.id} 
            className={`border ${transaction.type === 'income' ? 'border-green-200' : 'border-red-200'} rounded-lg overflow-hidden transition-all duration-200`}
          >
            <div 
              className={`p-3 flex justify-between items-center cursor-pointer ${transaction.type === 'income' ? 'hover:bg-green-50' : 'hover:bg-red-50'}`}
              onClick={() => toggleExpand(transaction.id)}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={`w-3 h-3 rounded-full ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`} 
                />
                <div>
                  <h3 className="font-medium text-gray-800">{transaction.description}</h3>
                  <p className="text-xs text-gray-500">{formatDate(transaction.date)} · {transaction.category}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                
                {transaction.imageUrl && (
                  <Image size={16} className="text-gray-500" />
                )}
                
                {expandedId === transaction.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            
            {/* Expanded details */}
            {expandedId === transaction.id && (
              <div className="p-3 border-t border-gray-100 bg-gray-50">
                {transaction.imageUrl && (
                  <div className="mb-3">
                    <img src={transaction.imageUrl} alt="Receipt" className="h-32 object-contain mx-auto border border-gray-300 rounded" />
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="flex items-center text-sm text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={14} className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
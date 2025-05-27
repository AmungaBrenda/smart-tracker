// components/AddTransactionForm.js
import React, { useState } from 'react';
import { categories } from '../hooks/useTransactions';

const AddTransactionForm = ({ showAddForm, onClose, onAdd, initialData = {} }) => {
  const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    amount: '',
    description: '',
    category: 'sales',
    ...initialData
  });

  const handleSubmit = () => {
    if (newTransaction.amount && newTransaction.description) {
      onAdd(newTransaction);
      setNewTransaction({
        type: 'income',
        amount: '',
        description: '',
        category: 'sales'
      });
      onClose();
    }
  };

  if (!showAddForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Add Transaction</h3>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setNewTransaction(prev => ({ ...prev, type: 'income', category: 'sales' }))}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                newTransaction.type === 'income'
                  ? 'bg-green-100 text-green-700 ring-2 ring-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setNewTransaction(prev => ({ ...prev, type: 'expense', category: 'inventory' }))}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                newTransaction.type === 'expense'
                  ? 'bg-red-100 text-red-700 ring-2 ring-red-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Expense
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              step="0.01"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What was this for?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={newTransaction.category}
              onChange={(e) => setNewTransaction(prev => ({ ...prev, category: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent capitalize"
            >
              {categories[newTransaction.type].map(cat => (
                <option key={cat} value={cat} className="capitalize">{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105"
          >
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionForm;
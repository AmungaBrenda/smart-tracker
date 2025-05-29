import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';
import { getCommonCategories } from '../utils/helpers';
import { Mic, Camera, Plus } from 'lucide-react';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onVoiceInput: () => void;
  onPhotoInput: () => void;
  voiceTranscript: string;
  isListening: boolean;
  photoUrl: string | null;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onAddTransaction,
  onVoiceInput,
  onPhotoInput,
  voiceTranscript,
  isListening,
  photoUrl,
}) => {
  const [type, setType] = useState<TransactionType>('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  // Update form when voice transcript changes
  React.useEffect(() => {
    if (voiceTranscript) {
      // Simple parsing logic - can be enhanced with more sophisticated NLP
      const words = voiceTranscript.toLowerCase().split(' ');
      
      // Try to detect transaction type
      if (words.includes('expense') || words.includes('spent') || words.includes('paid') || words.includes('bought')) {
        setType('expense');
      } else if (words.includes('income') || words.includes('earned') || words.includes('received') || words.includes('sold')) {
        setType('income');
      }
      
      // Try to extract amount
      const amountMatch = voiceTranscript.match(/\$?(\d+(\.\d{1,2})?)/);
      if (amountMatch) {
        setAmount(amountMatch[1]);
      }
      
      // Use remainder as description
      setDescription(voiceTranscript);
    }
  }, [voiceTranscript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category) {
      alert('Please fill all required fields');
      return;
    }
    
    onAddTransaction({
      amount: parseFloat(amount),
      description,
      category,
      date,
      type,
      imageUrl: photoUrl || undefined
    });
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategory('');
    setDate(new Date().toISOString().substring(0, 10));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Add Transaction</h2>
        
        <div className="flex space-x-2">
          <button 
            type="button"
            onClick={onVoiceInput}
            className={`p-2 rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            aria-label="Voice input"
          >
            <Mic size={20} />
          </button>
          <button 
            type="button"
            onClick={onPhotoInput}
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            aria-label="Photo input"
          >
            <Camera size={20} />
          </button>
        </div>
      </div>

      {isListening && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg animate-pulse">
          <p className="text-blue-700">Listening... {voiceTranscript}</p>
        </div>
      )}
      
      {photoUrl && (
        <div className="mb-4">
          <img src={photoUrl} alt="Receipt" className="h-24 rounded border border-gray-300" />
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex space-x-2 mb-4">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md ${type === 'income' ? 'bg-green-100 text-green-800 font-medium' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setType('income')}
            >
              Income
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md ${type === 'expense' ? 'bg-red-100 text-red-800 font-medium' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
            placeholder="What was this for?"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
            required
          >
            <option value="">Select a category</option>
            {getCommonCategories(type).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
        >
          <div className="flex items-center justify-center">
            <Plus size={16} className="mr-1" />
            <span>Add {type === 'income' ? 'Income' : 'Expense'}</span>
          </div>
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
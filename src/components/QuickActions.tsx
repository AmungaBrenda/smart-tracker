import React from 'react';
import { Plus, DollarSign, ShoppingCart, Coffee, Truck, Tag } from 'lucide-react';
import { Transaction, TransactionType } from '../types';

interface QuickAction {
  type: TransactionType;
  category: string;
  description: string;
  icon: React.ReactNode;
  amount?: number;
  bgColor: string;
  iconColor: string;
}

interface QuickActionsProps {
  onQuickAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onQuickAdd }) => {
  const quickActions: QuickAction[] = [
    {
      type: 'income',
      category: 'Sales',
      description: 'Quick Sale',
      icon: <DollarSign size={18} />,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      type: 'expense',
      category: 'Inventory',
      description: 'Inventory Purchase',
      icon: <ShoppingCart size={18} />,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      type: 'expense',
      category: 'Utilities',
      description: 'Coffee/Tea',
      icon: <Coffee size={18} />,
      amount: 5,
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      type: 'expense',
      category: 'Transportation',
      description: 'Transportation',
      icon: <Truck size={18} />,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      type: 'expense',
      category: 'Marketing',
      description: 'Marketing Expense',
      icon: <Tag size={18} />,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  const handleQuickAdd = (action: QuickAction) => {
    // Open a prompt to get the amount if not predefined
    let amount = action.amount;
    
    if (!amount) {
      const input = prompt(`Enter amount for ${action.description}:`);
      if (!input) return;
      amount = parseFloat(input);
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
      }
    }
    
    onQuickAdd({
      amount,
      description: action.description,
      category: action.category,
      date: new Date().toISOString().slice(0, 10),
      type: action.type,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-3">Quick Add</h2>
      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleQuickAdd(action)}
            className={`flex-shrink-0 ${action.bgColor} p-3 rounded-lg flex items-center space-x-2 hover:shadow-md transition-shadow`}
          >
            <div className={`p-1 rounded-full ${action.iconColor}`}>
              {action.icon}
            </div>
            <span className="whitespace-nowrap font-medium text-sm">
              {action.description}
            </span>
          </button>
        ))}
        <button 
          className="flex-shrink-0 bg-gray-100 p-3 rounded-lg flex items-center space-x-2 hover:bg-gray-200"
          onClick={() => {}} // Could open the full form
        >
          <Plus size={18} className="text-gray-600" />
          <span className="whitespace-nowrap font-medium text-sm">Custom</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
import React from 'react';
import { TransactionSummary } from '../types';
import { formatCurrency } from '../utils/helpers';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  summary: TransactionSummary;
}

const Dashboard: React.FC<DashboardProps> = ({ summary }) => {
  const { totalIncome, totalExpenses, profit, monthlyData } = summary;
  const isProfitable = profit >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Business Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700 font-medium">Total Income</p>
          <p className="text-2xl font-bold text-blue-800">{formatCurrency(totalIncome)}</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-700 font-medium">Total Expenses</p>
          <p className="text-2xl font-bold text-red-800">{formatCurrency(totalExpenses)}</p>
        </div>
        
        <div className={`${isProfitable ? 'bg-green-50' : 'bg-red-50'} p-4 rounded-lg`}>
          <p className={`text-sm ${isProfitable ? 'text-green-700' : 'text-red-700'} font-medium`}>Profit</p>
          <p className={`text-2xl font-bold ${isProfitable ? 'text-green-800' : 'text-red-800'}`}>
            {formatCurrency(profit)}
          </p>
        </div>
      </div>

      {/* Profit/Loss Chart */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Profit/Loss Trend</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                }}
                formatter={(value: number) => [`$${Math.abs(value)}`, value >= 0 ? 'Profit' : 'Loss']}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#0D9488" 
                strokeWidth={2}
                dot={{ fill: '#0D9488', r: 4 }}
                activeDot={{ r: 6, fill: '#0D9488' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Profit Status Message */}
      <div className="mt-6 p-3 rounded-lg bg-gray-50 border border-gray-200">
        <p className="text-gray-700">
          {isProfitable 
            ? "Your business is profitable! Keep up the good work." 
            : "Your business is currently operating at a loss. Review your expenses."
          }
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
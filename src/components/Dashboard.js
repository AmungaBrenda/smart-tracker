// components/Dashboard.js
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Eye, EyeOff, BarChart3, Tag } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import QuickAddButtons from './QuickAddButtons';
import TransactionList from './TransactionList';
import { getChartData, getCategoryData } from '../utils/chartHelpers';

const Dashboard = ({ 
  transactions, 
  totalIncome, 
  totalExpenses, 
  profit,
  onAddTransaction,
  onDeleteTransaction,
  setShowAddForm,
  setNewTransaction
}) => {
  const [viewMode, setViewMode] = useState('overview');
  const [showBalance, setShowBalance] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const chartData = getChartData(transactions);
  const categoryData = getCategoryData(transactions);

  // Voice recording functionality
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        // In a real app, you'd send this to a speech-to-text service
        // For demo, we'll simulate processing
        setTimeout(() => {
          setNewTransaction({
            type: 'income',
            description: 'Sale of products (voice input)',
            amount: '50',
            category: 'sales'
          });
          setShowAddForm(true);
        }, 1000);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Stop recording after 5 seconds for demo
      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      }, 5000);
    } catch (error) {
      alert('Microphone access denied. Please enable microphone permissions.');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  // Photo input functionality
  const handlePhotoInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you'd use OCR to extract receipt data
      // For demo, we'll simulate processing
      setTimeout(() => {
        setNewTransaction({
          type: 'expense',
          description: 'Office supplies (from receipt)',
          amount: '25',
          category: 'other expense'
        });
        setShowAddForm(true);
      }, 1000);
    }
  };

  const StatsCard = ({ title, value, icon: Icon, color, showToggle = true }) => (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 border`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className={`${color.includes('green') ? 'text-green-600' : color.includes('red') ? 'text-red-600' : color.includes('blue') ? 'text-blue-600' : 'text-orange-600'}`} size={24} />
        {showToggle && (
          <button
            onClick={() => setShowBalance(!showBalance)}
            className={`${color.includes('green') ? 'text-green-600 hover:text-green-700' : color.includes('red') ? 'text-red-600 hover:text-red-700' : color.includes('blue') ? 'text-blue-600 hover:text-blue-700' : 'text-orange-600 hover:text-orange-700'}`}
          >
            {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        )}
      </div>
      <h3 className={`${color.includes('green') ? 'text-green-700' : color.includes('red') ? 'text-red-700' : color.includes('blue') ? 'text-blue-700' : 'text-orange-700'} font-medium`}>
        {title}
      </h3>
      <p className={`text-2xl font-bold ${color.includes('green') ? 'text-green-800' : color.includes('red') ? 'text-red-800' : color.includes('blue') ? 'text-blue-800' : 'text-orange-800'}`}>
        {showBalance ? value : '••••'}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex bg-white rounded-xl p-1 shadow-md border border-gray-200 max-w-xs mx-auto">
        <button
          onClick={() => setViewMode('overview')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            viewMode === 'overview'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <DollarSign size={16} />
          Overview
        </button>
        <button
          onClick={() => setViewMode('charts')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            viewMode === 'charts'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <BarChart3 size={16} />
          Charts
        </button>
      </div>

      {viewMode === 'overview' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              title="Total Income"
              value={`$${totalIncome.toFixed(2)}`}
              icon={TrendingUp}
              color="from-green-50 to-emerald-100 border-green-200"
            />
            <StatsCard
              title="Total Expenses"
              value={`$${totalExpenses.toFixed(2)}`}
              icon={TrendingDown}
              color="from-red-50 to-rose-100 border-red-200"
            />
            <StatsCard
              title={profit >= 0 ? 'Profit' : 'Loss'}
              value={`$${Math.abs(profit).toFixed(2)}`}
              icon={DollarSign}
              color={profit >= 0 ? 'from-blue-50 to-indigo-100 border-blue-200' : 'from-orange-50 to-red-100 border-orange-200'}
            />
          </div>

          <QuickAddButtons
            setShowAddForm={setShowAddForm}
            isRecording={isRecording}
            startRecording={startRecording}
            stopRecording={stopRecording}
            handlePhotoInput={handlePhotoInput}
          />

          <TransactionList 
            transactions={transactions}
            onDelete={onDeleteTransaction}
          />
        </>
      ) : (
        <div className="space-y-6">
          <QuickAddButtons
            setShowAddForm={setShowAddForm}
            isRecording={isRecording}
            startRecording={startRecording}
            stopRecording={stopRecording}
            handlePhotoInput={handlePhotoInput}
          />
          
          {/* Profit/Loss Trend Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              7-Day Profit & Loss Trend
            </h3>
            {chartData.some(d => d.income > 0 || d.expenses > 0) ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      stroke="#666"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      stroke="#666"
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `${value.toFixed(2)}`, 
                        `${props.payload.type === 'income' ? 'Income' : 'Expense'} (${props.payload.count} transactions)`
                      ]}
                      labelFormatter={(label) => `Category: ${label}`}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #ddd',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="amount" name="Amount">
                      {categoryData.slice(0, 8).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.type === 'income' ? '#10b981' : '#ef4444'} 
                        />
                      ))}
                    </Bar>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Tag size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Add transactions to see category breakdown!</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              title="Total Income"
              value={`${totalIncome.toFixed(2)}`}
              icon={TrendingUp}
              color="from-green-50 to-emerald-100 border-green-200"
            />
            <StatsCard
              title="Total Expenses"
              value={`${totalExpenses.toFixed(2)}`}
              icon={TrendingDown}
              color="from-red-50 to-rose-100 border-red-200"
            />
            <StatsCard
              title={profit >= 0 ? 'Profit' : 'Loss'}
              value={`${Math.abs(profit).toFixed(2)}`}
              icon={DollarSign}
              color={profit >= 0 ? 'from-blue-50 to-indigo-100 border-blue-200' : 'from-orange-50 to-red-100 border-orange-200'}
            />
          </div>
        </div>
      )}

      {/* Recording Indicator */}
      {isRecording && (
        <div className="fixed bottom-4 left-4 right-4 bg-red-500 text-white p-4 rounded-xl shadow-lg animate-pulse z-50">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span>Recording... Tap the mic button to stop</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
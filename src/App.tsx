import { useState } from 'react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import PhotoInput from './components/PhotoInput';
import QuickActions from './components/QuickActions';
import { useTransactions } from './hooks/useTransactions';
import { useVoiceInput } from './hooks/useVoiceInput';
import { usePhotoInput } from './hooks/usePhotoInput';
import { Activity, PlusCircle, BarChart3, Settings } from 'lucide-react';

function App() {
  const { transactions, summary, addTransaction, deleteTransaction } = useTransactions();
  const [
    { transcript, isListening, error: voiceError }, 
    startListening, 
    stopListening
  ] = useVoiceInput();
  
  const [
    { imageUrl, isCapturing, error: photoError }, 
    startCapturing, 
    handleCapturedImage
  ] = usePhotoInput();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add' | 'history' | 'reports'>('dashboard');

  // Handle voice input toggle
  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Handle photo input toggle
  const handlePhotoInput = () => {
    startCapturing();
  };

  // Handle photo capture cancel
  const handleCaptureCancel = () => {
    // Reset the capturing state
    startCapturing();
    stopListening();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-teal-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">ProfitTracker</h1>
          <p className="text-teal-100">Simple business finance tracking</p>
        </div>
      </header>

      <main className="container mx-auto p-4 pb-24 md:pb-4">
        {activeTab === 'dashboard' && (
          <>
            <Dashboard summary={summary} />
            <QuickActions onQuickAdd={addTransaction} />
            <TransactionList 
              transactions={transactions.slice(0, 5)} 
              onDeleteTransaction={deleteTransaction} 
            />
          </>
        )}

        {activeTab === 'add' && (
          <TransactionForm 
            onAddTransaction={addTransaction}
            onVoiceInput={handleVoiceInput}
            onPhotoInput={handlePhotoInput}
            voiceTranscript={transcript}
            isListening={isListening}
            photoUrl={imageUrl}
          />
        )}

        {activeTab === 'history' && (
          <TransactionList 
            transactions={transactions} 
            onDeleteTransaction={deleteTransaction} 
          />
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Reports & Analytics</h2>
            <p className="text-gray-600">
              This feature will be available soon. Stay tuned!
            </p>
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="grid grid-cols-4 h-16">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center ${activeTab === 'dashboard' ? 'text-teal-600' : 'text-gray-500'}`}
          >
            <Activity size={20} />
            <span className="text-xs mt-1">Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('add')}
            className={`flex flex-col items-center justify-center ${activeTab === 'add' ? 'text-teal-600' : 'text-gray-500'}`}
          >
            <PlusCircle size={20} />
            <span className="text-xs mt-1">Add</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center justify-center ${activeTab === 'history' ? 'text-teal-600' : 'text-gray-500'}`}
          >
            <BarChart3 size={20} />
            <span className="text-xs mt-1">History</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('reports')}
            className={`flex flex-col items-center justify-center ${activeTab === 'reports' ? 'text-teal-600' : 'text-gray-500'}`}
          >
            <Settings size={20} />
            <span className="text-xs mt-1">Reports</span>
          </button>
        </div>
      </nav>

      {/* Desktop Navigation */}
      <div className="hidden md:block md:fixed md:left-4 md:top-1/2 md:transform md:-translate-y-1/2 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col p-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`p-3 my-1 rounded-lg flex items-center ${activeTab === 'dashboard' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'}`}
          >
            <Activity size={20} className="mr-2" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('add')}
            className={`p-3 my-1 rounded-lg flex items-center ${activeTab === 'add' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'}`}
          >
            <PlusCircle size={20} className="mr-2" />
            <span>Add Transaction</span>
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`p-3 my-1 rounded-lg flex items-center ${activeTab === 'history' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'}`}
          >
            <BarChart3 size={20} className="mr-2" />
            <span>Transaction History</span>
          </button>
          
          <button
            onClick={() => setActiveTab('reports')}
            className={`p-3 my-1 rounded-lg flex items-center ${activeTab === 'reports' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'}`}
          >
            <Settings size={20} className="mr-2" />
            <span>Reports</span>
          </button>
        </div>
      </div>

      {/* Photo Input Modal */}
      <PhotoInput
        isCapturing={isCapturing}
        onCapture={handleCapturedImage}
        onCancel={handleCaptureCancel}
      />

      {/* Show any errors */}
      {(voiceError || photoError) && (
        <div className="fixed bottom-20 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {voiceError || photoError}
        </div>
      )}
    </div>
  );
}

export default App;
// components/QuickAddButtons.js
import React, { useRef } from 'react';
import { Plus, Mic, Camera } from 'lucide-react';

const QuickAddButtons = ({ 
  setShowAddForm, 
  isRecording, 
  startRecording, 
  stopRecording, 
  handlePhotoInput 
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="flex gap-3 mb-6">
      <button
        onClick={() => setShowAddForm(true)}
        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <Plus size={20} />
        Add Sale
      </button>
      
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`bg-gradient-to-r ${isRecording ? 'from-red-500 to-pink-600' : 'from-green-500 to-emerald-600'} text-white rounded-xl p-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
      >
        <Mic size={20} className={isRecording ? 'animate-pulse' : ''} />
      </button>
      
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white rounded-xl p-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <Camera size={20} />
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handlePhotoInput}
        className="hidden"
      />
    </div>
  );
};

export default QuickAddButtons;
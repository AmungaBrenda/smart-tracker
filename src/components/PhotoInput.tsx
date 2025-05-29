import React, { useRef } from 'react';
import { X } from 'lucide-react';

interface PhotoInputProps {
  isCapturing: boolean;
  onCapture: (file: File) => void;
  onCancel: () => void;
}

const PhotoInput: React.FC<PhotoInputProps> = ({ 
  isCapturing, 
  onCapture, 
  onCancel 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isCapturing) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onCapture(files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Add Receipt Photo</h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-2">Take a photo of your receipt or upload an existing image.</p>
          
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-teal-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <p className="text-gray-500">Click to upload an image</p>
              <p className="text-xs text-gray-400 mt-1">Supports: JPG, PNG, GIF</p>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoInput;
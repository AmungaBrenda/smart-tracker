import { useState } from 'react';

interface PhotoInputResult {
  imageUrl: string | null;
  isCapturing: boolean;
  error: string | null;
}

export const usePhotoInput = (): [
  PhotoInputResult, 
  () => void, 
  (file: File) => void
] => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCapture = () => {
    setIsCapturing(true);
  };

  const handleCapturedImage = (file: File) => {
    try {
      // Check if the file is an image
      if (!file.type.match('image.*')) {
        setError('Please select an image file.');
        return;
      }

      // Create a URL for the image
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageUrl(e.target.result as string);
          setIsCapturing(false);
          setError(null);
        }
      };
      reader.onerror = () => {
        setError('Error reading the file.');
        setIsCapturing(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to process image.');
      setIsCapturing(false);
    }
  };

  return [
    { imageUrl, isCapturing, error },
    startCapture,
    handleCapturedImage
  ];
};
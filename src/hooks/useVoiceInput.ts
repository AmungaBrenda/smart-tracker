import { useState, useEffect } from 'react';

interface VoiceInputResult {
  transcript: string;
  isListening: boolean;
  error: string | null;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export const useVoiceInput = (): [
  VoiceInputResult, 
  () => void, 
  () => void
] => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const current = event.resultIndex;
        setTranscript(event.results[current][0].transcript);
      };
      
      recognitionInstance.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    } else {
      setError('Speech recognition not supported in this browser.');
    }
    
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      setTranscript('');
      setError(null);
      setIsListening(true);
      recognition.start();
    } else {
      setError('Speech recognition not initialized.');
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return [
    { transcript, isListening, error },
    startListening,
    stopListening
  ];
};
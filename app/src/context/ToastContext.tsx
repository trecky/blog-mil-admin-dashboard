import React, { createContext, useCallback, useContext, useState } from 'react';
import ToastContainer from '../components/ToastContainer';

interface ToastMessage {
  id: string;
  type?: 'sucesss' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(() => {
    console.log('add');
  }, []);

  const removeToast = useCallback(() => {
    console.log('remove');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

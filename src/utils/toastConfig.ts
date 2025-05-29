import { toast, Toaster } from 'react-hot-toast';

export const toastConfig = {
  success: (message: string) => toast.success(message, {
    duration: 4000,
    position: 'top-right' as const,
    style: {
      background: '#10B981',
      color: '#fff',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10B981',
    },
  }),
  
  error: (message: string) => toast.error(message, {
    duration: 4000,
    position: 'top-right' as const,
    style: {
      background: '#EF4444',
      color: '#fff',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#EF4444',
    },
  }),
  
  loading: (message: string) => toast.loading(message, {
    position: 'top-right' as const,
  }),
};
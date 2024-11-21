import { IconContext } from 'react-icons';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/utils/query-client';

import Navigation from './navigation';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './providers/authProvider';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IconContext.Provider value={{ className: 'fill-current text-2xl' }}>
        <AuthProvider>
          <Toaster />
          <Navigation />
        </AuthProvider>
      </IconContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

import { IconContext } from 'react-icons';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/utils/query-client';

import Navigation from './navigation';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IconContext.Provider value={{ className: 'fill-current text-2xl' }}>
        <Toaster />
        <Navigation />
      </IconContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

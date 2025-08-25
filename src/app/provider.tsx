import { memo, Suspense, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ThemeProvider } from '../shared/context/ThemeContext';
import { LanguageProvider } from '../shared/context/LanguageContext';

// Import i18n configuration
import '../shared/i18n';

const client = new QueryClient({
  defaultOptions: {
    queries:{
      retry: 1
    }
  }
})

const AppProvider = ({children}:{children:ReactNode}) => {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <QueryClientProvider client={client}>
                <ThemeProvider>
                    <LanguageProvider>
                        <Suspense fallback={<div>Suspense Loading...</div>}>
                            {children}
                        </Suspense>
                    </LanguageProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    </BrowserRouter>
  );
};

export default memo(AppProvider);
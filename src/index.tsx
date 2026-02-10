import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
// import HomePage from "./pages/homePage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import BankReviewPage from "./pages/bankReviewPage";
import FavouriteBanksPage from "./pages/favouriteBanksPage";
import BankDetailsPage from "./pages/bankDetailsPage";
// import ShowPage from "./pages/showPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
          <Routes>
            <Route path="/reviews/:id" element={<BankReviewPage/>} />
            <Route path="/banks/myaccount" element={<FavouriteBanksPage />} />
            <Route path="/banks/:id" element={<BankDetailsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)










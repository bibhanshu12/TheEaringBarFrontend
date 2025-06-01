import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import AllProducts from "./store/features/AllProducts";
import ProductsPage from "./pages/ProductsPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import OrdersPage from "./pages/OrderPage";
import SearchPage from "./pages/SearchPage";
import CareInstructions from "./components/footerElements/CareInstructions";
import FAQ from "./components/footerElements/FAQ";
import Warranty from "./components/footerElements/Warranty";
import SizingGuide from "./components/footerElements/Sizing";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/care" element={<CareInstructions />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/sizing" element={<SizingGuide />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;

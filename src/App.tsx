import Header from './components/Header';
import Hero from './components/Hero';
import ContactBar from './components/ContactBar';
import Products from './components/Products';
import Authority from './components/Authority';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Vidros = lazy(() => import('./pages/Vidros'));
const Esquadrias = lazy(() => import('./pages/Esquadrias'));
const Galeria = lazy(() => import('./pages/Galeria'));

function App() {
  return (
    <div className="font-poppins">
      <Header />
      <main>
        <Suspense fallback={<div className="min-h-[40vh] bg-white" />}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <ContactBar />
                  <Products />
                  <Authority />
                  <Testimonials />
                </>
              }
            />
            <Route path="/vidros" element={<Vidros />} />
            <Route path="/esquadrias" element={<Esquadrias />} />
            <Route path="/galeria" element={<Galeria />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;

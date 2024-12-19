import { Suspense } from 'react';
import { Loading } from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import { Navigation } from './components/Navigation';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Netflix } from './components/Netflix';
import { Team } from './components/Team';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import './styles/global.css';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Background />
        <Header />
        <Navigation />
        <Hero id="inicio" />
        <About id="sobre" />
        <Netflix />
        <Team id="team" />
        <Footer id="footer" />
        <ScrollToTop />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

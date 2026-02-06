import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
// import SplashScreen from "./components/SplashScreen";
import TubeCursor from "./components/TubeCursor";
import "./App.css";
import ContactUs from "./pages/ContactUs";
// import PageTransition from "./components/PageTransition";
import { TransitionProvider } from "./context/TransitionContext";
// import MetatrybeAnimationSystem from "./components/ui/MetatrybeAnimationSystem";
import NeoTribalFuturism from "./components/ui/NeoTribalFuturism";
// Lazy load the heavy Home page since it's hidden behind IntroCover initially
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));

const App = () => {
  return (
    <Router>
      <TransitionProvider>
        {/* <SplashScreen /> */}
        <TubeCursor />
        {/* <PageTransition /> */}
        <SmoothScroll>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact-us" element={<ContactUs />} />
              {/* <Route path="/meta" element={<MetatrybeAnimationSystem />} /> */}
              <Route path="/meta" element={<NeoTribalFuturism />} />
            </Routes>
          </Suspense>
        </SmoothScroll>
      </TransitionProvider>
    </Router>
  );
};

export default App;

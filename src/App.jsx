import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
import SplashScreen from "./components/SplashScreen";
import TubeCursor from "./components/TubeCursor";
import "./App.css";

// Lazy load the heavy Home page since it's hidden behind IntroCover initially
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));

const App = () => {
  return (
    <Router>
      <SplashScreen />
      <TubeCursor />
      <SmoothScroll>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </Suspense>
      </SmoothScroll>
    </Router>
  );
};

export default App;

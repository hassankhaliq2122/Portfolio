import React, { Suspense, lazy } from "react";
import SmoothScroll from "./components/SmoothScroll";
import SplashScreen from "./components/SplashScreen";
import "./App.css";
// import IntroCover from "./components/IntroCover";

// Lazy load the heavy Home page since it's hidden behind IntroCover initially
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <div>
      <SplashScreen />
      <SmoothScroll>
        <Suspense fallback={null}>
          <Home />
        </Suspense>
      </SmoothScroll>
    </div>
  );
};

export default App;

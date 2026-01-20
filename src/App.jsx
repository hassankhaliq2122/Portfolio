import React, { Suspense, lazy } from "react";
// import Header from "./components/Header"; // Not used directly here? Or is it inside Home?
import "./App.css";
import IntroCover from "./components/IntroCover";

// Lazy load the heavy Home page since it's hidden behind IntroCover initially
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <div>
      {/* <IntroCover /> */}
      <Suspense fallback={null}>
        <Home />
      </Suspense>
    </div>
  );
};

export default App;

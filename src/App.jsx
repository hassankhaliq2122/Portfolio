import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";
import { TransitionProvider } from "./context/TransitionContext";
import { ProjectProvider } from "./context/ProjectContext";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About/About";
import "./App.css";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Work = lazy(() => import("./pages/Work"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));

// Loader component for Suspense fallback
const Loader = () => <div className="loader">Loading...</div>;

// Wrapper to trigger PageTransition on route changes
const RouteWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <PageTransition key={location.pathname} />
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ProjectProvider>
        <TransitionProvider>
          <SmoothScroll>
            <Suspense fallback={<Loader />}>
              <RouteWrapper>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/work/:slug"
                    element={<ProjectDetail key={window.location.pathname} />}
                  />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/leads" element={<AdminLeads />} />
                </Routes>
              </RouteWrapper>
            </Suspense>
          </SmoothScroll>
        </TransitionProvider>
      </ProjectProvider>
    </Router>
  );
};

export default App;

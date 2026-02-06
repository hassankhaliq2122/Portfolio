import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState("idle"); // idle, enter, exit
  const [pendingUrl, setPendingUrl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const triggerTransition = (to) => {
    if (isTransitioning || location.pathname === to) return;

    setPendingUrl(to);
    setIsTransitioning(true);
    setTransitionStage("enter");
  };

  // Called by the PageTransition component when the "cover" animation is done
  const navigateToPending = () => {
    if (pendingUrl) {
      navigate(pendingUrl);
      setPendingUrl(null);
      // We don't set isTransitioning false yet.
      // We wait for the location to change, or we trigger the exit phase immediately.
      setTransitionStage("exit");
    }
  };

  // Called by the PageTransition component when the "reveal" animation is done
  const onTransitionComplete = () => {
    setIsTransitioning(false);
    setTransitionStage("idle");
  };

  return (
    <TransitionContext.Provider
      value={{
        triggerTransition,
        navigateToPending,
        onTransitionComplete,
        isTransitioning,
        transitionStage,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);

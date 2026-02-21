import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTransition } from "../context/TransitionContext";

const PageTransition = () => {
  const container = useRef(null);
  const { transitionStage, navigateToPending, onTransitionComplete } =
    useTransition();

  useGSAP(
    () => {
      const columns = gsap.utils.toArray(".transition-column");

      // Kill any existing tweens to prevent conflicts
      gsap.killTweensOf(columns);

      if (transitionStage === "enter") {
        // ANIMATE IN: Columns slide UP from bottom to top (covering screen)
        // Reset first
        gsap.set(columns, { transformOrigin: "bottom", scaleY: 0 });

        gsap.to(columns, {
          scaleY: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.inOut",
          onComplete: () => {
            navigateToPending();
          },
        });
      } else if (transitionStage === "exit") {
        // ANIMATE OUT: Columns slide UP (away) revealing the page
        // Transform origin needs to switch to top so they scale down from bottom->top or top->bottom?
        // To mimic "passing through", if they came from bottom, they should leave to top.
        gsap.set(columns, { transformOrigin: "top", scaleY: 1 });

        gsap.to(columns, {
          scaleY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.inOut",
          onComplete: () => {
            onTransitionComplete();
          },
        });
      }
    },
    { scope: container, dependencies: [transitionStage] },
  );

  return (
    <div
      ref={container}
      className="pointer-events-none fixed inset-0 z-[10000] flex flex-row h-screen w-screen"
      style={{ display: transitionStage === "idle" ? "none" : "flex" }} // Optimization: hide when idle
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="transition-column flex-1 bg-[#1a1a1a] border-l border-white/5 first:border-l-0"
          style={{ transform: "scaleY(0)" }} // Start hidden
        />
      ))}
    </div>
  );
};

export default PageTransition;

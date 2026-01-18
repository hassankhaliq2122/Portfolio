"use client";
import { useEffect } from "react";

const GlowingBorderWrapper = ({ children }) => {
  useEffect(() => {
    const elements = document.querySelectorAll(".glow-border");

    elements.forEach((el) => {
      const handleMove = (e) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--y", `${e.clientY - rect.top}px`);
      };

      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", () => {
        el.style.setProperty("--x", `50%`);
        el.style.setProperty("--y", `50%`);
      });
    });
  }, []);

  return (
    <>
      {children}

      <style>{`
        .glow-border {
          position: relative;
          border-radius: 16px;
          z-index: 1;
        }

        .glow-border::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 2px; /* BORDER THICKNESS */
          border-radius: inherit;
          background: radial-gradient(
            180px circle at var(--x, 50%) var(--y, 50%),
            rgba(44, 101, 225, 0.9),
            rgba(44, 101, 225, 0.4),
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;

          /* BORDER-ONLY MASK */
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .glow-border:hover::before {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default GlowingBorderWrapper;

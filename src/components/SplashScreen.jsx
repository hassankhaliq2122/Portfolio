import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import SplashLoader from "../assets/logo/SplashLoader.svg";
import "./SplashScreen.css";

gsap.registerPlugin(Flip);

const SplashScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Unmount self after all animations including ring flight are done
        // We will manually trigger completion inside the timeline to ensure sequence
      },
    });

    const ring = ringRef.current;
    if (!textRef.current || !textRef.current.children) return;

    const allLetters = Array.from(textRef.current.children);
    const mLetter = allLetters[0];
    const otherLetters = allLetters.slice(1);

    // Initial State
    // "M" centered (others hidden)
    gsap.set(otherLetters, { display: "none", autoAlpha: 0 });
    gsap.set(mLetter, { autoAlpha: 1 });
    // Ring above M
    gsap.set(ring, { scale: 0, opacity: 0, y: -100 });
    // Find Header Logo and hide it initially to prevent doubling
    const dest = document.querySelector(".header-logo-container");
    if (dest) {
      gsap.set(dest, { opacity: 0 }); // Hide real logo
    }

    // 1. Ring hits M
    tl.to(ring, {
      scale: 1,
      opacity: 1,
      y: -35,
      duration: 0.8,
      ease: "power2.in",
    }).to(ring, {
      y: -45,
      duration: 0.3,
      ease: "power1.out",
      yoyo: true,
      repeat: 1,
    });

    // 2. Reveal Text
    tl.add(() => {
      const mRectStart = mLetter.getBoundingClientRect();
      gsap.set(otherLetters, { display: "inline-block", autoAlpha: 0, x: -20 });
      const mRectEnd = mLetter.getBoundingClientRect();
      const offset = mRectStart.left - mRectEnd.left;

      gsap.fromTo(
        textRef.current,
        { x: offset },
        { x: 0, duration: 0.5, ease: "power3.inOut" },
      );
    });

    tl.to(
      otherLetters,
      {
        autoAlpha: 1,
        x: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power3.out",
      },
      "<",
    );

    // 3. Ring returns to center of text
    tl.to(ring, {
      y: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });

    // 4. Pause
    tl.to({}, { duration: 0.3 });

    // 5. Transition Phase
    // Fade out text and Background COLOR, but keep RING visible
    tl.to(
      [textRef.current],
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "flyStart",
    );

    tl.to(
      containerRef.current,
      {
        backgroundColor: "rgba(0,0,0,0)",
        duration: 0.3,
        ease: "power2.in",
      },
      "flyStart",
    );

    // 6. Fly to Header
    tl.call(
      () => {
        const dest = document.querySelector(".header-logo-container");

        if (dest) {
          const destRect = dest.getBoundingClientRect();
          const ringRect = ring.getBoundingClientRect();

          const x =
            destRect.left -
            ringRect.left +
            (destRect.width / 2 - ringRect.width / 2);
          const y =
            destRect.top -
            ringRect.top +
            (destRect.height / 2 - ringRect.height / 2);

          // Move Ring
          gsap.to(ring, {
            x: x,
            y: y,
            scale: 0.2,
            duration: 1, // Slower flight for clarity
            ease: "power3.inOut",
            onComplete: () => {
              // Ring has arrived.
              // Reveal real logo, hide ring.
              gsap.set(dest, { opacity: 1 });
              gsap.set(ring, { opacity: 0 });

              // Final cleanup: remove splash screen
              if (containerRef.current) {
                containerRef.current.style.display = "none";
              }
              if (onComplete) onComplete();
            },
          });
        } else {
          // Fallback
          gsap.to(ring, { opacity: 0, duration: 0.3 });
          if (containerRef.current) containerRef.current.style.display = "none";
          if (onComplete) onComplete();
        }
      },
      null,
      "flyStart+=0.2",
    ); // Start flying shortly after text fades

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="splash-screen" ref={containerRef}>
      <div className="splash-content">
        <div className="splash-ring-container">
          <img
            ref={ringRef}
            src={SplashLoader}
            className="splash-ring"
            alt=""
          />
        </div>
        <div className="splash-text" ref={textRef}>
          <span className="letter-m">M</span>
          <span>E</span>
          <span>T</span>
          <span>A</span>
          <span>T</span>
          <span>R</span>
          <span>Y</span>
          <span>B</span>
          <span>E</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

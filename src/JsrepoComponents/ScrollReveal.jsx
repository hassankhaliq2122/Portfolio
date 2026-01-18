import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  enableScrub = false,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: enableScrub ? "none" : "power3.out",
        duration: enableScrub ? undefined : 1,
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top 80%", // Trigger slightly earlier/standard
          end: rotationEnd,
          scrub: enableScrub,
          toggleActions: enableScrub ? undefined : "play none none reverse",
        },
      },
    );

    const wordElements = el.querySelectorAll(".word");

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: enableScrub ? "none" : "power3.out",
        duration: enableScrub ? undefined : 1,
        opacity: 1,
        stagger: 0.02, // Faster stagger for paragraphs
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top 80%",
          end: wordAnimationEnd,
          scrub: enableScrub,
          toggleActions: enableScrub ? undefined : "play none none reverse",
        },
      },
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: enableScrub ? "none" : "power3.out",
          duration: enableScrub ? undefined : 1,
          filter: "blur(0px)",
          stagger: 0.02,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 80%",
            end: wordAnimationEnd,
            scrub: enableScrub,
            toggleActions: enableScrub ? undefined : "play none none reverse",
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    enableScrub,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollReveal;

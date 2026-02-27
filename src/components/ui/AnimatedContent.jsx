import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  container,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = "power3.in",
  onComplete,
  onDisappearanceComplete,
  className = "",
  ...props
}) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || isMobile) return;

    const scrollerTarget = container || null;

    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    const animation = gsap.fromTo(
      el,
      {
        [axis]: offset,
        scale,
        opacity: animateOpacity ? initialOpacity : 1,
      },
      {
        [axis]: 0,
        scale: 1,
        opacity: 1,
        duration,
        ease,
        delay,
        paused: true,
        onComplete: () => {
          if (onComplete) onComplete();
          if (disappearAfter > 0) {
            gsap.to(el, {
              [axis]: reverse ? distance : -distance,
              scale: 0.8,
              opacity: animateOpacity ? initialOpacity : 0,
              delay: disappearAfter,
              duration: disappearDuration,
              ease: disappearEase,
              onComplete: () => onDisappearanceComplete?.(),
            });
          }
        },
      },
    );

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget,
      start: "top 95%",
      once: true,
      invalidateOnRefresh: true,
      toggleActions: "play none none none",
      onEnter: () => animation.play(),
      onRefresh: (self) => {
        if (self.progress > 0) {
          animation.progress(1);
          animation.play();
        }
      },
    });

    return () => {
      st.kill();
      animation.kill();
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete,
  ]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isMobile ? 1 : 0,
        visibility: "visible",
        willChange: isMobile ? "auto" : "transform, opacity",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedContent;

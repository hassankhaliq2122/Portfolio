import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./IntroCover.css";

// Import Assets
import skyImg from "../assets/Intro/sky.jpg";
import mountBg from "../assets/Intro/mountBg.webp";
import mountMg from "../assets/Intro/mountMg.png";
import mountFg from "../assets/Intro/mountFg.png";
import cloud1 from "../assets/Intro/cloud1.png";
import cloud2 from "../assets/Intro/cloud2.webp";
// import cloud3 from '../assets/intro/cloud3.png'; // Optional extra cloud

gsap.registerPlugin(ScrollTrigger);

const IntroCover = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cloudLeftRef = useRef(null);
  const cloudRightRef = useRef(null);
  const mountBgRef = useRef(null);
  const mountMgRef = useRef(null);
  const mountFgRef = useRef(null);

  // State for text swapping is risky with GSAP scrubbing since standard React state updates might lag or flicker during scrub.
  // Better to use TWO text elements and crossfade them, or a single element and swap text in a callback (careful with scrub).
  // For smoothness in scrub, we will use TWO text elements: "EXPLORE" and "FUTURE".

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500", // Shorter scroll distance for quicker access to content
          pin: true,
          scrub: 1,
          // markers: true // Debugging
        },
      });

      // Initial State via CSS is set.
      // Stage 1: Scroll starts.
      // Parallax effect on mountains (they move down slightly at different speeds)
      // Clouds (Left and Right) move INWARD to cover the screen.

      tl.addLabel("start")
        .to(mountBgRef.current, { y: 100 }, "start")
        .to(mountMgRef.current, { y: 100 }, "start")
        .to(mountFgRef.current, { y: 100 }, "start")

        // Clouds Converge to Center
        .to(
          cloudLeftRef.current,
          { x: "50%", ease: "power1.inOut", duration: 2 },
          "start",
        )
        .to(
          cloudRightRef.current,
          { x: "-50%", ease: "power1.inOut", duration: 2 },
          "start",
        )

        // Text Transition: EXPLORE fades out as Clouds cover it.
        .to(".text-explore", { opacity: 0, duration: 0.5 }, "start+=1")

        // At this point (duration ~2), Clouds are fully covering the center.
        // We ensure opacity is 1 for the covered state.

        // Stage 2: Clouds are covered. Swap implied.
        // We reveal "FUTURE" which was hidden behind or opacity 0.

        .addLabel("covered")
        .fromTo(
          ".text-future",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5 },
          "covered-=0.5",
        )

        // Stage 3: Clouds Part / Reveal Website
        // Clouds move AWAY even further or fade out?
        // User said: "IntroCover scrolls away and reveals my existing Home content"
        // And "Open like a shutter".
        // So we keep moving them until they are off screen? Or we scale the whole IntroContainer away?
        // Let's Move them OFF SCREEN completely to sides, revealing the "Home" behind this Pinned Container?
        // Wait, if this container is opaque sky, we need to dissolve the SKY too?
        // OR the Sky itself is the shutter?
        // User Request: "IntroCover must be full screen... On scroll down... visually opens like a shutter... reveals my existing Home content"

        // So the WHOLE SCENERY needs to open up or fade out.
        // Since we have layers, we probably want the CLOUDS to open up, and the background (sky/mountains) to fade out or slide away.

        .addLabel("reveal")
        // Clouds go completely off-screen
        .to(cloudLeftRef.current, { x: "-100%", ease: "power2.in" }, "reveal")
        .to(cloudRightRef.current, { x: "100%", ease: "power2.in" }, "reveal")

        // Meanwhile, the mountains and sky need to disappear to show Home?
        // Or do we want the FUTURE text to stay for a second?

        // Let's scale up the FUTURE text nicely
        .to(
          ".text-future",
          { scale: 5, opacity: 0, ease: "power2.in" },
          "reveal",
        )

        // And fade/mask out the background components so Home is visible.
        .to(
          [
            mountBgRef.current,
            mountMgRef.current,
            mountFgRef.current,
            ".intro-sky",
          ],
          { autoAlpha: 0, duration: 0.5 },
          "reveal+=0.2",
        );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="intro-container">
      {/* Background Sky */}
      <div
        className="intro-sky"
        style={{ backgroundImage: `url(${skyImg})` }}
      ></div>

      {/* Mountains Layered */}
      <img
        ref={mountBgRef}
        src={mountBg}
        alt="Mountains Back"
        className="mountain mount-bg"
      />
      <img
        ref={mountMgRef}
        src={mountMg}
        alt="Mountains Mid"
        className="mountain mount-mg"
      />
      <img
        ref={mountFgRef}
        src={mountFg}
        alt="Mountains Front"
        className="mountain mount-fg"
      />

      {/* Text Layers */}
      <div className="text-container">
        <h1 ref={textRef} className="intro-text text-explore">
          EXPLORE
        </h1>
        <h1 className="intro-text text-future">FUTURE</h1>
      </div>

      {/* Clouds - The "Curtains" */}
      <img
        ref={cloudLeftRef}
        src={cloud1}
        alt="Cloud Left"
        className="cloud cloud-left"
      />
      <img
        ref={cloudRightRef}
        src={cloud2}
        alt="Cloud Right"
        className="cloud cloud-right"
      />

      <div className="scroll-inst">SCROLL TO BEGIN</div>
    </div>
  );
};

export default IntroCover;

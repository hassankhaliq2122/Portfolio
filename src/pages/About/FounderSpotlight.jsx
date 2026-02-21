import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useTransform } from "framer-motion";
import founderImg from "../../assets/about/founder.png";

gsap.registerPlugin(ScrollTrigger);

const FounderSpotlight = () => {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current.querySelectorAll(
        ".about-founder__image-wrap, .about-founder__info",
      );

      gsap.fromTo(
        els,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-founder" ref={sectionRef}>
      <div className="about-founder__inner">
        <div className="about-founder__image-wrap">
          <motion.div
            className="about-founder__image-frame"
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
            <div
              className="about-founder__image"
              role="img"
              aria-label="Founder portrait"
              style={{ backgroundImage: `url(${founderImg})` }}
            />
          </motion.div>
        </div>

        <div className="about-founder__info">
          <p className="about-founder__label">Founder & Lead Engineer</p>
          <h2 className="about-founder__name">Badr Rehman</h2>
          <p className="about-founder__role">
            CEO & Creative Director — MetaTrybe
          </p>
          <p className="about-founder__bio">
            A relentless builder at the intersection of design engineering and
            digital strategy. Leading MetaTrybe with a vision to deliver
            world-class digital systems that elevate brands from local presence
            to international authority.
          </p>
          <div className="about-founder__expertise">
            <span className="about-founder__expertise-label">
              Core Expertise
            </span>
            <div className="about-founder__expertise-tags">
              <span className="about-founder__tag">Web Architecture</span>
              <span className="about-founder__tag">SaaS Design</span>
              <span className="about-founder__tag">Brand Systems</span>
              <span className="about-founder__tag">
                Performance Engineering
              </span>
              <span className="about-founder__tag">AI Integration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSpotlight;

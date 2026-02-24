import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Premium Websites",
    desc: "High-converting, visually striking websites that communicate authority and drive measurable growth.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Luxury Brand Platforms",
    desc: "Bespoke digital experiences for luxury brands that demand exclusivity in every pixel.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "SaaS Interfaces",
    desc: "Scalable, intuitive product interfaces built for performance and seamless user workflows.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M2 10h20" />
        <path d="M6 6h.01M10 6h.01" />
      </svg>
    ),
  },
  {
    title: "Business Systems",
    desc: "Enterprise-grade web applications engineered for scalability, security, and operational efficiency.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Startup MVPs",
    desc: "Rapid, production-ready prototypes that validate ideas and attract investment with precision.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "AI-Powered Web Experiences",
    desc: "Intelligent web platforms leveraging AI for personalization, automation, and predictive UX.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22" />
        <path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93" />
        <path d="M8.56 14.5a6 6 0 0 0 6.88 0" />
      </svg>
    ),
  },
];

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const ServiceMatrix = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current.querySelector(
        ".about-services__header",
      );
      const cards = sectionRef.current.querySelectorAll(
        ".about-services__card",
      );

      gsap.fromTo(
        header,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-services" ref={sectionRef}>
      <div className="about-services__inner">
        <div className="about-services__header">
          <h2 className="about-services__title">Engineered Solutions</h2>
        </div>
        <div className="about-services__grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="about-services__card"
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
            >
              <div className="about-services__card-icon">{service.icon}</div>
              <h3 className="about-services__card-title">{service.title}</h3>
              <p className="about-services__card-desc">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceMatrix;

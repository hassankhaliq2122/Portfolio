import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Muhammad Hamza",
    role: "CEO & Creative Director",
    color: "#2563eb",
  },
  {
    name: "Sara Khan",
    role: "Lead UI/UX Designer",
    color: "#3b82f6",
  },
  {
    name: "Ahmed Raza",
    role: "Senior Frontend Engineer",
    color: "#1d4ed8",
  },
  {
    name: "Fatima Ali",
    role: "Backend Architect",
    color: "#2563eb",
  },
  {
    name: "Usman Tariq",
    role: "DevOps & Cloud Engineer",
    color: "#3b82f6",
  },
  {
    name: "Ayesha Malik",
    role: "Product Strategist",
    color: "#1d4ed8",
  },
];

const cardVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const TeamMatrix = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current.querySelector(".about-team__header");
      const cards = sectionRef.current.querySelectorAll(".about-team__card");

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
          stagger: 0.08,
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
    <section className="about-team" ref={sectionRef}>
      <div className="about-team__inner">
        <div className="about-team__header">
          <h2 className="about-team__title">Engineering Excellence</h2>
        </div>
        <div className="about-team__grid">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="about-team__card"
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
            >
              <div className="about-team__card-image-wrap">
                {/* Gradient placeholder for team member photo */}
                <div
                  className="about-team__card-image"
                  style={{
                    background: `linear-gradient(135deg, #e2e8f0 0%, ${member.color}22 100%)`,
                  }}
                  role="img"
                  aria-label={`${member.name} portrait`}
                />
              </div>
              <div className="about-team__card-info">
                <h3 className="about-team__card-name">{member.name}</h3>
                <p className="about-team__card-role">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMatrix;

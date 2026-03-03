import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import "./ServicesDrawer.css";
import AnimatedContent from "./ui/AnimatedContent";

const services = [
  {
    id: "01",
    title: "Premium Website Design",
    description:
      "High-End UI/UX Design Crafted To Elevate Your Brand, Engage Users, And Create Memorable Digital Experiences.",
  },
  {
    id: "02",
    title: "Web Development Services",
    description:
      "Robust and scalable web development solutions tailored to meet your specific business needs with cutting-edge technology.",
  },
  {
    id: "03",
    title: "WordPress Development",
    description:
      "Custom WordPress themes and plugins designed to provide a flexible and easy-to-manage content management system.",
  },
  {
    id: "04",
    title: "Luxury Business Websites",
    description:
      "Exclusive web designs for luxury brands that demand sophistication, elegance, and a seamless user journey.",
  },
];

const ServicesDrawer = () => {
  const [activeId, setActiveId] = useState("01");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleToggle = (id) => {
    // If clicking already active, keep it active or toggle to null?
    // Usually accordions toggle.
    setActiveId(activeId === id ? null : id);
  };

  // Shared transition config for smoothness
  const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  };

  const smoothTransition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <div className="services-drawer-section">
      <AnimatedContent
        direction="vertical"
        distance={100}
        duration={0.8}
        delay={0}
        initialOpacity={0}
        scale={1}
        threshold={0.1}
        disappearAfter={0}
        disappearDuration={0.5}
        ease="power3.out"
        disappearEase="power3.in"
      >
        <div className="services-drawer-container">
          {/* Left Side */}
          <div className="services-left">
            <h2 className="services-title">Our Premium Services</h2>
            <p className="services-note">
              Proactive Customer Engagement & Follow-Ups
            </p>
          </div>

          {/* Right Side - Accordion */}
          <div className="services-right">
            {services.map((service) => (
              <motion.div
                layout
                key={service.id}
                className={`service-item service-item-${service.id} ${
                  activeId === service.id ? "active" : ""
                }`}
                onClick={() => handleToggle(service.id)}
                transition={isMobile ? { duration: 0 } : smoothTransition}
              >
                <div className="service-header">
                  <h3 className="service-name">{service.title}</h3>
                  <span className="service-number">{service.id}</span>
                </div>

                <AnimatePresence initial={false}>
                  {activeId === service.id && (
                    <motion.div
                      key="content"
                      className="service-body"
                      initial={
                        isMobile
                          ? { height: "auto", opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        isMobile
                          ? { height: 0, opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={isMobile ? { duration: 0 } : smoothTransition}
                    >
                      <div className="service-content-wrapper">
                        <motion.p
                          className="service-description"
                          initial={
                            isMobile
                              ? { y: 0, opacity: 1 }
                              : { y: 20, opacity: 0 }
                          }
                          animate={{ y: 0, opacity: 1 }}
                          exit={
                            isMobile
                              ? { y: 0, opacity: 1 }
                              : { y: 10, opacity: 0 }
                          }
                          transition={
                            isMobile ? { duration: 0 } : { duration: 0.4 }
                          }
                        >
                          {service.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedContent>
    </div>
  );
};

export default ServicesDrawer;

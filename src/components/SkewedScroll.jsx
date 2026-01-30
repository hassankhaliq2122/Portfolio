import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./SkewedScroll.css";
import service1 from "../assets/ServicesPage/services1.png";
import service2 from "../assets/ServicesPage/services2.png";
import service3 from "../assets/ServicesPage/services3.png";
import service4 from "../assets/ServicesPage/services4.png";
import ArrowButton from "./ArrowButton";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pagesData = [
  {
    id: 1,
    heading: "Website Design",
    description:
      "We design premium, user-focused websites that blend strategy, aesthetics, and usability. From UX architecture to high-fidelity UI, every detail is crafted to elevate your brand and drive engagement.",
    img: service1,
    darkBg: false, // Right side dark (content on left)
    listItems: [
      "UX Research & Information Architecture",
      "Wireframing & User Flows",
      "UI Design & Design System",
      "Prototyping & Interaction Design",
      "Responsive & Accessibility Design",
    ],
    buttonText: "Contact Us",
  },
  {
    id: 2,
    heading: "Web Development",
    description:
      "Transform your ideas into powerful, scalable web applications with our expert development team. We build custom solutions using the latest technologies and best practices.",
    img: service2,
    darkBg: true, // Right side dark (content on left)
    listItems: [
      "Custom Web Applications",
      "RESTful API Development",
      "Database Design & Integration",
      "Performance Optimization",
      "Security Best Practices",
    ],
    buttonText: "Contact Us",
  },
  {
    id: 3,
    heading: "WordPress Development",
    description:
      "Create stunning, easy-to-manage WordPress websites that empower you to control your content. From custom themes to complex plugins, we deliver WordPress solutions that scale with your business.",
    img: service3,
    darkBg: false, // Right side dark (content on left)
    listItems: [
      "Custom WordPress Themes",
      "Plugin Development & Integration",
      "E-Commerce Solutions",
      "Performance Optimization",
      "Security & Maintenance",
    ],
    buttonText: "Contact Us",
  },
  {
    id: 4,
    heading: "WordPress Development",
    description:
      "Create stunning, easy-to-manage WordPress websites that empower you to control your content. From custom themes to complex plugins, we deliver WordPress solutions that scale with your business.",
    img: service4,
    darkBg: true, // Right side dark (content on left)
    listItems: [
      "Custom WordPress Themes",
      "Plugin Development & Integration",
      "E-Commerce Solutions",
      "Performance Optimization",
      "Security & Maintenance",
    ],
    buttonText: "Contact Us",
  },
];

// Preload images to prevent production glitches
const imageUrls = [service1, service2, service3, service4];

export default function SkewedScroll() {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images before initializing ScrollTrigger
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        setImagesLoaded(true);
      }
    };

    imageUrls.forEach((src) => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      img.src = src;
    });

    // Fallback timeout
    const timeout = setTimeout(() => {
      setImagesLoaded(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  useGSAP(
    () => {
      if (!imagesLoaded) return;

      const panels = panelsRef.current.filter(Boolean);
      const totalPanels = panels.length;

      // Kill any existing ScrollTriggers for this container to prevent duplicates
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) {
          st.kill();
        }
      });

      // Initial States
      panels.forEach((panel, i) => {
        const leftHalf = panel.querySelector(".skw-page__half--left");
        const rightHalf = panel.querySelector(".skw-page__half--right");
        const content = panel.querySelectorAll(".skw-page__content");

        if (i === 0) {
          // First panel visible
          gsap.set([leftHalf, rightHalf], { x: 0, y: 0 });
          gsap.set(content, { opacity: 1, scale: 1 });
        } else {
          // Others hidden/inactive
          gsap.set(leftHalf, { x: "-32.4vh", y: "100%" });
          gsap.set(rightHalf, { x: "32.4vh", y: "-100%" });
          gsap.set(content, { opacity: 0.5, scale: 0.95 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${window.innerHeight * (totalPanels * 1.5)}`,
          pin: true,
          pinSpacing: true, // Key fix for footer overlap
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Key fix for resize glitches
        },
      });

      panels.forEach((panel, i) => {
        if (i < totalPanels - 1) {
          const nextPanel = panels[i + 1];
          const currContent = panel.querySelectorAll(".skw-page__content");

          const nextLeft = nextPanel.querySelector(".skw-page__half--left");
          const nextRight = nextPanel.querySelector(".skw-page__half--right");
          const nextContent = nextPanel.querySelectorAll(".skw-page__content");

          tl.add(`step${i}`)
            // Current panel content fades out/scales down
            .to(
              currContent,
              {
                opacity: 0.5,
                scale: 0.95,
                duration: 1,
                ease: "none",
              },
              `step${i}`,
            )
            // Next panel slides in
            .to(
              [nextLeft, nextRight],
              {
                x: 0,
                y: 0,
                duration: 1,
                ease: "none",
              },
              `step${i}`,
            )
            // Next panel content fades in/scales up
            .to(
              nextContent,
              {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "none",
              },
              `step${i}`,
            );
        }
      });

      // Refresh ScrollTrigger after setup to ensure correct calculations
      ScrollTrigger.refresh();

      // Cleanup function
      return () => {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
      };
    },
    { scope: containerRef, dependencies: [imagesLoaded] },
  );

  return (
    <div
      ref={containerRef}
      className="skw-pages-container"
      style={{ height: "100vh", position: "relative" }}
    >
      {" "}
      {/* Add container wrapper for pinning */}
      <div className="skw-pages">
        {pagesData.map((page, index) => (
          <div
            key={page.id}
            className={`skw-page skw-page-${page.id}`}
            ref={(el) => (panelsRef.current[index] = el)}
          >
            {/* Left Half */}
            <div className="skw-page__half skw-page__half--left">
              <div className="skw-page__skewed">
                <div
                  className="skw-page__content"
                  style={
                    !page.darkBg
                      ? {
                          backgroundColor: "#ffffff",
                        }
                      : {
                          backgroundImage: `url(${page.img})`,
                        }
                  }
                >
                  {/* Content for Left Side (if it's the text side - i.e. NOT darkBg) */}
                  {!page.darkBg && (
                    <>
                      <h2 className="skw-page__heading">{page.heading}</h2>
                      <p className="skw-page__description">
                        {page.description}
                      </p>
                      {page.listItems && page.listItems.length > 0 && (
                        <ul className="skw-page__list">
                          {page.listItems.map((item, index) => (
                            <li key={index} className="skw-page__list-item">
                              <span className="check-icon-wrapper">
                                <Check
                                  size={16}
                                  color="#3b82f6"
                                  strokeWidth={3}
                                />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {page.buttonText && (
                        <div className="skw-page__btn-wrapper">
                          <ArrowButton text={page.buttonText} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Half */}
            <div className="skw-page__half skw-page__half--right">
              <div className="skw-page__skewed">
                <div
                  className="skw-page__content"
                  style={
                    page.darkBg
                      ? {
                          backgroundColor: "#ffffff",
                        }
                      : {
                          backgroundImage: `url(${page.img})`,
                        }
                  }
                >
                  {/* Content for Right Side (if it's the text side - i.e. darkBg) */}
                  {page.darkBg && (
                    <>
                      <h2 className="skw-page__heading">{page.heading}</h2>
                      <p className="skw-page__description">
                        {page.description}
                      </p>
                      {page.listItems && page.listItems.length > 0 && (
                        <ul className="skw-page__list">
                          {page.listItems.map((item, index) => (
                            <li key={index} className="skw-page__list-item">
                              <span className="check-icon-wrapper">
                                <Check
                                  size={16}
                                  color="#3b82f6"
                                  strokeWidth={3}
                                />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {page.buttonText && (
                        <div className="skw-page__btn-wrapper">
                          <ArrowButton text={page.buttonText} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

export default function SkewedScroll() {
  const containerRef = useRef(null);
  const [curPage, setCurPage] = useState(1);
  const totalPages = pagesData.length;

  useEffect(() => {
    const container = containerRef.current;

    // Create ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${totalPages * 100}%`, // Scroll distance proportional to pages
      pin: true,
      scrub: 0.5, // Smooth scrubbing
      onUpdate: (self) => {
        // Calculate current page based on scroll progress
        // progress is 0 to 1
        // Map to 1 to totalPages
        // We use Math.min/max to clamp
        const progress = self.progress;
        // Divide progress into segments for each page
        // e.g., 4 pages. 0-0.25 -> page 1, 0.25-0.5 -> page 2, etc.
        // Actually, logic: if on page 1, show page 1. Scroll triggers switch.
        // Let's use simpler logic:
        // Page index = floor(progress * totalPages)
        // Clamp to 0 to totalPages - 1
        let pageIndex = Math.floor(progress * totalPages);
        if (pageIndex >= totalPages) pageIndex = totalPages - 1;
        setCurPage(pageIndex + 1);
      },
    });

    return () => {
      st.kill();
    };
  }, [totalPages]);

  return (
    <div
      ref={containerRef}
      className="skw-pages-container"
      style={{ height: "100vh", position: "relative" }}
    >
      {" "}
      {/* Add container wrapper for pinning */}
      <div className="skw-pages">
        {pagesData.map((page) => (
          <div
            key={page.id}
            className={`skw-page skw-page-${page.id} ${
              page.id === curPage ? "active" : ""
            } ${page.id < curPage ? "inactive" : ""}`}
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

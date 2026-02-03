import React, { useEffect, useRef, useState } from "react";
import headerLogo from "../assets/logo/Header.svg";
import "./Header.css";
import ArrowButton from "./ArrowButton";
import FullPageMenu from "./FullPageMenu";
import { AnimatedThemeToggler } from "./ui/AnimatedThemeToggler";

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // scrolling down
        setHidden(true);
      } else {
        // scrolling up
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`header ${hidden ? "hide" : ""}`}>
      <div className="headerContainer">
        <header>
          <img
            src={headerLogo}
            className="header-logo-container"
            style={{ width: "166px", height: "52px" }}
            alt="Header Logo"
          />
        </header>

        <div className="headerLinks">
          <ul>
            <li>
              <p className="headerText">Let's brand up your website</p>
            </li>
            <AnimatedThemeToggler className="text-gray-700 dark:text-gray-200" />
            <ArrowButton text="Book a call" />
            <FullPageMenu />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import headerLogo from "../assets/logo/HeaderLogo.png";
import "./Header.css";
import ArrowButton from "./ArrowButton";
import FullPageMenu from "./FullPageMenu";
import { AnimatedThemeToggler } from "./ui/AnimatedThemeToggler";

const Header = () => {
  return (
    <>
      <div className="header">
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
      <hr
        style={{
          width: "100%",
          height: "1px",
          color: "#E6E9EF",
          margin: "15px 0",
          border: "none",
          backgroundColor: "#E6E9EF",
        }}
      />
    </>
  );
};

export default Header;

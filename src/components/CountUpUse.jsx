import React from "react";
import CountUp from "./ui/CountUp";
const CountUpUse = ({ text }) => {
  // Extract number and suffix
  const number = parseFloat(text.replace(/,/g, ""));
  const suffix = text.replace(/[0-9.,]/g, "");

  return (
    <span
      className="count-up-wrapper"
      style={{ display: "inline-flex", alignItems: "baseline" }}
    >
      <CountUp
        startCounting
        className="count-up-text"
        to={!isNaN(number) ? number : 0}
        from={0}
        direction="up"
        delay={0}
        duration={2}
        separator=","
        onStart={() => console.log("started")}
        onEnd={() => console.log("ended")}
      />
      <span className="count-up-suffix">{suffix}</span>
    </span>
  );
};

export default CountUpUse;

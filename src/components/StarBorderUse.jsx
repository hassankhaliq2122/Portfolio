import React from "react";
import StarBorder from "./StarBorder";
const StarBorderUse = () => {
  return (
    <div>
      <StarBorder as="button" className="custom-class" color="cyan" speed="5s">
        // content
      </StarBorder>
    </div>
  );
};

export default StarBorderUse;

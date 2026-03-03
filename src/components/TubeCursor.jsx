import { useEffect, useRef } from "react";
import "./TubeCursor.css";

const TubeCursor = ({
  className = "",
  tubeColors = ["#0A2540", "#102A43", "#1E3A8A"],
  lightColors = ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"],
  lightIntensity = 200,
  minWidth = 768,
}) => {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  // Initialize/destroy cursor based on screen width
  useEffect(() => {
    // Skip on mobile
    if (window.innerWidth < minWidth) {
      if (appRef.current && appRef.current.dispose) {
        appRef.current.dispose();
      }
      appRef.current = null;
      return;
    }

    // Dynamically load the script
    const loadTubesCursor = async () => {
      try {
        const module = await import(
          /* webpackIgnore: true */
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        );

        const TubesCursor = module.default;

        if (canvasRef.current && !appRef.current) {
          appRef.current = TubesCursor(canvasRef.current, {
            renderer: {
              alpha: true,
            },
            tubes: {
              colors: tubeColors,
              lights: {
                intensity: lightIntensity,
                colors: lightColors,
              },
            },
          });
        }
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    loadTubesCursor();

    return () => {
      if (appRef.current && appRef.current.dispose) {
        appRef.current.dispose();
      }
      appRef.current = null;
    };
  }, [tubeColors, lightColors, lightIntensity, minWidth]);

  return (
    <div className={`tube-cursor-wrapper ${className}`}>
      <canvas ref={canvasRef} className="tube-cursor-canvas" />
    </div>
  );
};

export default TubeCursor;

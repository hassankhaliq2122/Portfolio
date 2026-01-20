import MetallicPaint, {
  parseLogoImage,
} from "../JsrepoComponents/MetallicPaint";
import { useState, useEffect } from "react";
// import logo from "../assets/logo/Footer.svg";

const MetallicPaintUse = () => {
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(logo);
        if (!response.ok) {
          throw new Error(`Failed to fetch logo: ${response.status}`);
        }

        const blob = await response.blob();
        const file = new File([blob], "footer-logo.svg", {
          type: "image/svg+xml",
        });

        const parsedData = await parseLogoImage(file);
        if (parsedData?.imageData) {
          setImageData(parsedData.imageData);
        } else {
          throw new Error("Failed to parse image data");
        }
      } catch (err) {
        console.error("Error loading MetallicPaint image:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadDefaultImage();
  }, []);

  if (error) {
    return (
      <div style={{ color: "#ff6b6b", textAlign: "center", padding: "20px" }}>
        Error loading effect: {error}
      </div>
    );
  }

  if (isLoading || !imageData) {
    return (
      <div
        style={{
          width: "100%",
          height: "350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "350px" }}>
      <MetallicPaint
        imageData={imageData}
        params={{
          edge: 0.0,
          patternBlur: 0.006,
          patternScale: 5,
          refraction: 0.015,
          speed: 0.3,
          liquid: 0.02,
        }}
      />
    </div>
  );
};

export default MetallicPaintUse;

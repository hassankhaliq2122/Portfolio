import React from "react";
import { MaskContainer } from "./ui/svg-mask-effect";
import Star from "../assets/icons/Star.png";
import "./Comments.css";
const Comments = () => {
  const mainQuote =
    "“Metatrybe Perfectly Combined Premium Design Aesthetics With Strategic Thinking. The Result Was A Luxury Website That Truly Represents Our Brand.”";

  return (
    <div className="comments-container">
      <div className="comments-left">
        <h3>What Our Clients Say</h3>
      </div>

      <div className="comments-right">
        {/* Main Testimonial with Mask Effect */}
        <div className="main-testimonial">
          <div className="star-rating">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={Star} alt="star" className="star" />
            ))}
            <span className="project-type">(Luxury Business Website)</span>
          </div>

          <MaskContainer
            revealText={
              <div className="mask-quote-text" >
                {mainQuote}
              </div>
            }
            className="comments-mask-container"
            size={0} // Default mask size (hidden or small)
            revealSize={0} // Flashlight size
          >
        
          </MaskContainer>

          <div className="quote-author-block">
            <h4>Darbpay</h4>
            <span>B2B AI SaaS, KSA</span>
          </div>
        </div>

        {/* Grid of smaller testimonials */}
        <div className="testimonials-grid">
          {/* 1 */}
          <div className="small-testimonial">
            <div className="star-rating" style={{ marginBottom: "10px" }}>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={Star} alt="star" className="star" />
              ))}
            </div>
            <span className="project-type" style={{ marginLeft: 0 }}>
              (Luxury Business Website)
            </span>

            <p>
              “We wanted a luxury, high-end website—and Metatrybe delivered
              exactly that. From UX strategy to final execution, everything felt
              thoughtful and refined. The result is a website we’re proud to
              showcase to our clients.”
            </p>

            <div>
              <h4>Rozee Digital</h4>
              <span>Marketing Agency, Canada</span>
            </div>
          </div>

          {/* 2 */}
          <div className="small-testimonial">
            <div className="star-rating" style={{ marginBottom: "10px" }}>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={Star} alt="star" className="star" />
              ))}
            </div>
            <span className="project-type" style={{ marginLeft: 0 }}>
              (WordPress Development)
            </span>

            <p>
              “Working with Metatrybe was effortless. They transformed our ideas
              into a beautifully structured WordPress website that’s easy to
              manage and looks stunning on all devices. Professional, creative,
              and very detail-oriented.”
            </p>

            <div>
              <h4>Elysea Health</h4>
              <span>Health Care, Australia</span>
            </div>
          </div>

          {/* 3 */}
          <div className="small-testimonial">
            <div className="star-rating" style={{ marginBottom: "10px" }}>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={Star} alt="star" className="star" />
              ))}
            </div>
            <span className="project-type" style={{ marginLeft: 0 }}>
              (Premium Website Design)
            </span>

            <p>
              “Metatrybe exceeded our expectations from start to finish. The
              design quality, attention to detail, and user experience were on a
              completely different level. Our website now truly reflects our
              brand and has significantly improved engagement.”
            </p>

            <div>
              <h4>Doaz</h4>
              <span>Information Technology, South Korea</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;

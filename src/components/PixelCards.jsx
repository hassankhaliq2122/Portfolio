import { useEffect, useRef } from "react";
import "./PixelCards.css";
/* ===================== PIXEL CLASS ===================== */
class Pixel {
  constructor(canvas, ctx, x, y, color, speed, delay) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = Math.random() * 0.8 * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSize = Math.random() * 1.5 + 0.5;
    this.delay = delay;
    this.counter = 0;
    this.counterStep =
      Math.random() * 4 + (canvas.width + canvas.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  appear() {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) this.isShimmer = true;
    this.isShimmer ? this.shimmer() : (this.size += this.sizeStep);

    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }

    this.size -= 0.1;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    if (this.size <= this.minSize) this.isReverse = false;
    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

/* ===================== PIXEL CANVAS ===================== */
/* ===================== MAIN COMPONENT ===================== */
export default function PixelCards({
  gap = 10,
  speed = 25,
  colors = ["#e0f2fe", "#7dd3fc", "#0ea5e9"],
  noFocus = false,
  className = "",
  style = {},
  cardRef = null, // Reference to parent card for hover events
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const pixels = useRef([]);
  const animation = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");

    const createPixels = () => {
      pixels.current = [];
      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const delay = Math.hypot(x - canvas.width / 2, y - canvas.height / 2);
          pixels.current.push(
            new Pixel(canvas, ctx, x, y, color, speed * 0.001, delay),
          );
        }
      }
    };

    const resize = () => {
      if (!wrapper) return;
      const { width, height } = wrapper.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      createPixels();
    };

    const animate = (type) => {
      cancelAnimationFrame(animation.current);

      const loop = () => {
        animation.current = requestAnimationFrame(loop);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pixels.current.forEach((p) => p[type]());
      };

      loop();
    };

    resize();
    window.addEventListener("resize", resize);

    // Use cardRef (parent) for hover events if provided, otherwise use the wrapper
    const hoverTarget = cardRef?.current || wrapper;

    const handleMouseEnter = () => animate("appear");
    const handleMouseLeave = () => animate("disappear");
    const handleFocusIn = () => animate("appear");
    const handleFocusOut = () => animate("disappear");

    hoverTarget.addEventListener("mouseenter", handleMouseEnter);
    hoverTarget.addEventListener("mouseleave", handleMouseLeave);

    if (!noFocus) {
      hoverTarget.addEventListener("focusin", handleFocusIn);
      hoverTarget.addEventListener("focusout", handleFocusOut);
    }

    return () => {
      window.removeEventListener("resize", resize);
      hoverTarget.removeEventListener("mouseenter", handleMouseEnter);
      hoverTarget.removeEventListener("mouseleave", handleMouseLeave);
      if (!noFocus) {
        hoverTarget.removeEventListener("focusin", handleFocusIn);
        hoverTarget.removeEventListener("focusout", handleFocusOut);
      }
      cancelAnimationFrame(animation.current);
    };
  }, [gap, speed, colors, noFocus, cardRef]);

  return (
    <div
      ref={wrapperRef}
      className={`pixel-wrapper ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

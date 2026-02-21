import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "./MetatrybeAnimation.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const MetatrybeAnimationSystem = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [consciousnessLevel, setConsciousnessLevel] = useState(0);
  const [activeDimension, setActiveDimension] = useState(0);

  // Quantum particles system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class QuantumParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`;
        this.entanglement = Math.floor(Math.random() * particles.length);
        this.waveFunction = Math.random() * Math.PI * 2;
        this.charge = Math.random() > 0.5 ? 1 : -1;
      }

      update(mouse) {
        // Quantum tunneling effect
        if (Math.random() > 0.99) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }

        // Wave function collapse on interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.waveFunction += 0.1;
          this.x += Math.cos(this.waveFunction) * 2;
          this.y += Math.sin(this.waveFunction) * 2;
        } else {
          this.x += this.speedX;
          this.y += this.speedY;
        }

        // Entanglement connection
        if (particles[this.entanglement]) {
          const entangled = particles[this.entanglement];
          const ex = entangled.x - this.x;
          const ey = entangled.y - this.y;
          const edistance = Math.sqrt(ex * ex + ey * ey);

          if (edistance < 200) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 220, 255, ${0.2 * (1 - edistance / 200)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(entangled.x, entangled.y);
            ctx.stroke();
          }
        }

        // Boundary check with quantum reflection
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX * (0.9 + Math.random() * 0.2);
          this.waveFunction += Math.PI;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY * (0.9 + Math.random() * 0.2);
          this.waveFunction += Math.PI;
        }

        // Consciousness field influence
        const consciousnessField = consciousnessLevel / 100;
        this.x += (Math.random() - 0.5) * consciousnessField;
        this.y += (Math.random() - 0.5) * consciousnessField;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(
          this.x,
          this.y,
          this.size * (1 + consciousnessLevel / 50),
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // Quantum glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 220, 255, ${0.1 * (consciousnessLevel / 100)})`;
        ctx.fill();
      }
    }

    // Mouse interaction
    const mouse = { x: canvas.width / 2, y: canvas.height / 2, down: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Increase consciousness on mouse movement
      setConsciousnessLevel((prev) => Math.min(100, prev + 0.5));
    };

    const handleMouseDown = () => {
      mouse.down = true;
      // Quantum burst on click
      for (let i = 0; i < 20; i++) {
        particles.push(new QuantumParticle());
      }
    };

    const handleMouseUp = () => {
      mouse.down = false;
    };

    // Initialize particles
    for (let i = 0; i < 150; i++) {
      particles.push(new QuantumParticle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw consciousness grid
      if (consciousnessLevel > 30) {
        drawConsciousnessGrid();
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(mouse);
        particle.draw();
      });

      // Gradually reduce consciousness
      setConsciousnessLevel((prev) => Math.max(0, prev - 0.1));

      animationId = requestAnimationFrame(animate);
    };

    // Consciousness grid
    const drawConsciousnessGrid = () => {
      const gridSize = 50;
      const opacity = consciousnessLevel / 200;

      ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`;
      ctx.lineWidth = 0.5;

      // Vertical lines with wave distortion
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 5) {
          const wave = Math.sin(x * 0.01 + y * 0.02 + Date.now() * 0.001) * 10;
          ctx.lineTo(x + wave, y);
        }
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 5) {
          const wave = Math.cos(x * 0.015 + y * 0.01 + Date.now() * 0.001) * 10;
          ctx.lineTo(x, y + wave);
        }
        ctx.stroke();
      }
    };

    // Event listeners
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationId);
    };
  }, [consciousnessLevel]);

  // Meta-morphic navigation animation
  useEffect(() => {
    const morphNav = () => {
      const navItems = document.querySelectorAll(".meta-nav-item");

      navItems.forEach((item, index) => {
        // GSAP timeline for each item
        const tl = gsap.timeline({
          repeat: -1,
          yoyo: true,
          repeatDelay: Math.random() * 2 + 1,
          defaults: { duration: 2, ease: "sine.inOut" },
        });

        tl.to(item, {
          scale: 1.1,
          rotation: Math.random() > 0.5 ? 5 : -5,
          x: Math.random() * 20 - 10,
          y: Math.random() * 20 - 10,
        }).to(item, {
          scale: 1,
          rotation: 0,
          x: 0,
          y: 0,
        });

        // GSAP for the inner glow (replacing Anime.js)
        gsap.to(item, {
          boxShadow: "0 0 20px rgba(100, 220, 255, 0.8)",
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: "sine.inOut",
        });
      });
    };

    morphNav();
  }, []);

  // Chrono-spatial scrolling
  useEffect(() => {
    const sections = document.querySelectorAll(".chrono-section");

    sections.forEach((section, i) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          scale: 0.8,
          rotationY: i % 2 === 0 ? -30 : 30,
          x: i % 2 === 0 ? -100 : 100,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          x: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            markers: false,
          },
        },
      );
    });
  }, []);

  // Dimension shift
  const shiftDimension = (dimension) => {
    setActiveDimension(dimension);

    const container = containerRef.current;
    if (!container) return;

    // GSAP dimension shift
    gsap.to(container, {
      duration: 2,
      filter: `hue-rotate(${dimension * 120}deg) blur(${dimension * 2}px)`,
      scale: 1 - dimension * 0.05,
      ease: "power3.inOut",
    });

    // GSAP particle explosion
    gsap.to(".quantum-particle", {
      x: () => gsap.utils.random(-300, 300),
      y: () => gsap.utils.random(-300, 300),
      scale: () => gsap.utils.random(0.5, 2),
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      onComplete: () => {
        gsap.to(".quantum-particle", {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        });
      },
    });
  };

  return (
    <div className="metatrybe-container" ref={containerRef}>
      {/* Quantum Canvas */}
      <canvas
        ref={canvasRef}
        className="quantum-canvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

      {/* Consciousness Indicator */}
      <div className="consciousness-indicator">
        <div
          className="consciousness-bar"
          style={{ width: `${consciousnessLevel}%` }}
        ></div>
        <span className="consciousness-text">
          Consciousness: {Math.round(consciousnessLevel)}%
        </span>
      </div>

      {/* Meta-Morphic Navigation */}
      <nav className="meta-nav">
        <div className="meta-nav-item" onClick={() => shiftDimension(0)}>
          <span className="nav-text">Reality</span>
          <div className="nav-orb"></div>
        </div>
        <div className="meta-nav-item" onClick={() => shiftDimension(1)}>
          <span className="nav-text">Quantum</span>
          <div className="nav-orb"></div>
        </div>
        <div className="meta-nav-item" onClick={() => shiftDimension(2)}>
          <span className="nav-text">Beyond</span>
          <div className="nav-orb"></div>
        </div>
        <div className="meta-logo">METATRYBE</div>
      </nav>

      {/* Main Content with Chrono-Spatial Sections */}
      <main className="chrono-main">
        <section className="chrono-section hero">
          <h1 className="meta-title">
            <span className="title-part">BEYOND</span>
            <span className="title-part">ANIMATION</span>
            <span className="title-part">METATRYBE</span>
          </h1>
          <p className="meta-subtitle">
            Where digital experiences transcend reality
          </p>
          <div
            className="quantum-particle"
            style={{ top: "50%", left: "30%" }}
          ></div>
          <div
            className="quantum-particle"
            style={{ top: "60%", left: "70%" }}
          ></div>
        </section>

        <section className="chrono-section services">
          <h2>Dimensional Services</h2>
          <div className="service-grid">
            <div className="service-card">
              <div className="service-icon">🌀</div>
              <h3>Quantum UI</h3>
              <p>Interfaces that exist in multiple states simultaneously</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🌌</div>
              <h3>Chrono-Scroll</h3>
              <p>Time-manipulated scrolling experiences</p>
            </div>
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Conscious Loading</h3>
              <p>Animations that adapt to user consciousness patterns</p>
            </div>
          </div>
        </section>

        <section className="chrono-section demo">
          <h2>Activate Metamorphosis</h2>
          <button
            className="meta-button"
            onClick={() => {
              // Combined GSAP + Anime.js explosion
              gsap.to(".meta-button", {
                scale: 1.5,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
              });

              gsap.to(".demo h2", {
                y: -30,
                duration: 0.5,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
              });
            }}
          >
            TRIGGER METAMORPHOSIS
          </button>
        </section>
      </main>

      {/* Dimension Indicator */}
      <div className="dimension-indicator">
        <div className="dimension-dots">
          {[0, 1, 2].map((dim) => (
            <div
              key={dim}
              className={`dimension-dot ${activeDimension === dim ? "active" : ""}`}
              onClick={() => shiftDimension(dim)}
            ></div>
          ))}
        </div>
        <div className="dimension-label">DIMENSION {activeDimension + 1}</div>
      </div>
    </div>
  );
};

export default MetatrybeAnimationSystem;

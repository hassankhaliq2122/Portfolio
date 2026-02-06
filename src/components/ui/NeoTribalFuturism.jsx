import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import "./NeoTribalSystem.css";
import drumSound from "../../assets/drums.mp3";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Sacred glyphs system
const TRIBAL_GLYPHS = {
  connection: "ᚠᚢᚦᚬᚱᚴ",
  wisdom: "ᛏᛒᛖᛗᛚᛜ",
  creation: "ᚹᚻᚾᛁᛃᛇ",
  future: "ᛈᛉᛋᛏᛒᛖ",
};

const NEUTRAL_COLORS = {
  primary: "#2563eb", // Electric blue
  secondary: "#1e40af", // Deep blue
  accent: "#3b82f6", // Bright blue
  light: "#f8fafc", // Snow white
  dark: "#0f172a", // Navy blue
  gray: "#64748b", // Stone gray
  highlight: "#60a5fa", // Sky blue
};

const NeoTribalFuturism = () => {
  const containerRef = useRef(null);
  const ritualRef = useRef(null);
  const heartbeatRef = useRef(null);
  const [rhythmActive, setRhythmActive] = useState(false);
  const [activeTribe, setActiveTribe] = useState("connection");
  const [scrollPulse, setScrollPulse] = useState(0);

  // Tribal Rhythm Engine - Heartbeat of the interface
  useEffect(() => {
    const heartbeat = heartbeatRef.current;
    if (!heartbeat) return;

    // Create pulsing rhythm
    const rhythmTimeline = gsap.timeline({ repeat: -1 });

    rhythmTimeline
      .to(heartbeat, {
        scale: 1.1,
        backgroundColor: NEUTRAL_COLORS.accent,
        duration: 0.5,
        ease: "power2.inOut",
        onStart: () => setRhythmActive(true),
      })
      .to(heartbeat, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => setRhythmActive(false),
      });

    // Glyph animation cycle
    const glyphElements = document.querySelectorAll(".tribal-glyph");
    glyphElements.forEach((glyph, i) => {
      gsap.to(glyph, {
        y: -10,
        rotation: 5,
        color: NEUTRAL_COLORS.accent,
        duration: 2 + i * 0.5,
        delay: i * 0.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });

    return () => rhythmTimeline.kill();
  }, []);

  // Ritual Scroll Animation - Vertical storytelling as ceremony
  useEffect(() => {
    const sections = gsap.utils.toArray(".ritual-section");

    sections.forEach((section, index) => {
      // Create a timeline for each ritual section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onEnter: () => {
            setScrollPulse(index + 1);
            activateRitual(index);
          },
          onEnterBack: () => {
            setScrollPulse(index + 1);
            activateRitual(index);
          },
        },
      });

      // Glyph reveal animation
      const glyphs = section.querySelectorAll(".ritual-glyph");
      tl.fromTo(
        glyphs,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, stagger: 0.2, duration: 1 },
      );

      // Text carving animation
      const texts = section.querySelectorAll(".carved-text");
      tl.fromTo(
        texts,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 2, ease: "power4.out" },
        "-=0.5",
      );
    });

    // Drum scroll indicator
    gsap.to(".drum-indicator", {
      rotate: 360,
      scrollTrigger: {
        trigger: ".ritual-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  // Tribal Fire Animation - Dynamic background ritual
  useEffect(() => {
    const ritual = ritualRef.current;
    if (!ritual) return;

    const ctx = ritual.getContext("2d");
    let flames = [];
    let animationId;

    const resize = () => {
      ritual.width = ritual.parentElement.clientWidth;
      ritual.height = ritual.parentElement.clientHeight * 0.5;
    };

    resize();
    window.addEventListener("resize", resize);

    class TribalFlame {
      constructor() {
        this.x = Math.random() * ritual.width;
        this.y = ritual.height + 50;
        this.size = Math.random() * 15 + 5;
        this.speed = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.hue = 200 + Math.random() * 40; // Blue range (200-240)
        this.glyph = TRIBAL_GLYPHS[activeTribe][Math.floor(Math.random() * 6)];
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y * 0.02) * 2;
        this.size *= 0.98;
        this.opacity *= 0.98;

        if (this.y < -50 || this.size < 0.5) {
          this.reset();
        }
      }

      reset() {
        this.x = Math.random() * ritual.width;
        this.y = ritual.height + 50;
        this.size = Math.random() * 15 + 5;
        this.speed = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.hue = 200 + Math.random() * 40; // Blue range
        this.glyph = TRIBAL_GLYPHS[activeTribe][Math.floor(Math.random() * 6)];
      }

      draw() {
        ctx.font = `${this.size * 2}px 'TribalGlyphs'`;
        ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.glyph, this.x, this.y);
      }
    }

    // Initialize flames
    for (let i = 0; i < 30; i++) {
      flames.push(new TribalFlame());
    }

    const animate = () => {
      ctx.clearRect(0, 0, ritual.width, ritual.height);

      // Draw ritual ground
      // Draw ritual ground
      ctx.fillStyle = "#f8fafc"; // Light ground
      ctx.fillRect(0, ritual.height - 10, ritual.width, 10);

      // Update and draw flames
      flames.forEach((flame) => {
        flame.update();
        flame.draw();
      });

      // Draw rhythm pulses
      if (rhythmActive) {
        ctx.beginPath();
        ctx.arc(ritual.width / 2, ritual.height, 20, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, 0.3)`; // Blue pulse
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [activeTribe, rhythmActive]);

  const activateRitual = (index) => {
    const rituals = ["connection", "wisdom", "creation", "future"];
    setActiveTribe(rituals[index] || rituals[0]);

    // Ritual activation animation
    gsap.to(".ritual-section.active", {
      opacity: 0.5,
      duration: 0.3,
      onComplete: () => {
        document
          .querySelectorAll(".ritual-section")
          .forEach((s) => s.classList.remove("active"));
        document
          .querySelectorAll(".ritual-section")
          [index]?.classList.add("active");
        gsap.to(".ritual-section.active", { opacity: 1, duration: 0.5 });
      },
    });

    // Drum beat on ritual change
    gsap.to(".drum-indicator", {
      scale: 1.3,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "back.out(1.7)",
    });
  };

  const triggerDrum = () => {
    // Realistic Drum Sound Logic
    const audio = new Audio(drumSound);
    audio.volume = 1.0;

    // Add slight random pitch/playback rate variation for realism
    audio.playbackRate = 0.9 + Math.random() * 0.2;

    // Play immediately (cloning ensures overlapping sounds)
    audio.play().catch((e) => console.error("Audio play failed:", e));

    // Multi-layered drum animation
    gsap.to(".drum-beat", {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "back.out(1.7)",
    });

    // Ripple effect
    const ripple = document.createElement("div");
    ripple.className = "drum-ripple";
    document.querySelector(".drum-circle").appendChild(ripple);

    gsap.fromTo(
      ripple,
      { scale: 0, opacity: 0.7 },
      {
        scale: 3,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      },
    );

    // Sound simulation (visual feedback only)
    const glyphs = document.querySelectorAll(".drum-glyph");
    gsap.to(glyphs, {
      y: -10,
      rotation: () => Math.random() * 20 - 10,
      duration: 0.6,
      stagger: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "back.out(1.7)",
    });
  };

  return (
    <div className="neo-tribal-system" ref={containerRef}>
      {/* Sacred Canvas - Animated Ritual Background */}
      <canvas ref={ritualRef} className="ritual-canvas" />

      {/* Heartbeat Rhythm Indicator */}
      <div className="heartbeat-container">
        <div className="heartbeat-circle" ref={heartbeatRef}>
          <div className="heartbeat-core"></div>
          <div className="tribal-glyph">ᚠ</div>
        </div>
        <div className="rhythm-status">
          RITUAL {rhythmActive ? "ACTIVE" : "STANDBY"}
        </div>
      </div>

      {/* Primary Navigation - Totem Interface */}
      <nav className="totem-nav">
        <div className="totem-column">
          <div className="totem-glyph active">ᚠ</div>
          <div className="totem-label">CONNECTION</div>
        </div>
        <div className="totem-column">
          <div className="totem-glyph">ᚹ</div>
          <div className="totem-label">WISDOM</div>
        </div>
        <div className="totem-column">
          <div className="totem-glyph">ᛈ</div>
          <div className="totem-label">CREATION</div>
        </div>
        <div className="totem-column">
          <div className="totem-glyph">ᛏ</div>
          <div className="totem-label">FUTURE</div>
        </div>

        {/* Tribal Mark - Logo */}
        <div className="tribal-mark">
          <div className="mark-glyph">META</div>
          <div className="mark-glyph">TRYBE</div>
          <div className="mark-line"></div>
        </div>
      </nav>

      {/* Ritual Container - Vertical Storytelling */}
      <main className="ritual-container">
        {/* Section 1: Connection Ritual */}
        <section className="ritual-section connection active">
          <div className="ritual-glyph large">ᚠ</div>
          <h1 className="carved-text mega-text">
            WE ARE
            <br />
            CONNECTED
            <br />
            THROUGH
            <br />
            <span className="glyph-highlight">CODE</span>
          </h1>
          <div className="ritual-description">
            <p>Digital bonds stronger than blood. Interface as ceremony.</p>
          </div>
          <div className="glyph-grid">
            {Array.from(TRIBAL_GLYPHS.connection).map((glyph, i) => (
              <div key={i} className="grid-glyph">
                {glyph}
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Wisdom Ritual */}
        <section className="ritual-section wisdom">
          <div className="ritual-glyph large">ᚹ</div>
          <h1 className="carved-text mega-text">
            ANCIENT
            <br />
            <span className="glyph-highlight">WISDOM</span>
            <br />
            FUTURE
            <br />
            KNOWLEDGE
          </h1>
          <div className="pattern-wall">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="pattern-unit"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {TRIBAL_GLYPHS.wisdom[i % 6]}
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Creation Ritual */}
        <section className="ritual-section creation">
          <div className="ritual-glyph large">ᛈ</div>
          <h1 className="carved-text mega-text">
            BUILDING
            <br />
            TOMORROW'S
            <br />
            <span className="glyph-highlight">TOTEMS</span>
            <br />
            TODAY
          </h1>
          <div className="creation-grid">
            <div className="creation-cell">
              <div className="cell-glyph">UI</div>
              <div className="cell-label">INTERFACE RITUALS</div>
            </div>
            <div className="creation-cell">
              <div className="cell-glyph">UX</div>
              <div className="cell-label">USER JOURNEYS</div>
            </div>
            <div className="creation-cell">
              <div className="cell-glyph">DX</div>
              <div className="cell-label">DIGITAL EXPERIENCES</div>
            </div>
          </div>
        </section>

        {/* Section 4: Future Ritual */}
        <section className="ritual-section future">
          <div className="ritual-glyph large">ᛏ</div>
          <h1 className="carved-text mega-text">
            THE NEXT
            <br />
            <span className="glyph-highlight">TRYBE</span>
            <br />
            IS DIGITAL
            <br />
            IS NOW
          </h1>
          <div className="future-manifesto">
            <p className="manifesto-line">WE CODE IN RHYTHM</p>
            <p className="manifesto-line">WE DESIGN IN CEREMONY</p>
            <p className="manifesto-line">WE BUILD TOTEMS FOR TOMORROW</p>
          </div>
        </section>
      </main>

      {/* Interactive Drum Circle */}
      <div className="drum-circle">
        <div className="drum-indicator" onClick={triggerDrum}>
          <div className="drum-beat">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="drum-glyph">
                {TRIBAL_GLYPHS[activeTribe][i % 6]}
              </div>
            ))}
          </div>
          <div className="drum-center">
            <div className="drum-text">BEAT</div>
            <div className="drum-text">DRUM</div>
          </div>
        </div>
        <div className="drum-instruction">
          TAP THE DRUM • FEEL THE RHYTHM • JOIN THE TRIBE
        </div>
      </div>

      {/* Scroll Progress - Ritual Meter */}
      <div className="ritual-meter">
        <div
          className="meter-bar"
          style={{ height: `${(scrollPulse / 4) * 100}%` }}
        ></div>
        <div className="meter-labels">
          <div className={`meter-label ${scrollPulse >= 1 ? "active" : ""}`}>
            CONNECT
          </div>
          <div className={`meter-label ${scrollPulse >= 2 ? "active" : ""}`}>
            LEARN
          </div>
          <div className={`meter-label ${scrollPulse >= 3 ? "active" : ""}`}>
            CREATE
          </div>
          <div className={`meter-label ${scrollPulse >= 4 ? "active" : ""}`}>
            EVOLVE
          </div>
        </div>
      </div>

      {/* Pulse Counter */}
      <div className="pulse-counter">
        <div className="counter-value">{scrollPulse}</div>
        <div className="counter-label">RITUAL PULSE</div>
      </div>
    </div>
  );
};

export default NeoTribalFuturism;

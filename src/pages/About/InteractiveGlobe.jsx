import React, { useRef, useEffect } from "react";

// Simplified continent regions [latMin, latMax, lngMin, lngMax]
const LAND = [
  [48, 85, -170, -55],
  [25, 48, -130, -65],
  [30, 50, -65, -52],
  [55, 72, -170, -130],
  [15, 30, -118, -85],
  [7, 18, -92, -77],
  [-5, 12, -82, -60],
  [-24, -5, -78, -35],
  [-40, -24, -72, -48],
  [-55, -40, -75, -62],
  [36, 62, -10, 30],
  [55, 72, 5, 40],
  [36, 44, -10, 3],
  [38, 46, 12, 22],
  [34, 42, 22, 30],
  [50, 73, 30, 180],
  [40, 55, 50, 90],
  [12, 38, 32, 60],
  [20, 37, -18, 40],
  [-5, 20, -18, 50],
  [-35, -5, 10, 42],
  [-20, -12, 43, 50],
  [20, 45, 73, 135],
  [8, 28, 68, 92],
  [10, 22, 93, 110],
  [30, 46, 128, 146],
  [22, 42, 100, 125],
  [-8, 6, 95, 140],
  [-40, -12, 113, 155],
  [-47, -34, 166, 178],
  [60, 84, -73, -12],
  [63, 67, -25, -14],
];

const onLand = (lat, lng) => {
  for (const r of LAND) {
    if (lat >= r[0] && lat <= r[1] && lng >= r[2] && lng <= r[3]) return true;
  }
  return false;
};

const toXYZ = (lat, lng) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  ];
};

const CLIENTS = [
  { lat: 40.7, lng: -74 },
  { lat: 51.5, lng: -0.1 },
  { lat: 25.2, lng: 55.3 },
  { lat: 35.7, lng: 139.7 },
  { lat: -33.9, lng: 151.2 },
  { lat: 1.3, lng: 103.8 },
  { lat: 19.1, lng: 72.9 },
  { lat: 49.2, lng: 2.3 },
];

const ARCS = [
  [0, 1],
  [1, 7],
  [1, 2],
  [2, 6],
  [6, 5],
  [5, 3],
  [3, 4],
];

const InteractiveGlobe = () => {
  const canvasRef = useRef(null);
  const state = useRef({
    rx: 0.3,
    ry: -0.5,
    vx: 0,
    vy: 0,
    drag: false,
    mx: 0,
    my: 0,
    t: 0,
    dots: null,
    cd: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = state.current;
    let raf;

    const resize = () => {
      const p = canvas.parentElement;
      const sz = Math.min(p.clientWidth, p.clientHeight, 520);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = sz * dpr;
      canvas.height = sz * dpr;
      canvas.style.width = sz + "px";
      canvas.style.height = sz + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate dots once
    if (!s.dots) {
      const d = [];
      for (let lat = -85; lat <= 85; lat += 3) {
        const c = Math.cos((lat * Math.PI) / 180);
        const ls = Math.max(3, 3 / Math.max(c, 0.1));
        for (let lng = -180; lng < 180; lng += ls) {
          if (onLand(lat, lng)) {
            const [x, y, z] = toXYZ(lat, lng);
            d.push({ x, y, z, l: 1 });
          }
        }
      }
      for (let lat = -85; lat <= 85; lat += 12) {
        const c = Math.cos((lat * Math.PI) / 180);
        const ls = Math.max(12, 12 / Math.max(c, 0.1));
        for (let lng = -180; lng < 180; lng += ls) {
          if (!onLand(lat, lng)) {
            const [x, y, z] = toXYZ(lat, lng);
            d.push({ x, y, z, l: 0 });
          }
        }
      }
      s.dots = d;
    }

    if (!s.cd) {
      s.cd = CLIENTS.map((c) => {
        const [x, y, z] = toXYZ(c.lat, c.lng);
        return { x, y, z };
      });
    }

    const proj = (x, y, z) => {
      const x1 = x * Math.cos(s.ry) - z * Math.sin(s.ry);
      const z1 = x * Math.sin(s.ry) + z * Math.cos(s.ry);
      const y1 = y * Math.cos(s.rx) - z1 * Math.sin(s.rx);
      const z2 = y * Math.sin(s.rx) + z1 * Math.cos(s.rx);
      const sz = parseInt(canvas.style.width);
      const r = sz * 0.42;
      return { x: sz / 2 + x1 * r, y: sz / 2 - y1 * r, z: z2 };
    };

    const slerp = (a, b, t) => {
      const dot = a.x * b.x + a.y * b.y + a.z * b.z;
      const om = Math.acos(Math.max(-1, Math.min(1, dot)));
      const so = Math.sin(om);
      if (so < 0.001) return a;
      const fa = Math.sin((1 - t) * om) / so;
      const fb = Math.sin(t * om) / so;
      const lift = 1 + 0.12 * Math.sin(t * Math.PI);
      return {
        x: (fa * a.x + fb * b.x) * lift,
        y: (fa * a.y + fb * b.y) * lift,
        z: (fa * a.z + fb * b.z) * lift,
      };
    };

    const render = () => {
      const sz = parseInt(canvas.style.width);
      ctx.clearRect(0, 0, sz, sz);
      s.t += 0.008;

      if (!s.drag) {
        s.ry += 0.002;
        s.rx += s.vx;
        s.ry += s.vy;
        s.vx *= 0.96;
        s.vy *= 0.96;
      }

      const r = sz * 0.42,
        cx = sz / 2,
        cy = sz / 2;

      // Atmosphere
      const ag = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * 1.2);
      ag.addColorStop(0, "rgba(37,99,235,0)");
      ag.addColorStop(0.6, "rgba(37,99,235,0.04)");
      ag.addColorStop(1, "rgba(37,99,235,0)");
      ctx.fillStyle = ag;
      ctx.fillRect(0, 0, sz, sz);

      // Globe fill
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      const sg = ctx.createRadialGradient(cx * 0.82, cy * 0.78, 0, cx, cy, r);
      sg.addColorStop(0, "rgba(37,99,235,0.015)");
      sg.addColorStop(1, "rgba(37,99,235,0.04)");
      ctx.fillStyle = sg;
      ctx.fill();
      ctx.strokeStyle = "rgba(37,99,235,0.1)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Dots
      for (const d of s.dots) {
        const p = proj(d.x, d.y, d.z);
        if (p.z < 0) continue;
        const df = 0.3 + p.z * 0.7;
        if (d.l) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.5, 1.4 * df), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37,99,235,${0.2 + 0.6 * df})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.3, 0.5 * df), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37,99,235,${0.04 + 0.06 * df})`;
          ctx.fill();
        }
      }

      // Arc connections
      for (const [i, j] of ARCS) {
        const pts = [];
        for (let k = 0; k <= 30; k++)
          pts.push(proj(...Object.values(slerp(s.cd[i], s.cd[j], k / 30))));
        ctx.beginPath();
        let on = false;
        for (const p of pts) {
          if (p.z > -0.05) {
            if (!on) {
              ctx.moveTo(p.x, p.y);
              on = true;
            } else ctx.lineTo(p.x, p.y);
          } else on = false;
        }
        ctx.strokeStyle = "rgba(37,99,235,0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Traveling dot
        const tt = (s.t * 0.5 + i * 0.3) % 1;
        const tp = proj(...Object.values(slerp(s.cd[i], s.cd[j], tt)));
        if (tp.z > -0.05) {
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(37,99,235,0.7)";
          ctx.fill();
        }
      }

      // Client markers
      for (let i = 0; i < s.cd.length; i++) {
        const p = proj(s.cd[i].x, s.cd[i].y, s.cd[i].z);
        if (p.z < 0) continue;
        const a = 0.5 + p.z * 0.5;
        const pulse = 1 + Math.sin(s.t * 3 + i) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37,99,235,${a * 0.12})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37,99,235,${a})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a * 0.9})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };
    render();

    // Mouse drag
    const onDown = (e) => {
      s.drag = true;
      s.vx = 0;
      s.vy = 0;
      s.mx = e.clientX;
      s.my = e.clientY;
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e) => {
      if (!s.drag) return;
      const dx = e.clientX - s.mx,
        dy = e.clientY - s.my;
      s.ry += dx * 0.005;
      s.rx += dy * 0.005;
      s.rx = Math.max(-1.2, Math.min(1.2, s.rx));
      s.vy = dx * 0.002;
      s.vx = dy * 0.002;
      s.mx = e.clientX;
      s.my = e.clientY;
    };
    const onUp = () => {
      s.drag = false;
      canvas.style.cursor = "grab";
    };

    // Touch
    const onTouchStart = (e) => {
      s.drag = true;
      s.vx = 0;
      s.vy = 0;
      s.mx = e.touches[0].clientX;
      s.my = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (!s.drag) return;
      e.preventDefault();
      const dx = e.touches[0].clientX - s.mx,
        dy = e.touches[0].clientY - s.my;
      s.ry += dx * 0.005;
      s.rx += dy * 0.005;
      s.rx = Math.max(-1.2, Math.min(1.2, s.rx));
      s.vy = dx * 0.002;
      s.vx = dy * 0.002;
      s.mx = e.touches[0].clientX;
      s.my = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      s.drag = false;
    };

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="about-hero__globe-canvas"
      style={{ cursor: "grab" }}
    />
  );
};

export default InteractiveGlobe;

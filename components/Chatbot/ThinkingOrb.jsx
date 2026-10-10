"use client";

import React, { useEffect, useRef } from "react";

/* Dotted-sphere "thinking" orb, adapted from the MorphOrb reference component.
   Draws a rotating ring-sampled sphere on a canvas with travelling light programs.
   `done` triggers the resolve sweep (dots turn green) before the answer appears. */

const TAU = Math.PI * 2;
const BASE = 220; // internal design space of the reference orb
const ORB_R = 66;
const RINGS = 16;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * t;

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cubicBezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t) => ((ax * t + bx) * t + cx) * t;
  const sy = (t) => ((ay * t + by) * t + cy) * t;
  const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
  const solve = (x) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = sx(t) - x;
      if (Math.abs(e) < 1e-6) return t;
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    let lo = 0, hi = 1;
    t = x;
    for (let i = 0; i < 40; i++) {
      const e = sx(t);
      if (Math.abs(e - x) < 1e-6) break;
      if (x > e) lo = t; else hi = t;
      t = (hi - lo) / 2 + lo;
    }
    return t;
  };
  return (x) => (x <= 0 ? 0 : x >= 1 ? 1 : sy(solve(x)));
}

const easeOut = cubicBezier(0.22, 1, 0.36, 1);
const easeIO = cubicBezier(0.65, 0, 0.35, 1);

const DOT_LIST = (() => {
  const rand = mulberry32(7);
  const out = [];
  for (let k = 0; k < RINGS; k++) {
    const y = 1 - ((k + 0.5) / RINGS) * 2;
    const r = Math.sqrt(1 - y * y);
    const m = Math.max(4, Math.round(30 * r));
    for (let j = 0; j < m; j++) {
      const a = (j / m) * TAU + k * 0.35;
      out.push({ x: Math.cos(a) * r, y, z: Math.sin(a) * r, u: (1 - y) / 2, seed: rand() * 6.283 });
    }
  }
  return out;
})();
const N = DOT_LIST.length;
const DX = Float32Array.from(DOT_LIST, (d) => d.x);
const DY = Float32Array.from(DOT_LIST, (d) => d.y);
const DZ = Float32Array.from(DOT_LIST, (d) => d.z);
const DU = Float32Array.from(DOT_LIST, (d) => d.u);
const DS = Float32Array.from(DOT_LIST, (d) => d.seed);

// Pre-built colour ramp: neutral white -> Ideate X green, 49 alpha steps
const G_STEPS = 24, A_STEPS = 48;
const COLORS = (() => {
  const out = [];
  for (let gi = 0; gi <= G_STEPS; gi++) {
    const g = gi / G_STEPS;
    const r = Math.round(lerp(235, 0, g)), gg = Math.round(lerp(235, 184, g)), b = Math.round(lerp(235, 98, g));
    for (let ai = 0; ai <= A_STEPS; ai++) out.push(`rgba(${r},${gg},${b},${(ai / A_STEPS).toFixed(3)})`);
  }
  return out;
})();

function createOrb(canvas, size, getProg, isReduced) {
  const ctx = canvas.getContext("2d");
  const P = { k: 0, alpha: 0, spin: 0, rot: 0, sweep: 0, pop: 1, gain: 1, floor: 0, rad: 0 };
  if (!ctx) return { P, ensure() {}, destroy() {} };

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const sc = size / BASE;
  const R = ORB_R * sc;
  const C0 = size / 2;
  const dotBoost = 1.7; // keep dots readable at small sizes
  const S = 0.6, CP = Math.cos(0.35), SP = Math.sin(0.35);

  const lit = new Float32Array(N);
  const SX = new Float32Array(N), SY = new Float32Array(N), SR = new Float32Array(N), SD = new Float32Array(N);
  const SC = new Int16Array(N);
  const pw = [1, 0, 0, 0];
  let time = isReduced() ? 1.2 : 0, raf = 0, last = 0, dead = false;

  const draw = (dt) => {
    ctx.clearRect(0, 0, size, size);
    time += dt;
    P.rot += P.spin * dt;
    const cyw = Math.cos(P.rot), syw = Math.sin(P.rot);
    const prog = getProg();
    const stepW = dt / 0.35;
    for (let q = 0; q < 4; q++) {
      const d = (q === prog ? 1 : 0) - pw[q];
      pw[q] += Math.abs(d) <= stepW ? d : d > 0 ? stepW : -stepW;
    }
    const decay = Math.exp(-dt / 0.5);
    const h0 = (time * 300) % N, h3 = (time * 480) % N;
    const a1 = time * 0.8, b1 = Math.sin(time * 0.5) * 0.9;
    const f1x = Math.cos(b1) * Math.cos(a1), f1y = Math.sin(b1), f1z = Math.cos(b1) * Math.sin(a1);
    const a2 = time * 0.55 + 2.1, b2 = Math.cos(time * 0.42) * 0.9;
    const f2x = Math.cos(b2) * Math.cos(a2), f2y = Math.sin(b2), f2z = Math.cos(b2) * Math.sin(a2);
    const lat = Math.sin(time * 2.2);

    for (let n = 0; n < N; n++) {
      const dx = DX[n], dy = DY[n], dz = DZ[n], u = DU[n];

      let pulse = 0;
      if (pw[0] > 0.001) {
        let dd = Math.abs(n - h0); if (dd > N - dd) dd = N - dd;
        const v = Math.max(0, 1 - dd / 16);
        pulse = Math.max(pulse, v * v * pw[0]);
      }
      if (pw[1] > 0.001) {
        const v1 = Math.max(0, (dx * f1x + dy * f1y + dz * f1z - 0.72) / 0.28);
        const v2 = Math.max(0, (dx * f2x + dy * f2y + dz * f2z - 0.72) / 0.28);
        const v = Math.max(v1, v2);
        pulse = Math.max(pulse, v * v * pw[1]);
      }
      if (pw[2] > 0.001) {
        const e = dy - lat;
        const v = Math.max(0, 1 - (e * e) / 0.02);
        pulse = Math.max(pulse, v * v * pw[2]);
      }
      if (pw[3] > 0.001) {
        let dd = Math.abs(n - h3); if (dd > N - dd) dd = N - dd;
        const v = Math.max(0, 1 - dd / 22);
        pulse = Math.max(pulse, v * v * pw[3]);
      }
      const l = Math.max(lit[n] * decay, pulse * P.gain);
      lit[n] = l;

      // top dots appear first
      const ki = clamp01(P.k * (1 + S) - S * u);
      if (ki <= 0.001) { SC[n] = -1; continue; }
      const eo = easeOut(ki), kk = eo * P.pop;

      const x1 = dx * cyw + dz * syw, z1 = -dx * syw + dz * cyw;
      const y2 = dy * CP - z1 * SP, z2 = dy * SP + z1 * CP;
      const f = 2.8 / (2.8 - z2), depth = (z2 + 1) / 2;
      const ox = x1 * R * kk * f, oy = -y2 * R * kk * f;

      const g = clamp01((P.sweep * 1.4 - u) / 0.4);
      let a = 0.1 + 0.035 * Math.sin(DS[n] + time * 1.6) * (1 - g) + 0.32 * depth * depth + 0.75 * l * (1 - g) + g * (0.55 + 0.4 * depth) + 2 * g * (1 - g);
      a = Math.max(a, P.floor * (0.7 + 0.3 * depth));
      if (a > 1) a = 1;
      a *= eo * P.alpha;

      SX[n] = C0 + ox;
      SY[n] = C0 + oy;
      SD[n] = depth;
      SR[n] = (1.15 * (0.45 + 0.75 * depth) * f + 0.9 * l + g * 0.25) * (1 + P.rad) * (0.4 + 0.6 * eo) * sc * dotBoost;
      const ai = Math.round(a * A_STEPS), gi = Math.round(g * G_STEPS);
      SC[n] = ai <= 0 ? -1 : gi * (A_STEPS + 1) + ai;
    }

    // back half first, then front half
    for (let pass = 0; pass < 2; pass++) {
      for (let n = 0; n < N; n++) {
        const c = SC[n];
        if (c < 0) continue;
        if ((SD[n] >= 0.5) !== (pass === 1)) continue;
        ctx.fillStyle = COLORS[c];
        ctx.beginPath();
        ctx.arc(SX[n], SY[n], SR[n], 0, TAU);
        ctx.fill();
      }
    }
  };

  const frame = (now) => {
    raf = 0;
    if (dead) return;
    const dt = isReduced() ? 0 : Math.max(0, Math.min(0.05, (now - last) / 1000));
    last = now;
    draw(dt);
    if (P.alpha > 0.002) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, size, size);
  };

  const ensure = () => {
    if (raf || dead || P.alpha <= 0.002) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };

  const destroy = () => {
    dead = true;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };

  return { P, ensure, destroy };
}

/* tiny tween helper: animates a set of P keys over a duration */
function tween(P, to, ms, ease, onFrame) {
  const from = {};
  Object.keys(to).forEach((k) => (from[k] = P[k]));
  const t0 = performance.now();
  let raf = 0, stopped = false;
  const step = (now) => {
    if (stopped) return;
    const p = clamp01((now - t0) / ms);
    const e = ease(p);
    Object.keys(to).forEach((k) => (P[k] = lerp(from[k], to[k], e)));
    onFrame?.();
    if (p < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => { stopped = true; cancelAnimationFrame(raf); };
}

export default function ThinkingOrb({ size = 76, program = 0, done = false }) {
  const canvasRef = useRef(null);
  const orbRef = useRef(null);
  const progRef = useRef(program);
  useEffect(() => {
    progRef.current = program;
  }, [program]);
  const stopRef = useRef(() => {});
  const reducedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    const onMq = (e) => { reducedRef.current = e.matches; };
    mq.addEventListener("change", onMq);

    const orb = createOrb(canvas, size, () => progRef.current, () => reducedRef.current);
    orbRef.current = orb;

    // assemble: dots draw in and the sphere starts spinning
    if (reducedRef.current) {
      Object.assign(orb.P, { k: 1, alpha: 1, spin: 0 });
      orb.ensure();
    } else {
      stopRef.current = tween(orb.P, { k: 1, alpha: 1, spin: 0.9 }, 800, easeOut, orb.ensure);
    }

    return () => {
      stopRef.current();
      orb.destroy();
      orbRef.current = null;
      mq.removeEventListener("change", onMq);
    };
  }, [size]);

  useEffect(() => {
    const orb = orbRef.current;
    if (!done || !orb) return;
    stopRef.current();
    // resolve: green sweep top to bottom, calm the spin and light programs
    const to = { sweep: 1, spin: reducedRef.current ? 0 : 0.3, gain: 0, floor: 0.95, rad: 0.15 };
    stopRef.current = reducedRef.current
      ? (Object.assign(orb.P, to), orb.ensure(), () => {})
      : tween(orb.P, to, 700, easeIO, orb.ensure);
  }, [done]);

  return <canvas ref={canvasRef} className="ix-orb-canvas" style={{ width: size, height: size }} aria-hidden="true" />;
}

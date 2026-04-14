"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants, type Easing } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";

const CALENDLY_URL = SITE_CONFIG.calendlyUrl;

// ─── Animated grid canvas background ─────────────────────────────────────────

function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const GRID_SPACING = 60;
    const DOT_COUNT = 60;

    // Floating particles
    const particles = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      opacity: 0.15 + Math.random() * 0.4,
      radius: 1 + Math.random() * 1.5,
    }));

    function resize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // ── Grid lines ──
      ctx.strokeStyle = "rgba(0, 201, 167, 0.06)";
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += GRID_SPACING) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += GRID_SPACING) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ── Particles ──
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        const px = p.x * width;
        const py = p.y * height;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 201, 167, ${p.opacity})`;
        ctx.fill();
      }

      // ── Connect nearby particles ──
      const MAX_DIST = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = (particles[i].x - particles[j].x) * width;
          const dy = (particles[i].y - particles[j].y) * height;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x * width, particles[i].y * height);
            ctx.lineTo(particles[j].x * width, particles[j].y * height);
            ctx.strokeStyle = `rgba(0, 201, 167, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

const EASE: Easing = "easeOut";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-[#0F1B2D] overflow-hidden pt-16"
    >
      {/* Animated background */}
      <AnimatedGrid />

      {/* Radial gradient overlay so text stays crisp */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,27,45,0) 0%, rgba(15,27,45,0.7) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00C9A7]/30 bg-[#00C9A7]/10 text-[#00C9A7] text-xs font-medium tracking-wide mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C9A7] animate-pulse" />
          AI & Automation Consultancy for SMBs
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAFAF8] leading-[1.1] tracking-tight mb-6"
        >
          Your business runs on repetition.{" "}
          <span className="text-[#00C9A7]">Let AI handle it.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="text-lg sm:text-xl text-[#FAFAF8]/70 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          We help small and mid-sized businesses identify, build, and run AI
          automations — fixed-price, no fluff, and we stay until it works.
        </motion.p>

        {/* CTAs — primary to Calendly, secondary to contact form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.45}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary — Calendly booking */}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3.5 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold text-base hover:bg-[#00a88c] transition-colors duration-200 shadow-lg shadow-[#00C9A7]/20"
          >
            Book a Free Discovery Call
          </a>
          {/* Secondary — free AI readiness scorecard lead magnet */}
          <a
            href="/assessment"
            className="text-[#FAFAF8]/65 font-medium text-sm hover:text-[#FAFAF8] transition-colors duration-200 underline underline-offset-4 decoration-[#FAFAF8]/30 hover:decoration-[#FAFAF8]/60"
          >
            Get Your Free AI Readiness Score →
          </a>
        </motion.div>
      </div>

      {/* Bottom fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #FAFAF8)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}

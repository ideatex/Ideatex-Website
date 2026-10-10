"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import "./KineticTeam.css";

import { useCMSData } from "../../lib/cms-client";

const DEFAULT_TEAM = [
  {
    id: "01",
    name: "Sankara",
    role: "Business Lead",
    image: "/sankara.png",
  },
  {
    id: "02",
    name: "Sudharsan",
    role: "Growth Strategist",
    image: "/sudharsan.jpg",
  },
  {
    id: "03",
    name: "Amal Alex",
    role: "Full-stack Developer",
    image: "/amal.jpg",
  },
];

export function KineticTeamHybrid() {
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const cms = useCMSData();
  const dynamicTeam = cms.team || [];
  const TEAM = dynamicTeam.length > 0 ? dynamicTeam.map((t, i) => ({
    id: t.id || `0${i + 1}`,
    name: t.name,
    role: t.designation || t.role,
    image: t.image || "/logo-ideatex.png",
  })) : DEFAULT_TEAM;

  // Mouse position resources (Global for the floating card)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics for the floating card
  const springConfig = { damping: 22, stiffness: 180, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Detect mobile for conditional rendering logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    // Offset cursor card nicely beside the cursor
    mouseX.set(e.clientX + 32);
    mouseY.set(e.clientY - 180);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="kinetic-team-root"
    >
      <div className="kinetic-team-wrapper">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="kinetic-team-header"
        >
          <div className="kinetic-team-title-wrap">
            <h2 className="kinetic-team-title">
              Creative <span className="accent-text">Talents</span>
            </h2>
          </div>
        </motion.div>

        {/* The List (3 Team Members) */}
        <div className="kinetic-team-list">
          {TEAM.map((member, index) => (
            <TeamRow
              key={member.id}
              data={member}
              index={index}
              isActive={activeId === member.id}
              setActiveId={setActiveId}
              isMobile={isMobile}
              isAnyActive={activeId !== null}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP ONLY: Floating Cursor Image */}
      {!isMobile && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="kinetic-floating-cursor-wrap"
        >
          <AnimatePresence mode="wait">
            {activeId && (
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
                className="kinetic-floating-card"
              >
                <img
                  src={TEAM.find((t) => t.id === activeId)?.image}
                  alt={TEAM.find((t) => t.id === activeId)?.name || "Team member"}
                  className="kinetic-floating-img"
                />

                {/* Overlay Metadata */}
                <div className="kinetic-floating-overlay">
                  <div className="kinetic-status-cluster">
                    <div className="kinetic-status-dot" />
                    <span className="kinetic-status-text">
                      {TEAM.find((t) => t.id === activeId)?.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function TeamRow({
  data,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
}) {
  const isDimmed = isAnyActive && !isActive;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isDimmed ? 0.3 : 1,
        y: 0,
        backgroundColor:
          isActive && isMobile ? "rgba(255, 255, 255, 0.03)" : "transparent",
      }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => !isMobile && setActiveId(data.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={() => isMobile && setActiveId(isActive ? null : data.id)}
      className={`kinetic-team-row ${isMobile ? "is-mobile" : ""} ${isActive ? "is-active" : ""}`}
    >
      <div className="kinetic-row-inner">
        {/* Name */}
        <div className="kinetic-name-cluster">
          <h3 className="kinetic-row-name">{data.name}</h3>
        </div>

        {/* Role & Icon */}
        <div className="kinetic-role-cluster">
          <span className="kinetic-row-role">{data.role}</span>

          {/* Mobile Toggle Icon */}
          <div className="kinetic-mobile-icon">
            {isActive ? (
              <Minus size={18} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Plus size={18} strokeWidth={1.75} aria-hidden="true" />
            )}
          </div>

          {/* Desktop Hover Arrow */}
          <motion.div
            animate={{ x: isActive ? 0 : -8, opacity: isActive ? 1 : 0 }}
            className="kinetic-desktop-arrow"
          >
            <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" />
          </motion.div>
        </div>
      </div>

      {/* MOBILE ONLY: Inline Accordion Image */}
      <AnimatePresence>
        {isMobile && isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="kinetic-mobile-drawer"
          >
            <div className="kinetic-mobile-img-box">
              <img
                src={data.image}
                alt={data.name}
                className="kinetic-mobile-img"
              />
              <div className="kinetic-mobile-img-overlay">
                <p className="kinetic-mobile-profile-tag">{data.role}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default KineticTeamHybrid;



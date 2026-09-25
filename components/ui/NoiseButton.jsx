"use client";

import React from "react";
import Link from "next/link";
import "./NoiseButton.css";

export function NoiseButton({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  containerClassName = "",
  disabled = false,
  style = {},
  icon = null,
  gradientColors,
  noiseOpacity,
  speed,
  noiseStrength,
  noiseColor,
  ...props
}) {
  const buttonContent = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  const combinedClasses = `studio-btn-pill ${className}`.trim();

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        onClick={onClick}
        style={style}
        {...props}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      style={style}
      {...props}
    >
      {buttonContent}
    </button>
  );
}

export default NoiseButton;

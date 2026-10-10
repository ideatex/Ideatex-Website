import React from 'react';

export function LogoMark({ size = 28, className = "", style = {} }) {
  const markHeight = typeof size === 'number' ? `${size}px` : size;
  return (
    <div
      className={`ideatex-logomark-wrap ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      <img
        src="/logo-ideatex.png"
        alt="Ideate X Logo"
        style={{
          height: markHeight,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}

export default function Logo({ size = 30, showText = true, className = "", alt = "Ideate X", style = {} }) {
  const logoHeight = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`ideatex-logo-wrap ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        verticalAlign: 'middle',
        ...style
      }}
    >
      <img
        src="/logo-ideatex.png"
        alt={alt}
        width={typeof size === 'number' ? Math.round(size * 2.5) : undefined}
        height={typeof size === 'number' ? size : undefined}
        style={{
          height: logoHeight,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}


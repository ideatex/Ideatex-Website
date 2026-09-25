import React from 'react';
import './SectionHeading.css';

export default function SectionHeading({ align = 'left', children }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'section-heading--center' : ''}`}>
      {children}
    </div>
  );
}

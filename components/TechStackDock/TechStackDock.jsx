"use client";

import React, { useState } from 'react';
import { ToolDock, ToolDockTile } from '../ui/tool-dock';
import { TechIcon, TechCategoryIcon } from '../TechIcon/TechIcon';
import './TechStackDock.css';

export default function TechStackDock({ techStack = [], title = "Technologies" }) {
  if (!techStack || techStack.length === 0) return null;

  const categories = ['All', ...techStack.map((c) => c.category)];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const activeTools = selectedCategory === 'All'
    ? Array.from(new Set(techStack.flatMap((cat) => cat.tools)))
    : (techStack.find((c) => c.category === selectedCategory)?.tools || []);

  const dockItems = activeTools.map((tool) => ({
    label: tool,
    icon: (
      <ToolDockTile>
        <TechIcon name={tool} size={28} onLight />
      </ToolDockTile>
    ),
  }));

  return (
    <div className="tech-stack-dock-section">
      {/* Category selector pills */}
      {techStack.length > 1 && (
        <div className="tech-stack-category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`tech-stack-category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat !== 'All' && (
                <TechCategoryIcon category={cat} size={14} />
              )}
              <span>{cat}</span>
              <span className="tech-stack-pill-count">
                {cat === 'All' 
                  ? Array.from(new Set(techStack.flatMap((c) => c.tools))).length
                  : (techStack.find((c) => c.category === cat)?.tools.length || 0)}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Interactive ToolDock */}
      <div className="tech-stack-dock-stage">
        <ToolDock
          key={selectedCategory}
          items={dockItems}
          size={58}
          overlap={0.12}
          magnification={0.32}
          tilt={true}
          label={`${title} - ${selectedCategory}`}
        />
      </div>

      {/* Accessible Tag List */}
      <div className="tech-stack-labels-grid">
        {activeTools.map((tool) => (
          <span key={tool} className="tech-stack-tag-item">
            <TechIcon name={tool} size={13} />
            <span>{tool}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

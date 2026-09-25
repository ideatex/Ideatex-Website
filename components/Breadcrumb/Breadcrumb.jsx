"use client";
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  if (!items || !items.length) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i} className="breadcrumb-item">
          {i < items.length - 1 ? (
            <>
              <Link href={item.path || item.href || '/'} className="breadcrumb-link">
                {item.label}
              </Link>
              <ChevronRight size={14} strokeWidth={1.75} aria-hidden="true" className="breadcrumb-sep" />
            </>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

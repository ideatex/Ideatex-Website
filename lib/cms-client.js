"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultCmsState = {
  pages: [],
  seo: {},
  services: [],
  workItems: [],
  caseStudies: [],
  insights: [],
  team: [],
  faqs: [],
  sections: [],
  navigation: null,
  settings: null,
  loading: false,
};

const CMSContext = createContext(defaultCmsState);

export function CMSProvider({ initialData, children }) {
  const [data, setData] = useState(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      return {
        ...defaultCmsState,
        ...initialData,
        loading: false,
      };
    }
    return defaultCmsState;
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setData((prev) => ({
        ...prev,
        ...initialData,
        loading: false,
      }));
    }
  }, [initialData]);

  useEffect(() => {
    let isMounted = true;
    async function loadContent() {
      try {
        const res = await fetch('/api/public/content', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isMounted) {
            setData((prev) => {
              if (JSON.stringify(prev) === JSON.stringify(json)) {
                return prev;
              }
              return {
                ...prev,
                ...json,
                loading: false,
              };
            });
          }
        }
      } catch (err) {
        // preserve existing data
      }
    }

    // If initial data had no services or was empty, fetch client-side
    if (!initialData || !initialData.services || initialData.services.length === 0) {
      loadContent();
    }

    return () => {
      isMounted = false;
    };
  }, [initialData]);

  return (
    <CMSContext.Provider value={data}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMSData() {
  const context = useContext(CMSContext);
  return context || defaultCmsState;
}


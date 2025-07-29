// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "scrollRestoration" property is "auto" by default,
    // which means the browser will restore scroll position.
    // Setting it to "manual" allows us to control it.
    // However, for typical new page loads, a simple scroll to 0,0 is sufficient.
    window.scrollTo(0, 0);
  }, [pathname]); // Re-run effect whenever the pathname changes

  return null; // This component doesn't render anything visible
}
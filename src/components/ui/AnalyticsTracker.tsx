// src/components/ui/AnalyticsTracker.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@utils/analytics'; // Adjust the path if necessary

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on initial load and on every route change
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null; // This component does not render anything
}
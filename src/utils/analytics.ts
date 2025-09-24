// src/utils/analytics.ts
import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let gaInitialized = false;

export const initGA = () => {
  // Check if the ID exists and we are in production
  if (MEASUREMENT_ID && process.env.NODE_ENV === 'production') {
    ReactGA.initialize(MEASUREMENT_ID);
    gaInitialized = true;
    console.log("GA Initialized");
  } else if (process.env.NODE_ENV === 'production') {
    // This will log an error in your browser console if the ID is missing on Netlify
    console.error("GA Measurement ID is missing. Analytics will not be initialized.");
  }
};

export const trackPageView = (path: string) => {
  // Only send pageviews if GA was successfully initialized
  if (gaInitialized) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};
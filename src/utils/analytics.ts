// src/utils/analytics.ts
import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.initialize(MEASUREMENT_ID);
  }
};

export const trackPageView = (path: string) => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};
// src/utils/analytics.ts
import ReactGA from 'react-ga4';

const MEASUREMENT_ID = "G-GQ54FPG7ZW"; // <-- Paste your Measurement ID here

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
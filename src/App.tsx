import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "./components/layout/Layout";
import HomePage from "./components/home/HomePage";
import BlogPage from "./components/blog/BlogPage";
import AboutPage from "./components/sections/about/AboutPage";
import BlogPostPage from "./components/blog/BlogPostPage";
import ScrollToTop from "./components/ui/scrollToTop";
import NotFoundPage from "./components/pages/NotFoundPage";
import NewsletterPage from "./components/pages/NewsLetterPage";
import ErrorFallback from "@components/ui/ErrorFallback";
import { useEffect, useState } from "react";

// Get the ID from Vite's env variables
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// --- NEW DEBUG LINE ---
// This will run on the live site. Let's see what these values are.
console.log(`[Analytics Debug] IsProd: ${import.meta.env.PROD}, Has ID: ${!!MEASUREMENT_ID}`);
// ----------------------


/**
 * A component to handle all analytics logic.
 * 1. It dynamically loads the gtag.js script on startup.
 * 2. It sends page_view events on every route change.
 */
function AnalyticsTracker() {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // Effect 1: Run ONCE to load the gtag.js script
  useEffect(() => {
    // *** THIS IS THE IMPORTANT CHANGE ***
    // We check import.meta.env.PROD (Vite's way)
    if (import.meta.env.PROD && MEASUREMENT_ID) {
      
      console.log("[Analytics Debug] Initializing script load..."); // New log

      if (document.querySelector(`script[src*="${MEASUREMENT_ID}"]`)) {
        setInitialized(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      script.async = true;

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(){ window.dataLayer?.push(arguments); };

      window.gtag('js', new Date());
      window.gtag('config', MEASUREMENT_ID, {
        send_page_view: false, 
      });

      script.onload = () => {
        setInitialized(true);
        console.log("gtag.js script loaded and initialized."); // Your success message
      };
      
      document.head.appendChild(script);
    }
  }, []); // Empty array means this runs only once on mount

  // Effect 2: Run on every route change (and after initialization)
  useEffect(() => {
    // *** THIS IS THE IMPORTANT CHANGE ***
    if (import.meta.env.PROD && initialized && typeof window.gtag === 'function') {
      
      window.gtag('config', MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });

      console.log("Tracked page view (gtag):", location.pathname + location.search); // Your success message
    }
  }, [location, initialized]); // Re-run when location or initialization state changes

  return null; // This component renders nothing
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnalyticsTracker /> {/* This single component now handles everything */}
      <Layout>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/ourStory" element={<AboutPage />} />
            <Route path="/NewsLetter" element={<NewsletterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  );
}
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

// Moved directly from the old analytics.ts file
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// A new component to handle all analytics logic
function AnalyticsTracker() {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // Effect 1: Run ONCE to load the gtag.js script
  useEffect(() => {
    // Only run in production and if we have a Measurement ID
    if (process.env.NODE_ENV === 'production' && MEASUREMENT_ID) {
      
      // Check if the script is already on the page
      if (document.querySelector(`script[src*="${MEASUREMENT_ID}"]`)) {
        setInitialized(true);
        return;
      }

      // Create the <script> tag
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      script.async = true;

      // Define the gtag function and dataLayer (as required by GA)
      // We must do this *before* the script loads
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(){ window.dataLayer?.push(arguments); };

      // Set the initial config
      window.gtag('js', new Date());
      window.gtag('config', MEASUREMENT_ID, {
        // We set 'send_page_view' to false here,
        // because we will send it manually in the next effect
        send_page_view: false, 
      });

      // When the script loads, mark as initialized
      script.onload = () => {
        setInitialized(true);
        console.log("gtag.js script loaded and initialized.");
      };
      
      // Add the script to the <head> of the document
      document.head.appendChild(script);
    }
  }, []); // Empty array means this runs only once on mount

  // Effect 2: Run on every route change (and after initialization)
  useEffect(() => {
    // Only track if...
    // 1. We are in production
    // 2. The script has been loaded (initialized = true)
    // 3. The gtag function exists
    if (process.env.NODE_ENV === 'production' && initialized && typeof window.gtag === 'function') {
      
      // Send the page_view event
      window.gtag('config', MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });

      console.log("Tracked page view (gtag):", location.pathname + location.search);
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
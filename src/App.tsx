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
import { useEffect } from "react";
import ReactGA from 'react-ga4';

// Moved directly from the old analytics.ts file
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// A new component to handle all analytics logic
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on first load
    if (MEASUREMENT_ID && process.env.NODE_ENV === 'production') {
      ReactGA.initialize(MEASUREMENT_ID);
      console.log("GA Initialized with ID:", MEASUREMENT_ID);
    } else if (process.env.NODE_ENV === 'production') {
      console.error("GA Measurement ID is missing. Analytics will not be initialized.");
    }
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    // Track page views on subsequent route changes
    if (MEASUREMENT_ID && process.env.NODE_ENV === 'production') {
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
      console.log("Tracked page view:", location.pathname + location.search);
    }
  }, [location]); // Track every time the location changes

  return null;
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
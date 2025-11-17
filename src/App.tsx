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

// Moved directly from the old analytics.ts file
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // This effect runs on every route change (when `location` changes)
    
    // Check if gtag is available (loaded from index.html) and we are in production
    if (typeof window.gtag === 'function' && MEASUREMENT_ID && process.env.NODE_ENV === 'production') {
      
      // Send a 'config' event, which for GA4 properties also triggers a page_view
      window.gtag('config', MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });

      console.log("Tracked page view (gtag):", location.pathname + location.search);

    } else if (process.env.NODE_ENV === 'production' && !MEASUREMENT_ID) {
      console.error("GA Measurement ID is missing. Analytics will not be tracked.");
    }

  }, [location]); // Re-run this effect every time the location changes

  // This component does not render anything
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
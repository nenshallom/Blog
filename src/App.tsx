import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./components/home/HomePage";
import BlogPage from "./components/blog/BlogPage";
import AboutPage from "./components/sections/about/AboutPage";
import BlogPostPage from "./components/blog/BlogPostPage";
import ScrollToTop from "./components/ui/scrollToTop";
import NotFoundPage from "./components/pages/NotFoundPage";
import NewsletterPage from "./components/pages/NewsLetterPage";

export default function App() {
  return (
    <BrowserRouter> 
      <ScrollToTop /> 
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/ourStory" element={<AboutPage />} />
          <Route path="/NewsLetter" element={<NewsletterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
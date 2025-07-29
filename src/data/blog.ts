// src/data/blog.ts

import type { BlogPost } from "./types";  // Corrected import path for BlogPost type

export const allPosts: BlogPost[] = [
  // --- Posts originally from src/data/data.ts (primary blog content) ---
  {
    id: 1,
    title: "My Journey into Frontend Development",
    slug: "my-journey-into-frontend-development",
    author: "Nendang",
    readTime: "3min",
    excerpt: "In this post, I share how I started learning frontend and overcame early challenges...",
    date: "July 10, 2025",
    category: "Development",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },
  {
    id: 2,
    title: "Setting Up a Clean React + Tailwind Project",
    slug: "setting-up-react-tailwind-project",
    author: "Nendang",
    readTime: "3min",
    excerpt: "Here's how to set up a React project from scratch using Tailwind and TypeScript...",
    date: "July 8, 2025",
    category: "Development",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },
  {
    id: 3,
    title: "Dark Mode in Tailwind Made Easy",
    slug: "dark-mode-in-tailwind",
    author: "Nendang",
    readTime: "3min",
    excerpt: "Learn how to implement dark mode using Tailwind’s class strategy in just a few steps...",
    date: "July 5, 2025",
    category: "UI/UX",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },
  {
    id: 4,
    title: "Optimizing React Performance with Memoization",
    slug: "react-performance-memoization",
    author: "Nendang",
    readTime: "4min",
    excerpt: "Dive deep into React.memo, useCallback, and useMemo for faster and more efficient components...",
    date: "June 28, 2025",
    category: "Development",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },
  {
    id: 5,
    title: "Understanding UI/UX Principles for Web Design",
    slug: "ui-ux-principles-web-design",
    author: "Nendang",
    readTime: "5min",
    excerpt: "A guide to the fundamental principles of user interface and user experience design...",
    date: "June 27, 2025",
    category: "UI/UX",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },
  {
    id: 6,
    title: "The Role of AI in Modern Web Development",
    slug: "ai-in-web-development",
    author: "Nendang",
    readTime: "6min",
    excerpt: "Explore how artificial intelligence is transforming web development workflows and tools...",
    date: "June 26, 2025",
    category: "AI",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },
  {
    id: 7,
    title: "Building Scalable APIs with Node.js and Express",
    slug: "scalable-apis-nodejs-express",
    author: "Nendang",
    readTime: "7min",
    excerpt: "A practical guide to designing and implementing robust, scalable APIs using Node.js...",
    date: "June 25, 2025",
    category: "Backend",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },
  {
    id: 8,
    title: "Integrating Tailwind CSS in Design Systems",
    slug: "tailwind-in-design-systems",
    author: "Nendang",
    readTime: "3min",
    excerpt: "Learn how Tailwind CSS supports scalable design systems across teams and projects...",
    date: "June 24, 2025",
    category: "Tailwind",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },
  {
    id: 9,
    title: "Startup Lessons: Failing Forward",
    slug: "startup-lessons-failing-forward",
    author: "Nendang",
    readTime: "3min",
    excerpt: "Failure is inevitable. How you respond to it shapes your long-term success...",
    date: "June 21, 2025",
    category: "Business",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },
  {
    id: 10,
    title: "Beginner’s Guide to TypeScript in React",
    slug: "typescript-in-react-guide",
    author: "Nendang",
    readTime: "3min",
    excerpt: "TypeScript helps catch bugs and improves IDE support. Here’s how to get started with it in React...",
    date: "June 18, 2025",
    category: "Frontend",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },
  {
    id: 11,
    title: "How to Choose the Right Database for Your Project",
    slug: "choose-right-database",
    author: "Nendang",
    readTime: "4min",
    excerpt: "Relational vs. NoSQL: A comparison to help you select the best database for your application...",
    date: "June 15, 2025",
    category: "Backend",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },
  {
    id: 12,
    title: "Mastering Flexbox and Grid for Responsive Layouts",
    slug: "flexbox-grid-responsive",
    author: "Nendang",
    readTime: "5min",
    excerpt: "Become proficient in modern CSS layout techniques for creating flexible and adaptive designs...",
    date: "June 12, 2025",
    category: "UI/UX",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },

  // --- Unique posts originally from src/data/blog.ts (featured/sidebar content), with re-assigned IDs ---
  {
    id: 13, // Changed from original ID 4 to avoid conflict and maintain sequence
    title: "The Impact of COVID-19 on Airport Business",
    slug: "impact-of-covid-19-on-airport-business",
    author: "Nendang",
    readTime: "5min",
    excerpt: "This post analyzes the drastic effects of the pandemic on airport operations and revenue...",
    date: "July 1, 2025",
    category: "Business",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg",
  },
  {
    id: 14, // Changed from original ID 5
    title: "Jennifer Aniston and the New Album: A Deep Dive",
    slug: "jennifer-aniston-depression-new-album",
    author: "BooliiTheme",
    readTime: "5 min read",
    excerpt: "Exploring the emotional depth and surprising themes in the new album rumored to be from Jennifer Aniston.",
    date: "October 9, 2024",
    category: "Entertainment",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg",
  },
  {
    id: 15, // Changed from original ID 6
    title: "Corsair HS80 RGB Wireless Headset Review",
    slug: "corsair-hs80-headset-review",
    author: "BooliiTheme",
    readTime: "3 min read",
    excerpt: "A comprehensive look at Corsair's latest wireless gaming headset, focusing on features, comfort, and audio quality.",
    date: "October 10, 2024",
    category: "Gaming",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg",
  },
  {
    id: 16, // Changed from original ID 7
    title: "Self-Driving Cars: Everything You Need to Know",
    slug: "self-driving-cars-everything",
    author: "BooliiTheme",
    readTime: "7 min read",
    excerpt: "From Level 0 to Level 5: A complete guide to autonomous vehicles, their technology, and their future.",
    date: "October 11, 2024",
    category: "AI",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg",
  },
  {
    id: 17, // Changed from original ID 8
    title: "Britain’s Most Unusual Homes",
    slug: "britains-most-unusual-homes",
    author: "BooliiTheme",
    readTime: "2 min read",
    excerpt: "Discover the most eccentric homes listed across the UK.",
    date: "October 12, 2024",
    category: "Architecture",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg",
  },
  {
    id: 18, // Changed from original ID 9
    title: "How My Phone’s Most Annoying Feature Saved My Day",
    slug: "phone-annoying-feature-saved-day",
    author: "BooliiTheme",
    readTime: "2 min read",
    excerpt: "A simple notification I once hated actually prevented a major disaster...",
    date: "October 13, 2024",
    category: "Tech Life",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg",
  },
  {
    id: 19, // Changed from original ID 10
    title: "The Top 20+ Best Beaches You Can’t Miss",
    slug: "best-beaches-to-visit",
    author: "BooliiTheme",
    readTime: "2 min read",
    excerpt: "Planning your next vacation? Here are the most stunning beaches around the world.",
    date: "October 14, 2024",
    category: "Travel",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg",
  },
  {
    id: 20, // Changed from original ID 11
    title: "The Power of AI in Content Creation",
    slug: "power-of-ai-in-content-creation",
    author: "Nendang",
    readTime: "4min",
    excerpt: "Exploring how artificial intelligence is revolutionizing the way content is generated...",
    date: "July 12, 2025",
    category: "AI",
    imageUrl: "/images/article-1.jpg",
    avatarUrl: "/images/article-1.jpg"
  },
];
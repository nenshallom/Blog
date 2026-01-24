import { Helmet } from "react-helmet-async";
import { defaultSEO } from "@config/seo.config";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  isArticle?: boolean;
  publishedTime?: string; 
  modifiedTime?: string; 
  authorName?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  isArticle = false,
  publishedTime,
  modifiedTime,
  authorName
}: SEOProps) {
  const seo = {
    title: title ? `${title} | ${defaultSEO.title}` : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywords || defaultSEO.keywords,
    image: image || defaultSEO.image,
    url: url || defaultSEO.url,
    author: authorName || defaultSEO.author
  };

  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": isArticle ? "BlogPosting" : "WebSite",
    "url": seo.url,
    "headline": seo.title,
    "description": seo.description,
    "image": seo.image,
    "author": {
      "@type": "Person",
      "name": seo.author
    },
    ...(isArticle && {
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime,
      "mainEntityOfPage": seo.url
    })
  };

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seo.author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph Meta */}
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={defaultSEO.title} />

      {/* Twitter Card Meta */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={defaultSEO.twitterHandle} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}

// src/components/blog/BlogPostPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getPostBySlug } from '@my-sanity/queries';
import { PortableText } from '@portabletext/react';
import type { BlogPost } from 'src/data/types';
import { urlFor } from '@my-sanity/image';
import { calculateReadTime } from '@utils/readTime';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      try {
        const fetchedPost = await getPostBySlug(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    }
    
    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }
  
  const readTime = post.content ? calculateReadTime(post.content) : '1 min read';

  const components = {
    block: {
      h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
      normal: ({ children }: any) => <p className="text-lg leading-relaxed mb-6">{children}</p>,
      blockquote: ({ children }: any) => <blockquote className="border-l-4 border-green-500 pl-4 italic my-6">{children}</blockquote>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 pl-4">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 pl-4">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="mb-2">{children}</li>,
      number: ({ children }: any) => <li className="mb-2">{children}</li>,
    },
    types: {
      image: ({ value }: { value: any }) => (
        <div className="flex justify-center my-8">
          <img 
            src={urlFor(value).url()} 
            alt={value.alt || 'blog post image'} 
            className="rounded-lg shadow-lg max-w-full md:max-w-[75%] lg:max-w-[60%] h-auto"
          />
        </div>
      ),
    },
  };

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900 min-h-screen mt-10">
      <article className="max-w-3xl mx-auto">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {post.category} • {new Date(post.publishedAt).toLocaleDateString()} • {readTime}
        </div>
        
        {post.author && (
          <div className="flex items-center mt-8 mb-8">
            <img
              src={post.author.imageUrl}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{post.author.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        <hr className="my-8 border-gray-200 dark:border-gray-700" />
        
        {post.content && (
          <div className="prose dark:prose-invert max-w-none">
            <PortableText value={post.content} components={components} />
          </div>
        )}
      </article>
    </section>
  );
}
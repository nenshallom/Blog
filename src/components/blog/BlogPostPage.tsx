// src/components/blog/BlogPostPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getPostBySlug } from '@my-sanity/queries';
import SocialLinks from '@components/layout/footer/SocialLinks';
import NewsletterForm from '@components/layout/footer/NewsletterForm';
import type { BlogPost } from 'src/data/types';
import { PortableText } from '@portabletext/react';
import type { PortableTextMarkComponentProps } from '@portabletext/react';
import { urlFor } from '@my-sanity/image';
import { calculateReadTime } from '@utils/readTime';
import { GoClock } from 'react-icons/go';
import { BiSolidBookReader } from 'react-icons/bi';
import Table from './Table'; // Import the new Table component
import SEO from '@components/Seo';

// Define a type for our specific link annotation
type SanityLink = {
  _type: 'link';
  href: string;
};


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

  const mainComponents = {
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
      table: Table,
    },
    marks: {
      // Use the correctly imported type
      link: (props: PortableTextMarkComponentProps<SanityLink>) => {
        const { children, value } = props;
        const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value?.href || '#'} rel={rel} className="text-blue-500 hover:underline">
            {children}
          </a>
        );
      },
    },
  };

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900 min-h-screen mt-10 overflow-y-scroll no-scrollbar">
      <SEO
        title={post.title}
        description={post.excerpt}
        isArticle={true}
        authorName={post.author?.name}
      />
      <article className="max-w-3xl mx-auto">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        {post.author && (
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
          <div className='flex gap-3'>
          <BiSolidBookReader className='text-[#184E59]'/>
          <span className="text-green-500">{post.category || 'Category'}</span>
          <GoClock className='text-[#184E59]'/>
          <span className='text-green-500'>{readTime || '5 min read'}</span>
          </div>
          <SocialLinks />
        </div>
        )}
        {post.author && (
          <div className="flex items-center mt-8 mb-8">
            <img
              src={post.author.imageUrl}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-sm font-bold text-[#184E59] dark:text-white">By {post.author.name}</h2>
            </div>
          </div>
        )}

        <hr className="my-8 border-gray-200 dark:border-gray-700" />
        {post.content && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText value={post.content} components={mainComponents} />
          </div>
        )}
      </article>
      <NewsletterForm />
    </section>
  );
}

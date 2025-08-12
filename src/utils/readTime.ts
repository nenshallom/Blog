// src/utils/readTime.ts
import type { PortableTextBlock } from '@portabletext/react';

// Define a reasonable words-per-minute rate for an average reader.
const WORDS_PER_MINUTE = 200;

/**
 * Calculates the estimated reading time of a blog post from its Portable Text content.
 * @param content The Portable Text block array representing the post's content.
 * @returns A string with the estimated reading time (e.g., "5 min read").
 */
export const calculateReadTime = (content: PortableTextBlock[]): string => {
  if (!content) {
    return '1 min read'; // Default for empty content
  }

  let totalWords = 0;

  // Iterate over each block in the Portable Text content
  content.forEach(block => {
    // Check if the block is of type 'block' and has children (spans)
    if (block._type === 'block' && block.children) {
      block.children.forEach(span => {
        if (typeof span.text === 'string') {
          // Split the text into words and add to the total count
          totalWords += span.text.split(/\s+/).filter(Boolean).length;
        }
      });
    }
  });

  // Calculate read time in minutes
  const readTimeInMinutes = Math.ceil(totalWords / WORDS_PER_MINUTE);

  return `${readTimeInMinutes} min read`;
};
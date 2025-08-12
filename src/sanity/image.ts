// src/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url';
import { sanity } from './client';

// Get a pre-configured builder from your Sanity client
const builder = imageUrlBuilder(sanity);

// Function to generate the URL for a given source (e.g., an image object from Sanity)
export function urlFor(source: any) {
  return builder.image(source);
}
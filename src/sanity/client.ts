// src/sanity/client.ts
import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID as string,
  dataset: import.meta.env.SANITY_DATASET as string,
  apiVersion: '2023-08-01',
  useCdn: true, 
});
// src/sanity/client.ts
import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: 'ztslohtd',
  dataset: 'production',
  apiVersion: '2023-08-01',
  useCdn: true,
});
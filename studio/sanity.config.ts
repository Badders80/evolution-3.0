import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import schemaTypes from './schemas';

export default defineConfig({
  name: 'evolution-studio',
  title: 'Evolution Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a4xfnv5b',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

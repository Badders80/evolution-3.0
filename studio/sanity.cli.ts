import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a4xfnv5b',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
});

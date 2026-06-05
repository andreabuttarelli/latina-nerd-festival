import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
	name: 'latina-nerd-festival',
	title: 'Latina Nerd Festival',
	projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'rj3wuxq5',
	dataset: process.env.SANITY_STUDIO_DATASET || 'production',
	plugins: [structureTool(), visionTool()],
	schema: { types: schemaTypes }
});

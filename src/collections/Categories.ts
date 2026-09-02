import type { CollectionConfig } from 'payload';

import { slugField } from 'payload';
import { anyone } from '../access/anyone';
import { authenticated } from '../access/authenticated';
import { editorAccess } from '../access/editorAccess';

export const Categories: CollectionConfig = {
	slug: 'categories',
	access: {
		create: editorAccess,
		delete: editorAccess,
		read: anyone,
		update: authenticated,
	},
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		slugField({
			position: undefined,
		}),
	],
};

import type { GlobalConfig } from 'payload';

import { editorAccess } from '@/access/editorAccess';
import { link } from '@/fields/link';
import { revalidateHeader } from './hooks/revalidateHeader';

export const Header: GlobalConfig = {
	slug: 'header',
	access: {
		read: () => true,
		update: editorAccess,
	},
	fields: [
		{
			name: 'navItems',
			type: 'array',
			fields: [
				link({
					appearances: ['default', 'ghost', 'link'],
				}),
			],
			maxRows: 6,
			admin: {
				initCollapsed: true,
				components: {
					RowLabel: '@/Header/RowLabel#RowLabel',
				},
			},
		},
	],
	hooks: {
		afterChange: [revalidateHeader],
	},
};

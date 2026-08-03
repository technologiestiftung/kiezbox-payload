import type { Block } from 'payload';

import { MediaBlock } from '@/blocks/MediaBlock/config';
import { OpenSource } from '@/blocks/OpenSource/config';

export const TwoColumn: Block = {
	slug: 'twoColumn',
	interfaceName: 'TwoColumnBlock',
	labels: {
		singular: 'Two Column (50/50)',
		plural: 'Two Columns (50/50)',
	},
	fields: [
		{
			name: 'verticalAlignment',
			type: 'select',
			defaultValue: 'center',
			options: [
				{ label: 'Top', value: 'start' },
				{ label: 'Center', value: 'center' },
				{ label: 'Bottom', value: 'end' },
			],
		},
		{
			name: 'reverseColumns',
			type: 'checkbox',
			label: 'Reverse column order (e.g. media on the right)',
			defaultValue: false,
		},
		{
			name: 'leftColumn',
			type: 'blocks',
			label: 'Left column',
			blocks: [MediaBlock, OpenSource],
			admin: { initCollapsed: true },
		},
		{
			name: 'rightColumn',
			type: 'blocks',
			label: 'Right column',
			blocks: [MediaBlock, OpenSource],
			admin: { initCollapsed: true },
		},
	],
};

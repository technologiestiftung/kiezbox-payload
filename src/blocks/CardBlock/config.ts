import type { Block, Field } from 'payload';

import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	HeadingFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { anchor } from '@/fields/anchor';

const cardFields: Field[] = [
	{
		name: 'icon',
		type: 'select',
		options: ['shield', 'sun', 'network', 'circuitBoard', 'microchip'],
	},
	{
		name: 'content',
		type: 'richText',
		editor: lexicalEditor({
			features: ({ rootFeatures }) => {
				return [
					...rootFeatures,
					HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
					FixedToolbarFeature(),
					InlineToolbarFeature(),
				];
			},
		}),
		label: false,
		required: true,
		localized: true,
	},
];

export const CardBlock: Block = {
	slug: 'cardBlock',
	interfaceName: 'CardBlock',
	fields: [
		anchor(),
		{ name: 'eyebrow', type: 'text' },
		{ name: 'title', type: 'text', required: true },
		{ name: 'subtitle', type: 'text' },
		{
			name: 'cards',
			type: 'array',
			admin: { initCollapsed: true },
			fields: cardFields,
		},
	],
};

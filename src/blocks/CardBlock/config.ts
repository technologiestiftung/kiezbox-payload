import type { Block, Field } from 'payload';

import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical';

const cardFields: Field[] = [
	{
		name: 'icon',
		type: 'select',
		options: ['star', 'heart', 'shield', 'check'],
	},
	{ name: 'title', type: 'text', required: true },
	{
		name: 'content',
		type: 'richText',
		editor: lexicalEditor({
			features: ({ rootFeatures }) => {
				return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
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

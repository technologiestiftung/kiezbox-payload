import type { Block } from 'payload';

import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { linkGroup } from '@/fields/linkGroup';

export const ContentMediaBlock: Block = {
	slug: 'contentMediaBlock',
	interfaceName: 'ContentMediaBlock',
	fields: [
		{ name: 'eyebrow', type: 'text' },
		{ name: 'title', type: 'text', required: true },
		{ name: 'subtitle', type: 'text' },
		{
			name: 'richText',
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
			localized: true,
		},
		linkGroup({
			overrides: {
				maxRows: 2,
			},
		}),
		{
			name: 'media',
			type: 'upload',
			relationTo: 'media',
			hasMany: true,
			minRows: 1,
			maxRows: 8,
			required: true,
		},
	],
};

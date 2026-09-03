import type { Block } from 'payload';

import {
	AlignFeature,
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
		{ name: 'title', type: 'text' },
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
						AlignFeature(),
					];
				},
			}),
			label: false,
			localized: true,
		},
		linkGroup({
			appearances: ['default', 'outline', 'ghost', 'link'],
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
		{
			name: 'mediaPosition',
			type: 'select',
			defaultValue: 'right',
			options: [
				{ label: 'Right', value: 'right' },
				{ label: 'Left', value: 'left' },
			],
		},
		{
			name: 'contentWidth',
			type: 'select',
			defaultValue: 'balanced',
			options: [
				{ label: 'Half', value: 'balanced' },
				{ label: 'Content Larger (2/3)', value: 'contentLarge' },
				{ label: 'Media Larger (2/3)', value: 'mediaLarge' },
			],
		},
		{
			name: 'background',
			type: 'select',
			defaultValue: 'default',
			options: [
				{ label: 'Default', value: 'default' },
				{ label: 'Inverse', value: 'inverse' },
			],
		},
		{
			name: 'features',
			type: 'array',
			admin: {
				initCollapsed: true,
				description:
					'Optional numbered feature list. Renders instead of richText when set.',
			},
			fields: [
				{
					name: 'content',
					type: 'richText',
					editor: lexicalEditor({
						features: ({ rootFeatures }) => {
							return [
								...rootFeatures,
								HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
								FixedToolbarFeature(),
								InlineToolbarFeature(),
								AlignFeature(),
							];
						},
					}),
					label: false,
					localized: true,
					required: true,
				},
			],
		},
		{
			name: 'showDivider',
			type: 'checkbox',
			defaultValue: false,
			admin: {
				description: 'Show a divider above the badges/links row.',
			},
		},
		{
			name: 'badges',
			type: 'array',
			admin: {
				initCollapsed: true,
				description:
					'Optional plain-text badge pills (e.g. license). For a linked pill, use the Links field above with the Ghost appearance instead.',
			},
			fields: [{ name: 'label', type: 'text', required: true }],
		},
	],
};

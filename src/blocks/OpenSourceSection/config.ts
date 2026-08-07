import type { Block, Field } from 'payload';

import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { link } from '@/fields/link';

const badge = (name: string, label: string): Field => ({
	name,
	type: 'group',
	label,
	fields: [
		{ name: 'label', type: 'text' },
		{ name: 'enableLink', type: 'checkbox', label: 'Enable link' },
		link({
			appearances: false,
			disableLabel: true,
			overrides: {
				admin: {
					condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
				},
			},
		}),
	],
});

export const OpenSourceSection: Block = {
	slug: 'openSource',
	interfaceName: 'OpenSourceSectionBlock',
	labels: {
		singular: 'Open Source Section',
		plural: 'Open Source Sections',
	},
	fields: [
		{ name: 'headline', type: 'text', required: true },
		{
			name: 'text',
			type: 'richText',
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
						FixedToolbarFeature(),
						InlineToolbarFeature(),
					];
				},
			}),
			label: false,
			localized: true,
		},
		{
			name: 'showAccentLine',
			type: 'checkbox',
			label: 'Show accent line',
			defaultValue: true,
		},
		badge('badgePrimary', 'Primary badge'),
		badge('badgeSecondary', 'Secondary badge'),
		{
			name: 'media',
			type: 'upload',
			relationTo: 'media',
			label: 'Media (right column)',
			admin: {
				description:
					'Optional. When set, the block renders as a 50/50 grid with the content and this media side by side.',
			},
		},
		{
			name: 'reverseColumns',
			type: 'checkbox',
			label: 'Reverse column order (media on the left)',
			defaultValue: false,
			admin: {
				condition: (_data, siblingData) => Boolean(siblingData?.media),
			},
		},
		{
			name: 'verticalAlignment',
			type: 'select',
			defaultValue: 'center',
			options: [
				{ label: 'Top', value: 'start' },
				{ label: 'Center', value: 'center' },
				{ label: 'Bottom', value: 'end' },
			],
			admin: {
				condition: (_data, siblingData) => Boolean(siblingData?.media),
			},
		},
	],
};

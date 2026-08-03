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

export const OpenSource: Block = {
	slug: 'openSource',
	interfaceName: 'OpenSourceBlock',
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
	],
};

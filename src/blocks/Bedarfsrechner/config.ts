import type { Block } from 'payload';

import { anchor } from '@/fields/anchor';
import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical';

export const Bedarfsrechner: Block = {
	slug: 'bedarfsrechner',
	interfaceName: 'BedarfsrechnerBlock',
	labels: { singular: 'Bedarfsrechner', plural: 'Bedarfsrechner' },
	fields: [
		anchor(),
		{ name: 'eyebrow', type: 'text', defaultValue: 'Bedarfsrechner' },
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Wie viele Kiezboxen braucht Ihr Gebiet?',
		},
		{
			name: 'areaLabel',
			type: 'text',
			required: true,
			defaultValue: 'Fläche Ihres Zielgebiets (km²)',
		},
		{
			name: 'areaDescription',
			type: 'textarea',
			defaultValue:
				'Wie groß ist das Gebiet, der Marktplatz oder die Stadt, die Sie abdecken möchten?',
		},
		{
			name: 'modeLabel',
			type: 'text',
			required: true,
			defaultValue: 'Was möchten Sie abdecken?',
		},
		{
			name: 'modeDescription',
			type: 'textarea',
			defaultValue:
				'Wählen Sie, welche Verbindung Sie abdecken möchten: den Mesh-Backbone zwischen den Kiezboxen oder das öffentliche WLAN für Bürger:innen.',
		},
		{
			type: 'row',
			fields: [
				{
					name: 'meshLabel',
					type: 'text',
					required: true,
					defaultValue: 'Mesh-Knoten',
					admin: { width: '50%' },
				},
				{
					name: 'meshDescription',
					type: 'text',
					defaultValue: 'Richtfunk · max. 1 km',
					admin: {
						width: '50%',
						description:
							'The calculation uses a fixed range of 1 km, independent of this text.',
					},
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'publicWifiLabel',
					type: 'text',
					required: true,
					defaultValue: 'Public-Wifi',
					admin: { width: '50%' },
				},
				{
					name: 'publicWifiDescription',
					type: 'text',
					defaultValue: 'Bürger:innen-WLAN · max. 400 m',
					admin: {
						width: '50%',
						description:
							'The calculation uses a fixed range of 400 m, independent of this text.',
					},
				},
			],
		},
		{
			name: 'resultUnit',
			type: 'text',
			defaultValue: 'Kiezboxen',
			admin: {
				description:
					'Read out to screen readers after the number, e.g. "4–5 Kiezboxen".',
			},
		},
		{
			name: 'disclaimer',
			type: 'richText',
			editor: lexicalEditor({
				features: ({ rootFeatures }) => [
					...rootFeatures,
					FixedToolbarFeature(),
					InlineToolbarFeature(),
				],
			}),
			label: 'Disclaimer',
		},
	],
};

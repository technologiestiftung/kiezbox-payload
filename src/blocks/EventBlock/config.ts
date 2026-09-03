import type { Block, Field } from 'payload'

import { anchor } from '@/fields/anchor'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const eventFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  { name: 'tag', type: 'text' },
  { name: 'date', type: 'date' },
  { name: 'location', type: 'text' },
  {
    name: 'content',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
      },
    }),
    label: false,
    required: true,
  },
  link({
    appearances: false,
  }),
]

export const EventBlock: Block = {
  slug: 'eventBlock',
  interfaceName: 'EventBlock',
  fields: [
    anchor(),
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    {
      name: 'events',
      type: 'array',
      admin: { initCollapsed: true },
      fields: eventFields,
    },
  ],
}

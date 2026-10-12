import type { Field } from 'payload';

import deepMerge from '@/utilities/deepMerge';

type AnchorType = (options?: { overrides?: Partial<Field> }) => Field;

export const anchor: AnchorType = ({ overrides = {} } = {}) => {
	const anchorField: Field = {
		name: 'anchor',
		type: 'text',
		admin: {
			description:
				"Optional HTML id for this section, e.g. 'wie-es-funktioniert'. Lets navigation link here via '#wie-es-funktioniert'.",
		},
	};

	return deepMerge(anchorField, overrides);
};

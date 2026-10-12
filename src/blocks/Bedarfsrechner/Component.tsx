import RichText from '@/components/RichText';
import type { BedarfsrechnerBlock as BedarfsrechnerBlockProps } from '@/payload-types';
import { FC } from 'react';

import { Bedarfsrechner } from './Component.client';

type Props = BedarfsrechnerBlockProps;

export const BedarfsrechnerBlock: FC<Props> = ({
	eyebrow,
	title,
	disclaimer,
	...calculator
}) => (
	<div className="BedarfsrechnerBlock-root container">
		<div className="mb-8 max-w-3xl space-y-4">
			{eyebrow && (
				<p className="text-sm font-bold uppercase text-secondary">{eyebrow}</p>
			)}
			<h2 className="text-4xl font-bold">{title}</h2>
		</div>

		<Bedarfsrechner
			{...calculator}
			disclaimer={
				disclaimer ? (
					<RichText
						data={disclaimer}
						enableGutter={false}
						enableProse={false}
					/>
				) : undefined
			}
		/>
	</div>
);

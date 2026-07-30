import RichText from '@/components/RichText';
import type { CardBlock as CardBlockProps } from '@/payload-types';
import {
	Check,
	Heart,
	Shield,
	Sun,
	Network,
	CircuitBoard,
	Microchip,
} from 'lucide-react';
import { FC } from 'react';

const iconMap = {
	shield: Shield,
	sun: Sun,
	network: Network,
	circuitBoard: CircuitBoard,
	microchip: Microchip,
} as const;

type Props = CardBlockProps;

export const CardBlock: FC<Props> = ({ eyebrow, title, subtitle, cards }) => {
	return (
		<div className="CardBlock-root bg-muted/20">
			<div className="container py-16">
				<div>
					<div className="max-w-3xl space-y-4 mb-8">
						{eyebrow && (
							<p className="text-sm font-bold uppercase">{eyebrow}</p>
						)}

						<h2 className="text-3xl font-bold">{title}</h2>

						{subtitle && (
							<p className="text-xl text-muted-foreground">{subtitle}</p>
						)}
					</div>

					<div className="grid grid-cols-4 lg:grid-cols-12 gap-6">
						{cards?.map((card, i) => {
							const Icon =
								(card.icon && iconMap[card.icon as keyof typeof iconMap]) ||
								Shield;

							return (
								<div
									key={card.id ?? i}
									className="col-span-4 md:col-span-2 lg:col-span-4 border-4 border-secondary p-6"
								>
									<Icon className="mb-4" />
									<RichText data={card.content} enableGutter={false} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

'use client';

import React from 'react';

import { Media } from '@/components/Media';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import type { Media as MediaType } from '@/payload-types';

type Props = {
	items: MediaType[];
};

export const MediaCarousel: React.FC<Props> = ({ items }) => {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Media
				resource={items[0]}
				priority
				className="h-full w-full flex items-center justify-center"
				pictureClassName="block h-full w-full"
				imgClassName="max-h-full max-w-full h-auto w-auto object-contain"
			/>
		);
	}

	return (
		<Carousel opts={{ loop: true }} className="h-full w-full">
			<CarouselContent className="h-full">
				{items.map((item, index) => (
					<CarouselItem key={item.id} className="h-full basis-full">
						<Media
							resource={item}
							fill
							priority={index === 0}
							className="h-full w-full"
							pictureClassName="relative block h-full w-full"
							imgClassName="object-contain"
						/>
					</CarouselItem>
				))}
			</CarouselContent>

			<CarouselPrevious className="left-2 top-1/2 z-10 h-9 w-9 -translate-y-1/2 border-border/70 bg-background/90 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/75 hover:bg-background" />
			<CarouselNext className="right-2 top-1/2 z-10 h-9 w-9 -translate-y-1/2 border-border/70 bg-background/90 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/75 hover:bg-background" />
		</Carousel>
	);
};

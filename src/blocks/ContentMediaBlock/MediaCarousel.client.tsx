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
		<Carousel opts={{ loop: true }} className="w-full h-full">
			<CarouselContent className="h-full">
				{items.map((item, index) => (
					<CarouselItem
						className="h-full flex items-center justify-center"
						key={item.id}
					>
						<Media
							resource={item}
							priority={index === 0}
							className="h-full w-full flex items-center justify-center"
							pictureClassName="block h-full w-full"
							imgClassName="max-h-full max-w-full h-auto w-auto object-contain"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
			<CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
		</Carousel>
	);
};

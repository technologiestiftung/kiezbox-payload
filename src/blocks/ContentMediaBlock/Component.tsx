import React from 'react';

import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import type { ContentMediaBlock as ContentMediaBlockProps } from '@/payload-types';

type Props = ContentMediaBlockProps;

export const ContentMediaBlock: React.FC<Props> = ({
	eyebrow,
	title,
	subtitle,
	links,
	media,
	richText,
}) => {
	const mediaItems = Array.isArray(media)
		? media.filter((item): item is NonNullable<typeof item> => item != null)
		: media
			? [media]
			: [];

	return (
		<section className="container py-2">
			<div className="max-w-3xl space-y-4 mb-8">
				{eyebrow && <p className="text-sm font-bold uppercase">{eyebrow}</p>}

				<h2 className="text-3xl font-bold">{title}</h2>

				{subtitle && (
					<p className="text-xl text-muted-foreground">{subtitle}</p>
				)}
			</div>

			<div className="grid lg:grid-cols-12 items-stretch gap-12 min-h-141 max-h-screen">
				{/* Content */}

				<div className="lg:col-span-6 flex flex-col justify-center">
					{richText && (
						<RichText className="mb-6" data={richText} enableGutter={false} />
					)}

					{Array.isArray(links) && links.length > 0 && (
						<ul className="flex flex-wrap gap-4">
							{links.map(({ link }, i) => (
								<li key={i}>
									<CMSLink {...link} />
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Image */}
				<div className="lg:col-span-6 h-full">
					{mediaItems.length === 1 && (
						<Media
							resource={mediaItems[0]}
							priority
							className="h-full"
							imgClassName="h-full w-full object-cover"
						/>
					)}

					{mediaItems.length > 1 && (
						<Carousel opts={{ loop: true }} className="w-full h-full">
							<CarouselContent>
								{mediaItems.map((item, index) => (
									<CarouselItem
										key={
											typeof item === 'object' ? item.id : `${item}-${index}`
										}
									>
										<Media
											resource={item}
											priority={index === 0}
											className="h-full"
											imgClassName="h-full w-full object-cover"
										/>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
							<CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
						</Carousel>
					)}
				</div>
			</div>
		</section>
	);
};

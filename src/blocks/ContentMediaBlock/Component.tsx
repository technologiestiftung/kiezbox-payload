import React from 'react';

import { MediaCarousel } from '@/blocks/ContentMediaBlock/MediaCarousel.client';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import type {
	ContentMediaBlock as ContentMediaBlockProps,
	Media as MediaType,
} from '@/payload-types';

type Props = ContentMediaBlockProps;

export const ContentMediaBlock: React.FC<Props> = ({
	eyebrow,
	title,
	subtitle,
	links,
	media,
	richText,
}) => {
	const mediaItems = (
		Array.isArray(media) ? media : media ? [media] : []
	).filter(
		(item): item is MediaType => typeof item === 'object' && item !== null,
	);

	return (
		<section className="container py-2">
			<div className="max-w-3xl space-y-4 mb-8">
				{eyebrow && <p className="text-sm font-bold uppercase">{eyebrow}</p>}

				<h2 className="text-3xl font-bold">{title}</h2>

				{subtitle && (
					<p className="text-xl text-muted-foreground">{subtitle}</p>
				)}
			</div>

			<div className="grid lg:grid-cols-12 items-stretch gap-12">
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
				<div className="lg:col-span-6 lg:flex">
					<div className="h-72 md:h-88 lg:h-full lg:max-h-svh w-full bg-muted/20 p-2">
						{mediaItems.length === 1 && (
							<Media
								resource={mediaItems[0]}
								priority
								className="h-full w-full flex items-center justify-center"
								pictureClassName="block h-full w-full"
								imgClassName="max-h-full max-w-full h-auto w-auto object-contain"
							/>
						)}

						{mediaItems.length > 1 && <MediaCarousel items={mediaItems} />}
					</div>
				</div>
			</div>
		</section>
	);
};

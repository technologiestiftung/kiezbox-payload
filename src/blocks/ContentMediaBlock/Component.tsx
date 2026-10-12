import React from 'react';

import { MediaCarousel } from '@/blocks/ContentMediaBlock/MediaCarousel.client';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { Badge } from '@/components/ui/badge';
import { Divider } from '@/components/ui/divider';
import type {
	ContentMediaBlock as ContentMediaBlockProps,
	Media as MediaType,
} from '@/payload-types';
import { cn } from '@/utilities/ui';

type Props = ContentMediaBlockProps;

const CONTENT_COL_SPAN: Record<
	NonNullable<Props['contentWidth']>,
	string
> = {
	balanced: 'lg:col-span-6',
	contentLarge: 'lg:col-span-8',
	mediaLarge: 'lg:col-span-4',
};

const MEDIA_COL_SPAN: Record<NonNullable<Props['contentWidth']>, string> = {
	balanced: 'lg:col-span-6',
	contentLarge: 'lg:col-span-4',
	mediaLarge: 'lg:col-span-8',
};

export const ContentMediaBlock: React.FC<Props> = ({
	eyebrow,
	title,
	subtitle,
	links,
	media,
	mediaPosition = 'right',
	contentWidth: contentWidthProp,
	background = 'default',
	richText,
	features,
	showDivider,
	badges,
}) => {
	const contentWidth = contentWidthProp ?? 'balanced';
	const mediaItems = (
		Array.isArray(media) ? media : media ? [media] : []
	).filter(
		(item): item is MediaType => typeof item === 'object' && item !== null,
	);
	const hasFeatures = Array.isArray(features) && features.length > 0;
	const hasBadges = Array.isArray(badges) && badges.length > 0;
	const inverse = background === 'inverse';

	return (
		<section
			className={cn(inverse ? 'bg-accent text-primary-foreground' : undefined)}
		>
			<div className={cn('container', inverse ? 'py-12' : undefined)}>
				<div className="max-w-3xl space-y-4 mb-8">
					{eyebrow && (
						<p
							className={cn(
								'text-sm font-bold uppercase',
								inverse ? 'text-primary-foreground/70' : 'text-secondary',
							)}
						>
							{eyebrow}
						</p>
					)}

					{title && <h2 className="text-3xl font-bold">{title}</h2>}

					{subtitle && (
						<p
							className={cn(
								'text-xl',
								inverse
									? 'text-primary-foreground/80'
									: 'text-muted-foreground',
							)}
						>
							{subtitle}
						</p>
					)}
				</div>

				<div className="grid lg:grid-cols-12 items-stretch gap-2 md:gap-6 lg:gap-12">
					{/* Content */}
					<div
						className={cn(
							CONTENT_COL_SPAN[contentWidth],
							'flex flex-col pb-4',
							mediaPosition === 'left' ? 'lg:order-2' : undefined,
						)}
					>
						{hasFeatures ? (
							<ol className="space-y-6 mb-4">
								{features?.map((feature, i) => (
									<li key={feature.id ?? i} className="flex flex-col gap-4">
										<span className="text-sm font-bold text-secondary shrink-0">
											{String(i + 1).padStart(2, '0')}
										</span>
										{feature.content && (
											<RichText data={feature.content} enableGutter={false} />
										)}
									</li>
								))}
							</ol>
						) : (
							richText && <RichText data={richText} enableGutter={false} />
						)}

						{(hasBadges || (Array.isArray(links) && links.length > 0)) && (
							<>
								{showDivider && (
									<div className="my-4">
										<Divider />
									</div>
								)}

								<ul className="flex flex-wrap items-center gap-4">
									{badges?.map((badge, i) => (
										<li key={badge.id ?? i}>
											<Badge variant="secondary">{badge.label}</Badge>
										</li>
									))}

									{links?.map(({ link }, i) => (
										<li key={i}>
											<CMSLink {...link} />
										</li>
									))}
								</ul>
							</>
						)}
					</div>

					{/* Image */}
					<div
						className={cn(
							MEDIA_COL_SPAN[contentWidth],
							'lg:flex flex-col',
							mediaPosition === 'left' ? 'lg:order-1' : undefined,
						)}
					>
						<div className="relative h-72 w-full p-2 sm:h-96 lg:h-auto lg:flex-1">
							{mediaItems.length === 1 && (
								<Media
									resource={mediaItems[0]}
									priority
									className="h-full w-full flex items-center justify-center"
									pictureClassName="block h-full w-full"
									imgClassName="h-full w-full object-contain"
								/>
							)}

							{mediaItems.length > 1 && <MediaCarousel items={mediaItems} />}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

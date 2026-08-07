import React from 'react';

import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { cn } from '@/utilities/ui';

import type {
	Media as MediaType,
	OpenSourceSectionBlock as OpenSourceSectionBlockProps,
} from '@/payload-types';

type BadgeData = OpenSourceSectionBlockProps['badgePrimary'];

const alignmentClasses: Record<
	NonNullable<OpenSourceSectionBlockProps['verticalAlignment']>,
	string
> = {
	start: 'lg:items-start',
	center: 'lg:items-center',
	end: 'lg:items-end',
};

const Badge: React.FC<{
	badge?: BadgeData;
	className?: string;
	linkClassName?: string;
}> = ({ badge, className, linkClassName }) => {
	if (!badge?.label) return null;

	if (badge.enableLink && badge.link) {
		return (
			<CMSLink
				{...badge.link}
				className={cn(className, linkClassName)}
				label={badge.label}
			/>
		);
	}

	return <span className={className}>{badge.label}</span>;
};

export const OpenSourceSectionBlock: React.FC<OpenSourceSectionBlockProps> = ({
	headline,
	text,
	showAccentLine,
	badgePrimary,
	badgeSecondary,
	media,
	reverseColumns,
	verticalAlignment,
}) => {
	const hasBadges = Boolean(badgePrimary?.label || badgeSecondary?.label);
	const mediaResource =
		typeof media === 'object' && media !== null ? (media as MediaType) : null;

	const content = (
		<div className="space-y-6">
			{headline && <h2 className="text-3xl font-bold">{headline}</h2>}

			{text && (
				<RichText
					className="text-lg text-muted-foreground"
					data={text}
					enableGutter={false}
				/>
			)}

			{showAccentLine && (
				<hr className="border-t-2 border-secondary" aria-hidden="true" />
			)}

			{hasBadges && (
				<div className="flex flex-wrap items-center gap-6">
					<Badge
						badge={badgePrimary}
						className={cn(
							'inline-flex items-center bg-secondary px-3 py-1.5 text-sm font-semibold text-white [clip-path:polygon(0_0,100%_0,100%_calc(100%_-_10px),calc(100%_-_10px)_100%,0_100%)]',
						)}
					/>
					<Badge
						badge={badgeSecondary}
						className={cn('inline-flex items-center text-sm font-bold')}
						linkClassName="hover:underline"
					/>
				</div>
			)}
		</div>
	);

	if (!mediaResource) {
		return <div className="container">{content}</div>;
	}

	return (
		<div className="container">
			<div
				className={cn(
					'grid gap-12 lg:grid-cols-2',
					alignmentClasses[verticalAlignment ?? 'center'],
				)}
			>
				<div className={cn(reverseColumns && 'lg:order-2')}>{content}</div>
				<div className={cn(reverseColumns && 'lg:order-1')}>
					<Media
						resource={mediaResource}
						className="h-full w-full"
						imgClassName="h-auto w-full object-cover"
					/>
				</div>
			</div>
		</div>
	);
};

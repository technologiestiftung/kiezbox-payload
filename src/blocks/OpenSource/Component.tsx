import React from 'react';

import { CMSLink } from '@/components/Link';
import RichText from '@/components/RichText';
import { cn } from '@/utilities/ui';

import type { OpenSourceBlock as OpenSourceBlockProps } from '@/payload-types';

type BadgeData = OpenSourceBlockProps['badgePrimary'];

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

export const OpenSourceBlock: React.FC<OpenSourceBlockProps> = ({
	headline,
	text,
	showAccentLine,
	badgePrimary,
	badgeSecondary,
}) => {
	const hasBadges = Boolean(badgePrimary?.label || badgeSecondary?.label);

	return (
		<div className="space-y-6">
			{headline && <h2 className="text-4xl font-bold">{headline}</h2>}

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
							'inline-flex items-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold text-white',
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
};

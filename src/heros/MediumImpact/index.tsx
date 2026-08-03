import React from 'react';

import type { Page } from '@/payload-types';

import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';

export const MediumImpactHero: React.FC<Page['hero']> = ({
	links,
	media,
	richText,
}) => {
	return (
		<section className="container py-2">
			<div className="grid lg:grid-cols-12 items-stretch gap-12 min-h-141">
				{/* Content */}
				<div className="lg:col-span-8 flex flex-col justify-center">
					{richText && (
						<RichText
							className="mb-6 mx-6"
							data={richText}
							enableGutter={false}
						/>
					)}

					{Array.isArray(links) && links.length > 0 && (
						<ul className="flex flex-wrap gap-4 mx-6">
							{links.map(({ link }, i) => (
								<li key={i}>
									<CMSLink {...link} />
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Image */}
				<div className="lg:col-span-4 h-full max-h-141 overflow-hidden">
					{media && typeof media === 'object' && (
						<>
							{/* below lg → square (focal-point) crop */}
							<Media
								resource={
									media.sizes?.square?.url
										? {
												...media,
												url: media.sizes.square.url,
												width: media.sizes.square.width,
												height: media.sizes.square.height,
											}
										: media
								}
								priority
								className="h-full max-h-full lg:hidden"
								imgClassName="h-full max-h-full w-full object-cover"
							/>
							{/* lg and up → full image */}
							<Media
								resource={media}
								priority
								className="h-full max-h-full hidden lg:block"
								imgClassName="h-full max-h-full w-full object-cover"
							/>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

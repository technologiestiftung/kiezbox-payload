import React, { Fragment } from 'react';

import type { Props } from './types';

import { ImageMedia } from './ImageMedia';
import { PdfMedia } from './PdfMedia';
import { VideoMedia } from './VideoMedia';

export const Media: React.FC<Props> = (props) => {
	const { className, htmlElement = 'div', resource } = props;

	const isVideo =
		typeof resource === 'object' && resource?.mimeType?.includes('video');
	const isPdf =
		typeof resource === 'object' && resource?.mimeType === 'application/pdf';
	const Tag = htmlElement || Fragment;

	return (
		<Tag
			{...(htmlElement !== null
				? {
						className,
					}
				: {})}
		>
			{isVideo ? (
				<VideoMedia {...props} />
			) : isPdf ? (
				<PdfMedia {...props} />
			) : (
				<ImageMedia {...props} />
			)}
		</Tag>
	);
};

import { cn } from '@/utilities/ui';
import { FileText } from 'lucide-react';
import React from 'react';

import type { Props as MediaProps } from '../types';

import { getMediaUrl } from '@/utilities/getMediaUrl';

const formatFileSize = (bytes?: number | null): string | null => {
	if (!bytes) return null;
	if (bytes < 1024) return `${bytes} B`;
	const units = ['KB', 'MB', 'GB'];
	let size = bytes / 1024;
	let unitIndex = 0;
	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex += 1;
	}
	return `${size.toFixed(1)} ${units[unitIndex]}`;
};

export const PdfMedia: React.FC<MediaProps> = (props) => {
	const { className, onClick, pdfClassName, resource } = props;

	if (!resource || typeof resource !== 'object') return null;

	const { filename, filesize, url } = resource;
	const fileSizeLabel = formatFileSize(filesize);
	const href = getMediaUrl(url);

	if (!href) return null;

	return (
		<a
			className={cn(
				'flex items-center gap-3 rounded-md border p-4 ring-ring/10 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 dark:ring-ring/20 dark:outline-ring/40',
				className,
				pdfClassName,
			)}
			href={href}
			onClick={onClick}
			rel="noopener noreferrer"
			target="_blank"
		>
			<FileText aria-hidden="true" className="size-8 shrink-0" />
			<span className="flex flex-col overflow-hidden">
				<span className="truncate font-medium">
					{filename || 'PDF'} öffnen
					<span className="sr-only"> (öffnet in neuem Tab)</span>
				</span>
				<span className="text-sm text-muted-foreground">
					PDF{fileSizeLabel ? ` · ${fileSizeLabel}` : ''}
				</span>
			</span>
		</a>
	);
};

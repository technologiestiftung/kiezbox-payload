import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/utilities/ui';
import Link from 'next/link';
import React from 'react';

import type { Page, Post } from '@/payload-types';

type CMSLinkType = {
	appearance?: 'inline' | ButtonProps['variant'];
	children?: React.ReactNode;
	className?: string;
	label?: string | null;
	newTab?: boolean | null;
	reference?: {
		relationTo: 'pages' | 'posts';
		value: Page | Post | string | number;
	} | null;
	size?: ButtonProps['size'] | null;
	type?: 'custom' | 'reference' | null;
	url?: string | null;
};

/**
 * next/link treats a click as a no-op when the resulting pathname+hash already
 * matches the current URL, so it can fail to re-scroll on repeat clicks after
 * the user manually scrolls away. A native <a> always triggers the browser's
 * fragment-scroll behavior, so pure in-page hash links use one instead.
 */
const isPureHashHref = (href: string): boolean =>
	href.startsWith('#') || href.startsWith('/#');

export const CMSLink: React.FC<CMSLinkType> = (props) => {
	const {
		type,
		appearance = 'inline',
		children,
		className,
		label,
		newTab,
		reference,
		size: sizeFromProps,
		url,
	} = props;

	const href =
		type === 'reference' &&
		typeof reference?.value === 'object' &&
		reference.value.slug
			? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
					reference.value.slug
				}`
			: url;

	if (!href) return null;

	const size = appearance === 'link' ? 'clear' : sizeFromProps;
	const newTabProps = newTab
		? { rel: 'noopener noreferrer', target: '_blank' }
		: {};
	const shouldUseNativeAnchor = isPureHashHref(href);
	const content = (
		<>
			{label && label}
			{children && children}
		</>
	);

	/* Ensure we don't break any styles set by richText */
	if (appearance === 'inline') {
		return shouldUseNativeAnchor ? (
			<a className={cn(className)} href={href} {...newTabProps}>
				{content}
			</a>
		) : (
			<Link className={cn(className)} href={href} {...newTabProps}>
				{content}
			</Link>
		);
	}

	return (
		<Button asChild className={className} size={size} variant={appearance}>
			{shouldUseNativeAnchor ? (
				<a className={cn(className)} href={href} {...newTabProps}>
					{content}
				</a>
			) : (
				<Link className={cn(className)} href={href} {...newTabProps}>
					{content}
				</Link>
			)}
		</Button>
	);
};

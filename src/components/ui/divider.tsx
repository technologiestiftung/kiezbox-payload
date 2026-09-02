import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utilities/ui';

const dividerVariants = cva('h-1 w-full', {
	variants: {
		variant: {
			default: 'bg-primary',
			secondary: 'bg-secondary',
			destructive: 'bg-destructive',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export interface DividerProps
	extends
		React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof dividerVariants> {}

function Divider({ className, variant, ...props }: DividerProps) {
	return (
		<div className={cn(dividerVariants({ variant }), className)} {...props} />
	);
}

export { Divider, dividerVariants };

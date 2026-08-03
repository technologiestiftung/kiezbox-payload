import React, { Fragment } from 'react';

import { MediaBlock } from '@/blocks/MediaBlock/Component';
import { OpenSourceBlock } from '@/blocks/OpenSource/Component';
import { cn } from '@/utilities/ui';

import type { TwoColumnBlock as TwoColumnBlockProps } from '@/payload-types';

const columnBlockComponents = {
    mediaBlock: MediaBlock,
    openSource: OpenSourceBlock,
};

type ColumnBlocks = TwoColumnBlockProps['leftColumn'];

const RenderColumn: React.FC<{ blocks?: ColumnBlocks }> = ({ blocks }) => {
    if (!Array.isArray(blocks) || blocks.length === 0) return null;

    return (
        <Fragment>
            {blocks.map((block, index) => {
                if (!block || typeof block !== 'object') return null;

                const { blockType } = block;

                if (blockType && blockType in columnBlockComponents) {
                    const Block = columnBlockComponents[blockType];

                    if (Block) {
                        return (
                            // @ts-expect-error there may be some mismatch between the expected block prop types here
                            <Block key={index} {...block} enableGutter={false} />
                        );
                    }
                }

                return null;
            })}
        </Fragment>
    );
};

const alignmentClasses: Record<
    NonNullable<TwoColumnBlockProps['verticalAlignment']>,
    string
> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
};

export const TwoColumnBlock: React.FC<TwoColumnBlockProps> = ({
    verticalAlignment,
    reverseColumns,
    leftColumn,
    rightColumn,
}) => {
    const hasLeft = Array.isArray(leftColumn) && leftColumn.length > 0;
    const hasRight = Array.isArray(rightColumn) && rightColumn.length > 0;

    if (!hasLeft && !hasRight) return null;

    return (
        <section className="container py-2 my-12">
            <div
                className={cn(
                    'grid gap-12 lg:grid-cols-2',
                    alignmentClasses[verticalAlignment ?? 'center'],
                )}
            >
                <div
                    className={cn(
                        'max-lg:[&_picture]:block max-lg:[&_img]:w-full max-lg:[&_img]:h-auto',
                        reverseColumns && 'lg:order-2',
                    )}
                >
                    <RenderColumn blocks={leftColumn} />
                </div>
                <div
                    className={cn(
                        'max-lg:[&_picture]:block max-lg:[&_img]:w-full max-lg:[&_img]:h-auto',
                        reverseColumns && 'lg:order-1',
                    )}
                >
                    <RenderColumn blocks={rightColumn} />
                </div>
            </div>
        </section>
    );
};
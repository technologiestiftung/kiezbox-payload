'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

import type { CoverageMode } from './calculate';

type Props = {
	mode: CoverageMode;
	result: string;
	meshLabel: string;
	publicWifiLabel: string;
};

const CENTER = 200;

/** Deterministic wavy closed path so server and client render identical markup. */
const buildBlobPath = (
	radius: number,
	waves: number,
	phase: number,
	scale = 1,
): string => {
	const steps = 72;
	const points = Array.from({ length: steps }, (_, i) => {
		const angle = (i / steps) * Math.PI * 2;
		const wobble =
			1 +
			0.045 * Math.sin(angle * waves + phase) +
			0.03 * Math.sin(angle * (waves + 3) + phase * 2);
		const x = CENTER + Math.cos(angle) * radius * scale * wobble;
		const y = CENTER + Math.sin(angle) * radius * scale * wobble;
		return `${x.toFixed(1)} ${y.toFixed(1)}`;
	});

	return `M${points.join(' L')} Z`;
};

const OUTER_RADIUS = 165;
const INNER_RADIUS = 60;

/** Approximate glyph width of the bold result text, in em. */
const RESULT_CHAR_WIDTH_EM = 0.65;
/** Share of the inner diameter the result text may use. */
const RESULT_TEXT_FILL = 0.75;

/** Dotted line for the shape that is not selected. */
const DOTTED_DASHARRAY = '0.1 7';

const OUTER_PHASE = 0.6;
const INNER_PHASE = 1.4;
const OUTER_PATH = buildBlobPath(OUTER_RADIUS, 2, OUTER_PHASE);
const INNER_PATH = buildBlobPath(INNER_RADIUS, 2, INNER_PHASE);

export const CoverageGraphic = ({
	mode,
	result,
	meshLabel,
	publicWifiLabel,
}: Props) => {
	// Shapes have a fixed size, so long results shrink instead of growing the circle.
	const resultFontSize = Math.min(
		40,
		(INNER_RADIUS * 2 * RESULT_TEXT_FILL) /
			(RESULT_CHAR_WIDTH_EM * result.length),
	);
	const outerRef = useRef<SVGPathElement>(null);
	const innerRef = useRef<SVGPathElement>(null);

	const [isPaused, setIsPaused] = useState(false);
	const [hasReducedMotion, setHasReducedMotion] = useState(false);
	const elapsedRef = useRef(0);

	// Wobble + gentle "breathing". Stops for users preferring reduced motion
	// and whenever the user pauses it (WCAG 2.2.2); resuming continues seamlessly.
	useEffect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		let frame = 0;
		let lastTime: number | null = null;

		const render = (time: number) => {
			if (lastTime !== null) elapsedRef.current += time - lastTime;
			lastTime = time;

			const t = elapsedRef.current / 1000;
			outerRef.current?.setAttribute(
				'd',
				buildBlobPath(
					OUTER_RADIUS,
					5,
					OUTER_PHASE + t * 0.5,
					1 + 0.012 * Math.sin(t * 1.1),
				),
			);
			innerRef.current?.setAttribute(
				'd',
				buildBlobPath(
					INNER_RADIUS,
					7,
					INNER_PHASE - t * 0.8,
					1 + 0.03 * Math.sin(t * 1.7 + 1),
				),
			);
			frame = requestAnimationFrame(render);
		};

		const sync = () => {
			cancelAnimationFrame(frame);
			lastTime = null;
			setHasReducedMotion(query.matches);
			if (query.matches) {
				elapsedRef.current = 0;
				outerRef.current?.setAttribute('d', OUTER_PATH);
				innerRef.current?.setAttribute('d', INNER_PATH);
				return;
			}
			if (!isPaused) frame = requestAnimationFrame(render);
		};

		sync();
		query.addEventListener('change', sync);
		return () => {
			cancelAnimationFrame(frame);
			query.removeEventListener('change', sync);
		};
	}, [isPaused]);

	return (
		<div className="flex w-full max-w-md flex-col items-center gap-3">
			<svg
				viewBox="0 0 400 400"
				className="h-auto w-full text-primary"
				aria-hidden="true"
				focusable="false"
			>
				<g>
					<text
						x={CENTER}
						y={CENTER - OUTER_RADIUS - 20}
						textAnchor="middle"
						className="fill-muted-foreground text-[14px]"
					>
						{meshLabel}
					</text>
					<path
						ref={outerRef}
						d={OUTER_PATH}
						fill="none"
						stroke="currentColor"
						strokeWidth={3}
						strokeLinecap="round"
						strokeDasharray={mode === 'mesh' ? undefined : DOTTED_DASHARRAY}
					/>
				</g>

				<g>
					<text
						x={CENTER}
						y={CENTER - INNER_RADIUS - 20}
						textAnchor="middle"
						className="fill-muted-foreground text-[14px]"
					>
						{publicWifiLabel}
					</text>
					<path
						ref={innerRef}
						d={INNER_PATH}
						fill="none"
						stroke="currentColor"
						strokeWidth={3}
						strokeLinecap="round"
						strokeDasharray={
							mode === 'publicWifi' ? undefined : DOTTED_DASHARRAY
						}
					/>
				</g>

				<text
					x={CENTER}
					y={CENTER}
					textAnchor="middle"
					dominantBaseline="central"
					className="fill-current font-bold"
					fontSize={resultFontSize}
				>
					{result}
				</text>
			</svg>

			{!hasReducedMotion && (
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="text-xs text-muted-foreground"
					onClick={() => setIsPaused((current) => !current)}
				>
					{isPaused ? (
						<Play aria-hidden="true" className="size-4" />
					) : (
						<Pause aria-hidden="true" className="size-4" />
					)}
					{isPaused ? 'Animation starten' : 'Animation anhalten'}
				</Button>
			)}
		</div>
	);
};

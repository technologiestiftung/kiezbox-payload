export type CoverageMode = 'mesh' | 'publicWifi';

export type BoxRange = {
	lower: number;
	upper: number;
};

/** Range in km per coverage mode. */
export const MODE_RADIUS_KM: Record<CoverageMode, number> = {
	mesh: 1,
	publicWifi: 0.4,
};

/** Share of the ideal circle area (π × r²) that one box effectively covers. */
export const COVERAGE_FACTOR = 0.9;

/** Safety margin applied to the raw box count for the upper bound. */
export const UPPER_BOUND_FACTOR = 1.4;

export const MAX_AREA_KM2 = 100_000;

/**
 * Parses a user-entered area, accepting both "1,5" and "1.5".
 * Returns `null` for empty, non-numeric, non-positive or out-of-range input.
 */
export const parseArea = (input: string): number | null => {
	const normalized = input.trim().replace(',', '.');
	if (normalized === '') return null;

	const value = Number(normalized);
	if (!Number.isFinite(value) || value <= 0 || value > MAX_AREA_KM2)
		return null;

	return value;
};

export const calculateAreaPerBox = (mode: CoverageMode): number =>
	Math.PI * MODE_RADIUS_KM[mode] ** 2 * COVERAGE_FACTOR;

/** Estimated number of boxes needed to cover `areaKm2`, as a rounded-up range. */
export const calculateBoxRange = (
	areaKm2: number,
	mode: CoverageMode,
): BoxRange => {
	const raw = areaKm2 / calculateAreaPerBox(mode);

	return {
		lower: Math.ceil(raw),
		upper: Math.ceil(raw * UPPER_BOUND_FACTOR),
	};
};

/** Single rounded estimate: the middle of the range. */
export const estimateBoxCount = ({ lower, upper }: BoxRange): number =>
	Math.round((lower + upper) / 2);

export const formatBoxEstimate = (count: number): string => `~${count}`;

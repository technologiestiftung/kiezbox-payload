import { describe, expect, it } from 'vitest';

import {
	calculateAreaPerBox,
	calculateBoxRange,
	describeBoxRange,
	formatBoxRange,
	MAX_AREA_KM2,
	parseArea,
} from '@/blocks/Bedarfsrechner/calculate';

describe('parseArea', () => {
	it('accepts dot and comma decimals', () => {
		expect(parseArea('2.5')).toBe(2.5);
		expect(parseArea('2,5')).toBe(2.5);
		expect(parseArea(' 4 ')).toBe(4);
	});

	it.each(['', '  ', 'abc', '0', '-3', '1e999', String(MAX_AREA_KM2 + 1)])(
		'rejects %j',
		(input) => {
			expect(parseArea(input)).toBeNull();
		},
	);
});

describe('calculateAreaPerBox', () => {
	it('uses π × r² × 0.9', () => {
		expect(calculateAreaPerBox('mesh')).toBeCloseTo(Math.PI * 0.9, 6);
		expect(calculateAreaPerBox('publicWifi')).toBeCloseTo(
			Math.PI * 0.16 * 0.9,
			6,
		);
	});
});

describe('calculateBoxRange', () => {
	it('calculates mesh range', () => {
		// 5 / 2.827 = 1.77 → ceil 2; 1.77 × 1.4 = 2.48 → ceil 3
		expect(calculateBoxRange(5, 'mesh')).toEqual({ lower: 2, upper: 3 });
	});

	it('calculates public wifi range', () => {
		// 5 / 0.4524 = 11.05 → ceil 12; 11.05 × 1.4 = 15.47 → ceil 16
		expect(calculateBoxRange(5, 'publicWifi')).toEqual({
			lower: 12,
			upper: 16,
		});
	});

	it('returns at least one box for tiny areas', () => {
		expect(calculateBoxRange(0.01, 'mesh')).toEqual({ lower: 1, upper: 1 });
	});

	it('never returns lower above upper', () => {
		for (let area = 0.1; area <= 200; area += 0.37) {
			for (const mode of ['mesh', 'publicWifi'] as const) {
				const { lower, upper } = calculateBoxRange(area, mode);
				expect(lower).toBeLessThanOrEqual(upper);
			}
		}
	});
});

describe('formatBoxRange', () => {
	it('formats ranges with an en dash', () => {
		expect(formatBoxRange({ lower: 2, upper: 3 })).toBe('2–3');
	});

	it('collapses equal bounds to a single number', () => {
		expect(formatBoxRange({ lower: 1, upper: 1 })).toBe('1');
	});
});

describe('describeBoxRange', () => {
	it('spells out the range for screen readers', () => {
		expect(describeBoxRange({ lower: 4, upper: 6 })).toBe('4 bis 6');
	});

	it('collapses equal bounds to a single number', () => {
		expect(describeBoxRange({ lower: 1, upper: 1 })).toBe('1');
	});
});

'use client';

import { Check } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/utilities/ui';

import type { BedarfsrechnerBlock } from '@/payload-types';

import {
	calculateBoxRange,
	describeBoxRange,
	formatBoxRange,
	parseArea,
	type CoverageMode,
} from './calculate';
import { CoverageGraphic } from './CoverageGraphic';

type Props = Pick<
	BedarfsrechnerBlock,
	| 'areaLabel'
	| 'areaDescription'
	| 'modeLabel'
	| 'modeDescription'
	| 'meshLabel'
	| 'meshDescription'
	| 'publicWifiLabel'
	| 'publicWifiDescription'
	| 'resultUnit'
> & {
	disclaimer?: ReactNode;
};

const INITIAL_AREA = '5';
const EMPTY_RESULT = '–';

export const Bedarfsrechner = ({
	areaLabel,
	areaDescription,
	modeLabel,
	modeDescription,
	meshLabel,
	meshDescription,
	publicWifiLabel,
	publicWifiDescription,
	resultUnit,
	disclaimer,
}: Props) => {
	const id = useId();
	const areaId = `${id}-area`;
	const areaDescriptionId = `${id}-area-description`;
	const areaErrorId = `${id}-area-error`;
	const modeDescriptionId = `${id}-mode-description`;

	const [areaInput, setAreaInput] = useState(INITIAL_AREA);
	const [mode, setMode] = useState<CoverageMode>('mesh');

	const area = parseArea(areaInput);
	const hasError = areaInput.trim() !== '' && area === null;
	const range = area === null ? null : calculateBoxRange(area, mode);
	const result = range === null ? EMPTY_RESULT : formatBoxRange(range);

	const modes: {
		value: CoverageMode;
		label: string;
		description?: string | null;
	}[] = [
		{ value: 'mesh', label: meshLabel, description: meshDescription },
		{
			value: 'publicWifi',
			label: publicWifiLabel,
			description: publicWifiDescription,
		},
	];

	return (
		<div className="grid pt-8 gap-10 md:grid-cols-2 md:gap-16">
			<div className="space-y-8">
				<div className="space-y-2">
					<Label htmlFor={areaId} className="text-lg font-bold">
						{areaLabel}
					</Label>
					{areaDescription && (
						<p id={areaDescriptionId} className="text-muted-foreground">
							{areaDescription}
						</p>
					)}
					<Input
						id={areaId}
						type="text"
						inputMode="decimal"
						autoComplete="off"
						value={areaInput}
						onChange={(event) => setAreaInput(event.target.value)}
						aria-invalid={hasError}
						aria-describedby={
							cn(
								areaDescription && areaDescriptionId,
								hasError && areaErrorId,
							) || undefined
						}
						className="h-11"
					/>
					{hasError && (
						<p
							id={areaErrorId}
							role="alert"
							className="text-sm text-destructive"
						>
							Bitte geben Sie eine Zahl größer als 0 ein, zum Beispiel 2,5.
						</p>
					)}
				</div>

				<fieldset
					className="space-y-2"
					aria-describedby={modeDescription ? modeDescriptionId : undefined}
				>
					<legend className="text-lg font-bold">{modeLabel}</legend>
					{modeDescription && (
						<p id={modeDescriptionId} className="text-muted-foreground">
							{modeDescription}
						</p>
					)}
					<div className="grid gap-4 pt-2 sm:grid-cols-2">
						{modes.map((option) => (
							<label key={option.value} className="block cursor-pointer">
								<input
									type="radio"
									name={`${id}-mode`}
									value={option.value}
									checked={mode === option.value}
									onChange={() => setMode(option.value)}
									className="peer sr-only"
								/>
								<span
									className={cn(
										'block h-full rounded-md border-2 p-4 transition-colors',
										'relative border-dotted border-primary',
										'peer-checked:border-solid peer-checked:border-primary peer-checked:bg-accent/5',
										'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground',
									)}
								>
									<span className="block font-bold">{option.label}</span>
									{option.description && (
										<span className="block text-sm text-muted-foreground">
											{option.description}
										</span>
									)}
								</span>
							</label>
						))}
					</div>
				</fieldset>

				{disclaimer && (
					<div className="text-sm italic text-muted-foreground">
						{disclaimer}
					</div>
				)}
			</div>

			<div className="flex justify-center">
				<CoverageGraphic
					mode={mode}
					result={result}
					meshLabel={meshLabel}
					publicWifiLabel={publicWifiLabel}
				/>
				<p className="sr-only" role="status" aria-atomic="true">
					{range === null
						? ''
						: `${describeBoxRange(range)} ${resultUnit ?? ''}`.trim()}
				</p>
			</div>
		</div>
	);
};

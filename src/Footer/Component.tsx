import { getCachedGlobal } from '@/utilities/getGlobals';
import Link from 'next/link';
import NextImage from 'next/image';
import React from 'react';

import { ThemeSelector } from '@/providers/Theme/ThemeSelector';
import { CMSLink } from '@/components/Link';
import { Logo } from '@/components/Logo/Logo';

export async function Footer() {
	const footerData = await getCachedGlobal('footer', 1)();

	const navItems = footerData?.navItems || [];

	return (
		<footer className="mt-auto border-t-4 bg-muted/40 text-primary">
			{/* Main section: logo + tagline | nav columns */}
			<div className="container py-10 flex flex-col md:flex-row gap-10 md:justify-between">
				{/* Left: logo + tagline */}
				<div className="flex flex-col gap-4 max-w-md">
					<Link className="flex items-center" href="/">
						<Logo />
					</Link>
					<p className="text-sm text-muted-foreground">
						Zivilgesellschaftliche Infrastruktur für eine krisenfeste Zukunft.
						Zuverlässige Notfallmeldung ohne zentrales Stromnetz.
					</p>
				</div>

				{/* Right: nav columns (hardcoded — CMS fields werden später ergänzt) */}
				<div className="flex flex-col gap-6">
					{navItems.length > 0 && (
						<nav className="flex flex-row gap-12 md:flex-row">
							<div className="flex flex-col gap-3">
								<span className="text-xs font-semibold uppercase tracking-widest">
									Navigation
								</span>
								{navItems.map(({ link }, i) => {
									return (
										<CMSLink
											className="text-sm text-muted-foreground hover:text-foreground transition-colors"
											key={i}
											{...link}
										/>
									);
								})}
							</div>
						</nav>
					)}
				</div>
			</div>

			<div className="border-border">
				<div className="container pb-8">
					<div className="flex items-center gap-4 mb-6">
						<div className="flex items-center gap-4">
							<span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
								Gefördert durch
							</span>
						</div>
					</div>
					{/* Sponsor-Logos werden später via CMS eingebunden */}
					<div className="flex flex-wrap gap-8 items-start">
						<div className="flex flex-col items-start gap-2">
							<NextImage
								src="/logo/logo-tsb.png"
								alt="Technologiestiftung Berlin"
								width={200}
								height={80}
								className="max-h-16 w-auto object-contain"
							/>
							<span className="text-xs text-muted-foreground">
								Technologiestiftung Berlin
							</span>
						</div>
						<div className="flex flex-col items-start gap-2">
							<NextImage
								src="/logo/GDB-KFW-BWSB-SK-RGB.png"
								alt="Gemeinsam Digital Berlin · KfW · Senatskanzlei Berlin"
								width={640}
								height={120}
								className="max-h-16 w-auto object-contain"
							/>
							<span className="text-xs text-muted-foreground">
								Gemeinsam Digital Berlin · KfW · Senatskanzlei Berlin
							</span>
						</div>
					</div>
					<div className="mt-4">
						<span className="text-xs text-muted-foreground">
							Entstanden aus einem Modellprojekt Smart Cities (MPSC)
						</span>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-border">
				<div className="container py-4 flex flex-col sm:flex-row justify-between gap-2">
					<span className="text-xs text-muted-foreground">
						© 2026 Kiezbox Projekt. Lizenziert unter MIT License. Mehr Infos auf{' '}
						<Link
							className="underline hover:text-foreground transition-colors"
							href="https://github.com/technologiestiftung/kiezbox"
						>
							Github
						</Link>
					</span>
					<span className="text-xs text-muted-foreground">
						Hergestellt mit Zivilcourage und ♥ in Berlin.
					</span>
				</div>
			</div>
		</footer>
	);
}

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export function BaseLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col h-screen mx-auto">
			<Toaster position="bottom-center" gutter={8} />

			<nav className="border-b border-gray-200 py-5 relative z-20 bg-background shadow-[0_0_15px_0_rgb(0,0,0,0.1)]">
				<div className="flex items-center mx-auto lg:px-6 max-w-7xl px-14">
					<div className="flex flex-row items-center">
						<Link className="text-link hover:text-link-light transition-colors no-underline [&_code]:text-link [&_code]:hover:text-link-light [&_code]:transition-colors" href="/">
							<span>
								<img src="/logo.png" alt="Vercel Logo" className="h-14 w-auto" />
							</span>
						</Link>
						<ul className="flex items-center content-center">
							<li className="ml-2 text-gray-200">
								<svg
									viewBox="0 0 24 24"
									width={32}
									height={32}
									stroke="currentColor"
									strokeWidth={1}
									strokeLinecap="round"
									strokeLinejoin="round"
									fill="none"
									shapeRendering="geometricPrecision"
								>
									<path d="M16.88 3.549L7.12 20.451" />
								</svg>
							</li>
							<li className="font-medium" style={{ letterSpacing: '.01px' }}>
								<a
									className="text-link hover:text-link-light transition-colors no-underline [&_code]:text-link [&_code]:hover:text-link-light [&_code]:transition-colors text-accents-6 duration-200 hover:text-accents-8 cursor-pointer"
									target="_blank"
									rel="noreferrer"
									href="https://inteli-college.github.io/2024-2A-T08-EC07-G02/"
								>
									Presgen
								</a>
							</li>
						</ul>
					</div>
					<div className="flex-1 hidden md:flex text-lg font-semibold">
						<nav className="inline-flex flex-row items-center">
							<Link
								href="/dashboard"
								className="text-link hover:text-link-light transition-colors no-underline [&_code]:text-link [&_code]:hover:text-link-light [&_code]:transition-colors"
							>
								<span className="ml-3">Dashboard</span>
							</Link>
							<Link
								href="/predict"
								className="text-link hover:text-link-light transition-colors no-underline [&_code]:text-link [&_code]:hover:text-link-light [&_code]:transition-colors"
							>
								<span className="ml-3">Predict</span>
							</Link>
						</nav>
					</div>
					<div className="justify-end flex-1 hidden md:flex">
						<nav className="inline-flex flex-row items-center">
							<span className="flex items-center h-full ml-2 cursor-not-allowed text-accents-5">
								<img src="https://ui-avatars.com/api/?name=Vinicios+Lugli" alt="Vinicios Lugli" className="h-12 w-12 rounded-full" />
							</span>
						</nav>
					</div>
				</div>
			</nav>
			{children}
		</div>
	);
}

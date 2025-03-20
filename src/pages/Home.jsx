export default function Home() {
	return (
		<div className="w-full h-full absolute flex">
			{/* Background Blur */}
			<div className="fixed -z-10 top-0 left-1/2 -translate-x-1/3 -translate-y-1/2">
				<div className="bg-primary w-[1200px] h-[1000px] rounded-full blur-[200px] opacity-10" />
			</div>

			{/* Hero Content */}
			<div className="flex-1 flex items-center justify-center">
				{/* Left Column */}
				<div className="flex-1 flex justify-center items-center p-4">
					<h1 className="text-9xl font-bold text-center leading-none">
						WAVEFINDER
					</h1>
				</div>

				{/* Right Column */}
				<div className="flex-1 flex justify-center items-center p-4">
					<div className="text-center">
						<h1 className="text-4xl font-bold md:text-3xl sm:text-2xl">
							Ride the perfect radio wave.
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
}

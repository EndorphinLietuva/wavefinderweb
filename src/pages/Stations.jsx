import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";

export default function Stations() {
	const [stations, setStations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	// Fallback icon URL
	const fallbackIcon =
		"https://img.icons8.com/ios-filled/150/000000/radio.png";

	useEffect(() => {
		const fetchStations = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`/api/v1/stations?page=${currentPage}`
				);

				if (!response.ok) throw new Error("Failed to fetch stations");

				const data = await response.json();
				setStations(data.data);
				setTotalPages(Math.ceil(data.meta.total / data.meta.per_page));
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchStations();
	}, [currentPage]);

	// Handle page change
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// Loading state
	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<span className="loading loading-spinner text-primary loading-lg"></span>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="max-w-md mx-auto mt-8">
				<div className="alert alert-error shadow-lg">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 flex-shrink-0"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>Error: {error}</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-center mb-8">
				Radio Stations
			</h1>

			{/* Station Grid */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
				{stations.map((station) => (
					<Link
						key={station.station_uuid}
						to={`/stations/${station.station_uuid}`}
						className="card card-compact bg-base-100 shadow-md hover:shadow-lg transition-shadow">
						<figure className="px-4 pt-4 flex justify-center bg-base-200 h-40">
							<img
								src={station.favicon || fallbackIcon}
								alt={`${station.name} logo`}
								className="h-24 w-24 object-contain"
								onError={(e) => {
									if (e.target.src !== fallbackIcon) {
										e.target.src = fallbackIcon;
									}
								}}
							/>
						</figure>
						<div className="card-body items-center text-center">
							<h2 className="card-title text-sm font-medium line-clamp-2">
								{station.name}
							</h2>
							<div className="badge badge-sm">
								{station.country_code || "Unknown"}
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* Pagination Component */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}

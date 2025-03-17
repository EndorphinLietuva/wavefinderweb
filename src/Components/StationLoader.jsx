import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayStation from "../pages/PlayStation";

function StationLoader() {
	const [station, setStation] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { stationId } = useParams(); // This will be undefined for /random route

	useEffect(() => {
		const fetchStation = async () => {
			try {
				let url;

				if (stationId) {
					// Fetch specific station
					// cia tures buti atsiunciamas objektas o ne fetchinamas vel
					//url = `http://wavefinderapi.test/api/v1/stations/${stationId}`;
				} else {
					// Fetch random station
					url = "/api/v1/stations/random";
				}

				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("Failed to fetch station");
				}

				const responseData = await response.json();
				// Extract the actual station data from the wrapper object
				setStation(responseData.data || responseData);
			} catch (err) {
				console.error("Error fetching station:", err);
				setError("Failed to load station");
			} finally {
				setIsLoading(false);
			}
		};

		fetchStation();
	}, [stationId]);

	if (isLoading) {
		return (
			<div className="loading-container flex items-center justify-center h-screen">
				<div className="loading loading-spinner loading-xl"></div>
			</div>
		);
	}

	if (error) {
		return <div className="error-message">{error}</div>;
	}

	return <PlayStation radioStation={station} />;
}

export default StationLoader;

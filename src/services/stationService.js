export async function fetchRandomStation() {
	const response = await fetch("/api/v1/stations/random");

	if (!response.ok) {
		throw new Error("Failed to fetch random station");
	}

	const data = await response.json();
	return data.data;
}

export async function fetchStationById(stationId) {
	const response = await fetch(`/api/v1/stations/${stationId}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch station with ID: ${stationId}`);
	}

	const data = await response.json();
	return data.data;
}

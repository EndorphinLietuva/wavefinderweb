import { useContext, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";

import { AppContext } from "../context/AppContext";

export default function PlayStation() {
	const { radioStation } = useLoaderData();
	const { setCurrentStation } = useContext(AppContext);

	useEffect(() => {
		if (radioStation) {
			setCurrentStation(radioStation);
		}
	}, [radioStation, setCurrentStation]);

	if (!radioStation) {
		return <div>No station data available</div>;
	}

	return (
		<div className="p-4 pb-24">
			{" "}
			<h1 className="text-2xl font-bold mb-4">{radioStation.name}</h1>
			<div className="mb-6">
				<div className="mb-2">
					<span className="font-semibold">Station UUID:</span>
					<span className="ml-2 font-mono">
						{radioStation.station_uuid}
					</span>
				</div>

				<div className="mb-2">
					<span className="font-semibold">Stream URL:</span>
					<span className="ml-2">{radioStation.url}</span>
				</div>

				{radioStation.tags && (
					<div>
						<span className="font-semibold">Tags:</span>
						<span className="ml-2">{radioStation.tags}</span>
					</div>
				)}
			</div>
			<div>
				<Link to="/" className="btn btn-primary px-4 py-2 rounded">
					Back to All Stations
				</Link>
			</div>
		</div>
	);
}

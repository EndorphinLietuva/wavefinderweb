import { useEffect, useState } from "react";

export default function Home() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch("http://wavefinderapi.test/api/v1/stations/random")
			.then((response) => response.json())
			.then((data) => setData(data))
			.catch((error) => console.error("Error fetching data:", error));
	}, []);
	return (
		<>
			<h1>Test</h1>
			<pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
		</>
	);
}

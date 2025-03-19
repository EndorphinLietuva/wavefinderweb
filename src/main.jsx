import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Spinner from "./components/spinner.jsx";
import AppProvider from "./context/AppProvider.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import PlayStation from "./pages/PlayStation.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import {
	fetchRandomStation,
	fetchStationById
} from "./services/stationService.js";

// Loader for random station
async function randomStationLoader() {
	try {
		const radioStation = await fetchRandomStation();
		return { radioStation };
	} catch {
		throw new Response("Failed to load random station", { status: 500 });
	}
}

// Loader for specific station
async function stationLoader({ params }) {
	try {
		const radioStation = await fetchStationById(params.stationId);
		return { radioStation };
	} catch {
		throw new Response(`Failed to load station ID: ${params.stationId}`, {
			status: 404
		});
	}
}

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<AppProvider>
				<App />
			</AppProvider>
		),
		errorElement: <PageNotFound />,
		children: [
			{
				path: "/",
				element: <Layout />,
				children: [
					{
						index: true,
						element: <Home />
					},
					{ path: "login", element: <Login /> },
					{ path: "register", element: <Register /> },
					{
						path: "random",
						element: <PlayStation />,
						loader: randomStationLoader
					},
					{
						path: "station/:stationId",
						element: <PlayStation />,
						loader: stationLoader
					}
				]
			}
		]
	}
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} fallbackElement={<Spinner />} />
	</StrictMode>
);

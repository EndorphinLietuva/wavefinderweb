import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./pages/Auth/Register";
import Login from "./pages/auth/Login";
import StationLoader from "./components/StationLoader";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

export default function App() {
	const { user, isLoading } = useContext(AppContext);

	if (isLoading) {
		return (
			<div className="loading-container flex items-center justify-center h-screen">
				<div className="loading loading-spinner loading-xl"></div>
			</div>
		);
	}

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />

				{/* Auth routes */}
				{!user ? (
					<>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</>
				) : (
					// Redirect authenticated users away from auth routes
					["login", "register"].map((path) => (
						<Route
							key={path}
							path={path}
							element={<Navigate to="/" replace />}
						/>
					))
				)}

				{/* Station routes */}
				<Route path="random" element={<StationLoader />} />
				<Route path="station/:stationId" element={<StationLoader />} />

				{/* Catch-all route */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
}

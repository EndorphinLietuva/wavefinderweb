import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import "./App.css";
import Spinner from "./components/spinner";
import { AppContext } from "./context/AppContext";

// Protected route wrapper component
export const ProtectedRoute = () => {
	const { user, isLoading } = useContext(AppContext);

	if (isLoading) {
		return <Spinner />;
	}

	return user ? <Outlet /> : <Navigate to="/login" />;
};

// Auth route wrapper component (redirect if already logged in)
export const AuthRoute = () => {
	const { user, isLoading } = useContext(AppContext);

	if (isLoading) {
		return <Spinner />;
	}

	return user ? <Navigate to="/" /> : <Outlet />;
};

export default function App() {
	const { isLoading } = useContext(AppContext);

	if (isLoading) {
		return <Spinner />;
	}

	return <Outlet />;
}

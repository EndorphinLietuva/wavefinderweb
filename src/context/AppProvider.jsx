import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "./AppContext";

export default function AppProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();

	// RadioStation state
	const [isRadioPlayerBarVisible, setIsRadioPlayerBarVisible] = useState(
		() => {
			const saved = localStorage.getItem("isRadioPlayerBarVisible");
			return saved ? JSON.parse(saved) : false;
		}
	);

	const [currentStation, setCurrentStation] = useState(() => {
		const saved = localStorage.getItem("currentStation");
		return saved ? JSON.parse(saved) : null;
	});
	//----------------------------------------------

	// Persist state to localStorage
	useEffect(() => {
		localStorage.setItem(
			"isRadioPlayerBarVisible",
			JSON.stringify(isRadioPlayerBarVisible)
		);
	}, [isRadioPlayerBarVisible]);

	useEffect(() => {
		if (currentStation) {
			localStorage.setItem(
				"currentStation",
				JSON.stringify(currentStation)
			);
		} else {
			localStorage.removeItem("currentStation");
		}
	}, [currentStation]);
	//----------------------------------------------

	// User authentication
	useEffect(() => {
		async function getUser() {
			try {
				setIsLoading(true);
				if (!token) {
					setIsLoading(false);
					return;
				}

				const res = await fetch("/api/user/session", {
					headers: { Authorization: `Bearer ${token}` }
				});

				if (!res.ok) throw new Error("Auth failed");

				setUser(await res.json());
			} catch {
				localStorage.removeItem("token");
				setToken(null);
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		}

		getUser();
	}, [token]);

	// Helper functions for RadioPlayerBar
	const setStationAndShowPlayer = (station) => {
		setCurrentStation(station);
		if (station) {
			setIsRadioPlayerBarVisible(true);
		}
	};

	const clearRadioStation = () => {
		setCurrentStation(null);
		setIsRadioPlayerBarVisible(false);
		localStorage.removeItem("currentStation");
		localStorage.removeItem("isRadioPlayerBarVisible");
	};
	//----------------------------------------------

	const logout = async (e) => {
		e.preventDefault();
		const res = await fetch("/api/logout", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (res.ok) {
			setToken(null);
			setUser(null);
			localStorage.removeItem("token");
			navigate("/");
		}
	};

	const contextValue = {
		token,
		setToken,
		user,
		setUser,
		logout,
		isLoading,
		isRadioPlayerBarVisible,
		setIsRadioPlayerBarVisible,
		currentStation,
		setCurrentStation: setStationAndShowPlayer,
		clearRadioStation
	};

	return (
		<AppContext.Provider value={contextValue}>
			{children}
		</AppContext.Provider>
	);
}

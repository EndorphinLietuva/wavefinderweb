import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

export default function AppProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		async function getUser() {
			try {
				setIsLoading(true);
				if (!token) {
					setIsLoading(false);
					return;
				}

				const res = await fetch("/api/user", {
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

	return (
		<AppContext.Provider
			value={{ token, setToken, user, setUser, logout, isLoading }}>
			{children}
		</AppContext.Provider>
	);
}

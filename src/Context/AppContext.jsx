import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContext";

export default function AppProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function getUser() {
			const res = await fetch("api/user", {
				headers: {
					Authorization: `Bearer ${token}` // do not use double quotes here
				}
			});
			const data = await res.json();
			if (res.ok) {
				setUser(data);
			}
		}

		if (token) {
			getUser();
		}
	}, [token]); // runs every time token changes

	return (
		<AppContext.Provider value={{ token, setToken, user, setUser }}>
			{children}
		</AppContext.Provider>
	);
}

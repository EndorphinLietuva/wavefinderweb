import React, { useState, useEffect } from "react";

export default function Profile() {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getUserDetails() {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					setError("No token found. Please log in.");
					setIsLoading(false);
					return;
				}
				const response = await fetch("api/user/details", {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json"
					}
				});
				if (!response.ok) {
					throw new Error("Failed to fetch user details");
				}
				const data = await response.json();
				setUser(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		}

		getUserDetails();
	}, []);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="profile">
			<h1>Profile</h1>
			{user ? (
				<div>
					<p>
						<strong>ID: {user.id} </strong>
					</p>
					<p>
						<strong>Username:</strong> {user.username}
					</p>
					<p>
						<strong>Email:</strong> {user.email}
					</p>
					<p>
						<strong>Created At:</strong>{" "}
						{new Date(user.created_at).toLocaleString()}
					</p>
				</div>
			) : (
				<p>No user data available.</p>
			)}
		</div>
	);
}

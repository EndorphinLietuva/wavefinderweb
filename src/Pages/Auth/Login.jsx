import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {
	const navigate = useNavigate();
	const { setToken } = useContext(AppContext);
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	async function handleLogin(event) {
		event.preventDefault();
		setIsLoading(true);

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5000);

		try {
			const res = await fetch("api/login", {
				method: "POST",
				body: JSON.stringify(formData),
				signal: controller.signal
			});

			clearTimeout(timeoutId);

			const data = await res.json();
			if (data.errors) {
				setErrors(data.errors);
			} else {
				localStorage.setItem("token", data.token);
				setToken(data.token);
				navigate("/");
			}
		} catch (error) {
			if (error.name === "AbortError") {
				setErrors({
					general: ["Request timed out. Please try again."]
				});
			} else {
				setErrors({
					general: ["An unexpected error occurred. Please try again."]
				});
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center m-4 space-y-12">
				<h1 className="text-4xl font-bold">Login</h1>
				<form
					onSubmit={handleLogin}
					className="flex flex-col justify-center w-full max-w-md mx-auto space-y-6">
					<div>
						<label className="floating-label">
							<span>Email</span>
							<input
								name="email"
								type="email"
								className={
									errors.email
										? "input input-error w-full"
										: "input w-full"
								}
								placeholder="Email"
								value={formData.email}
								onChange={(e) =>
									setFormData({
										...formData,
										email: e.target.value
									})
								}
								disabled={isLoading}
							/>
						</label>
						{errors.email && (
							<p className="error text-error italic text-sm">
								{errors.email[0]}
							</p>
						)}
					</div>
					<div>
						<label className="floating-label">
							<span>Password</span>
							<input
								name="password"
								type="password"
								className={
									errors.password
										? "input input-error w-full"
										: "input w-full"
								}
								placeholder="Password"
								value={formData.password}
								onChange={(e) =>
									setFormData({
										...formData,
										password: e.target.value
									})
								}
								disabled={isLoading}
							/>
						</label>
						{errors.password && (
							<p className="error text-error italic text-sm">
								{errors.password[0]}
							</p>
						)}
					</div>

					<button
						className={`btn btn-primary w-1/2 mx-auto ${
							isLoading ? "btn-disabled" : ""
						}`}>
						{isLoading ? (
							<span className="loading loading-spinner" />
						) : (
							"Login"
						)}
					</button>
					{errors.general && (
						<p className="error text-error italic text-sm">
							{errors.general[0]}
						</p>
					)}
				</form>
			</div>
		</>
	);
}

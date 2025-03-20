import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Register() {
	const navigate = useNavigate();
	const { setToken } = useContext(AppContext);
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		password_confirmation: ""
	});

	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	async function handleRegister(event) {
		event.preventDefault();
		setIsLoading(true);

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5000);

		try {
			const res = await fetch("/api/register", {
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
				<h1 className="text-4xl font-bold">Register</h1>
				<form
					onSubmit={handleRegister}
					className="flex flex-col justify-center w-full max-w-md mx-auto space-y-6">
					<div>
						<label className="floating-label">
							<span>Username</span>
							<input
								name="username"
								type="text"
								className={
									errors.username
										? "input input-error w-full"
										: "input w-full"
								}
								placeholder="Username"
								value={formData.username}
								onChange={(e) =>
									setFormData({
										...formData,
										username: e.target.value
									})
								}
								disabled={isLoading}
							/>
						</label>

						{errors.username && (
							<p className="error text-error italic text-sm">
								{errors.username[0]}
							</p>
						)}
					</div>
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
					<div>
						<label className="floating-label">
							<span>Confirm Password</span>
							<input
								name="password-confirm"
								type="password"
								className={
									errors.password
										? "input input-error w-full"
										: "input w-full"
								}
								placeholder="Confirm Password"
								value={formData.password_confirmation}
								onChange={(e) =>
									setFormData({
										...formData,
										password_confirmation: e.target.value
									})
								}
								disabled={isLoading}
							/>
						</label>
					</div>

					<button
						className={`btn btn-primary w-1/2 mx-auto ${
							isLoading ? "btn-disabled" : ""
						}`}>
						{isLoading ? (
							<span className="loading loading-spinner" />
						) : (
							"Register"
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

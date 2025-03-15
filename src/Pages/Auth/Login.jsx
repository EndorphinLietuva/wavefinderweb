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

	async function handleLogin(e) {
		e.preventDefault();
		const res = await fetch("api/login", {
			method: "POST",
			body: JSON.stringify(formData)
		});

		const data = await res.json();
		if (data.errors) {
			setErrors(data.errors);
		} else {
			localStorage.setItem("token", data.token);
			setToken(data.token);
			navigate("/");
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
							/>
						</label>
						{errors.password && (
							<p className="error text-error italic text-sm">
								{errors.password[0]}
							</p>
						)}
					</div>

					<button className="btn btn-primary w-1/2 mx-auto">
						Login
					</button>
				</form>
			</div>
		</>
	);
}

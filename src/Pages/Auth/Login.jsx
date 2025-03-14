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
			<h1 className="title">Login</h1>

			<form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
				<div>
					<input
						type="text"
						className="input"
						placeholder="Email"
						value={formData.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
					/>
					{errors.email && <p className="error">{errors.email[0]}</p>}
				</div>
				<div>
					<input
						type="password"
						className="input"
						placeholder="Password"
						value={formData.password}
						onChange={(e) =>
							setFormData({
								...formData,
								password: e.target.value
							})
						}
					/>
					{errors.password && (
						<p className="error">{errors.password[0]}</p>
					)}
				</div>

				<button className="btn btn-primary">Login</button>
			</form>
		</>
	);
}

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
	const navigate = useNavigate();
	const { setToken } = useContext(AppContext);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: ""
	});

	const [errors, setErrors] = useState({});

	async function handleRegister(e) {
		e.preventDefault();
		const res = await fetch("api/register", {
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
			<h1 className="title">Register</h1>

			<form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
				<div>
					<input
						type="text"
						className="input"
						placeholder="Name"
						value={formData.name}
						onChange={(e) =>
							setFormData({ ...formData, name: e.target.value })
						}
					/>
					{errors.name && <p className="error">{errors.name[0]}</p>}
				</div>
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
				<div>
					<input
						type="password"
						className="input"
						placeholder="Confirm Password"
						value={formData.password_confirmation}
						onChange={(e) =>
							setFormData({
								...formData,
								password_confirmation: e.target.value
							})
						}
					/>
				</div>

				<button className="btn btn-primary">Register</button>
			</form>
		</>
	);
}

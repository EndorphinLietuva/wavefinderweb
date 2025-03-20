import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
			<p className="text-lg mb-6">
				Sorry, the page you are looking for does not exist.
			</p>
			<button onClick={goBack} className="btn btn-primary">
				Go Back
			</button>
		</div>
	);
}

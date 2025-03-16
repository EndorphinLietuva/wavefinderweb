import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Navbar from "../Components/Navbar";

export default function Layout() {
	return (
		<div className="flex flex-col h-screen">
			<header className="flex-none">
				<Navbar />
			</header>
			<main className="flex-grow relative overflow-hidden">
				<Outlet />
			</main>
		</div>
	);
}

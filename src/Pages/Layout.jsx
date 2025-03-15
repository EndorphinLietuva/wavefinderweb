import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Navbar from "../Components/Navbar";

export default function Layout() {
	return (
		<>
			<header>
				<Navbar />
			</header>

			<main>
				<Outlet />
			</main>
		</>
	);
}

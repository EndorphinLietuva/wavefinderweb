import { useContext } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import RadioPlayerBar from "../components/RadioPlayerBar";
import { AppContext } from "../context/AppContext";

export default function Layout() {
	const { isRadioPlayerBarVisible, currentStation } = useContext(AppContext);

	return (
		<>
			<header>
				<Navbar />
			</header>

			<main>
				<Outlet />
				{isRadioPlayerBarVisible && currentStation != null && (
					<div className="fixed bottom-0 w-full z-10">
						<RadioPlayerBar />
					</div>
				)}
			</main>
		</>
	);
}

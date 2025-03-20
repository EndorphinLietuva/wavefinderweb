import { useContext } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import RadioPlayerBar from "../components/RadioPlayerBar";
import { AppContext } from "../context/AppContext";

export default function Layout() {
	const { isRadioPlayerBarVisible, currentStation } = useContext(AppContext);

	return (
		<div className="flex flex-col h-screen">
			<header className="flex-none">
				<Navbar />
			</header>
			<main className="flex-grow relative overflow-hidden">
				<Outlet />
				{isRadioPlayerBarVisible && currentStation != null && (
					<div className="fixed bottom-0 w-full z-10">
						<RadioPlayerBar />
					</div>
				)}
			</main>
		</div>
	);
}

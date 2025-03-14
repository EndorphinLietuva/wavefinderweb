import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Layout() {
	const { user, token, setUser, setToken } = useContext(AppContext);
	const navigate = useNavigate();

	async function handleLougout(e) {
		e.preventDefault();
		const res = await fetch("api/logout", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (res.ok) {
			setToken(null);
			setUser(null);
			localStorage.removeItem("token");
			navigate("/login");
		}
	}
	return (
		<>
			<header>
				<nav>
					<h1>Wavefinder</h1>
					<Link to="/" className="nav-link">
						Home
					</Link>

					{user ? (
						<div>
							<div>{user.name}</div>
							<div>
								<form onSubmit={handleLougout}>
									<button className="btn btn-primary">
										Logout
									</button>
								</form>
							</div>
						</div>
					) : (
						<div>
							<Link to="/register" className="btn btn-primary">
								Register
							</Link>
							<Link to="/login" className="btn">
								Login
							</Link>
						</div>
					)}
				</nav>
			</header>

			<main>
				<Outlet />
			</main>
		</>
	);
}

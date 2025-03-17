import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
	const { user, logout } = useContext(AppContext);

	return (
		<div className="navbar bg-base-100 shadow-md px-4">
			<div className="navbar-start">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							{" "}
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>{" "}
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-md">
						<li>
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>

						<li>
							<Link>Browse</Link>
						</li>
						<li>
							<Link>Random Station</Link>
						</li>
						{/* <li>
							<Link>TBA</Link>
							<ul className="p-2">
								<li>
									<Link>Submenu 1</Link>
								</li>
								<li>
									<Link>Submenu 2</Link>
								</li>
							</ul>
						</li> */}
						<div className="divider m-0 p-0 sm:hidden" />
						{user ? (
							<>
								<li className="block sm:hidden">
									<Link className="font-bold">
										{user.username}
									</Link>
								</li>
								<form
									onSubmit={logout}
									className="block sm:hidden">
									<li>
										<button
											className="cursor-pointer w-full text-left"
											type="submit">
											Logout
										</button>
									</li>
								</form>
							</>
						) : (
							<>
								<li className="block sm:hidden">
									<Link to="/register">Register</Link>
								</li>
								<li className="block sm:hidden">
									<Link to="/login">Login</Link>
								</li>
							</>
						)}
					</ul>
				</div>
				<Link
					to="/"
					className="font-bold text-xl hover:text-2xl transition-all duration-50">
					Wavefinder
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li>
						<Link>Browse</Link>
					</li>
					<li>
						<Link to="random">Random Station</Link>
					</li>
					{/* <li>
						<details>
							<summary>TBA</summary>
							<ul className="p-2">
								<li>
									<Link>Submenu 1</Link>
								</li>
								<li>
									<Link>Submenu 2</Link>
								</li>
							</ul>
						</details>
					</li> */}
				</ul>
			</div>
			{user ? (
				<div className="navbar-end space-x-2 hidden sm:flex">
					<details
						className="dropdown dropdown-end"
						onMouseLeave={(e) => e.target.removeAttribute("open")}>
						<summary className="btn btn-ghost m-1">
							{user.username}
						</summary>
						<ul
							className="menu dropdown-content bg-base-100 rounded-box z-1 w-32 p-2 shadow-md"
							onMouseLeave={(e) =>
								e.target
									.closest("details")
									.removeAttribute("open")
							}>
							<li>
								<a>Profile</a>
							</li>
							<form onSubmit={logout}>
								<li>
									<button
										className="cursor-pointer w-full text-left no-hover"
										type="submit">
										Logout
									</button>
								</li>
							</form>
						</ul>
					</details>
				</div>
			) : (
				<div className="navbar-end space-x-2 hidden sm:flex">
					<Link to="/register" className="btn btn-soft btn-primary">
						Register
					</Link>
					<Link to="/login" className="btn btn-soft btn-primary">
						Login
					</Link>
				</div>
			)}
		</div>
	);
}

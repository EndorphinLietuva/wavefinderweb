import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <header>
                <nav>
                    <h1>Wavefinder</h1>
                    <Link to="/" className="nav-link">Home</Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}

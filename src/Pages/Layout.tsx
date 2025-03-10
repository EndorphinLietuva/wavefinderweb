import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <header>
                <nav>
                    <h1>Wavefinder</h1>
                    <Link to="/" className="nav-link">Home</Link>
                
                <div>
                    <Link to="/register" className="btn btn-primary">Register</Link>
                    <Link to="/login" className="btn">Login</Link>
                </div>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}

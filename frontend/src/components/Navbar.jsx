import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Check token on mount
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        // ✅ Clear token & user info
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-yellow-500">
            🍽️ Foodie
            </Link>

            {/* Links */}
            <div className="flex gap-6 items-center">
            <Link to="/" className="hover:text-yellow-500 transition">
                Home
            </Link>
            <Link to="/about" className="hover:text-yellow-500 transition">
                About
            </Link>
            <Link to="/menu" className="hover:text-yellow-500 transition">
                Menu
            </Link>
            <Link to="/bookings" className="hover:text-yellow-500 transition">
                Bookings
            </Link>

            {/* Auth Buttons */}
            {!isLoggedIn ? (
                <>
                <Link
                    to="/login"
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition"
                >
                    Register
                </Link>
                </>
            ) : (
                <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                Logout
                </button>
            )}
            </div>
        </div>
        </nav>
    );
}

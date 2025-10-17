import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Load token & user info
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (token && storedUser) {
        setIsLoggedIn(true);
        setUser(JSON.parse(storedUser));
        } else {
        setIsLoggedIn(false);
        setUser(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
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
            <Link to="/book-table" className="hover:text-yellow-500 transition">
                Book A Table
            </Link>

            {isLoggedIn && (
                <>
                <Link to="/my-bookings" className="hover:text-yellow-500 transition">
                    My Bookings
                </Link>
                <Link to="/profile" className="hover:text-yellow-500 transition">
                    Profile
                </Link>
                </>
            )}

            {/* ✅ Admin Dropdown */}
            {user?.role === "admin" && (
            <div className="relative group">
                <button className="hover:text-yellow-500 transition">
                Admin Panel ▾
                </button>

                {/* Use group-hover + pointer-events-auto + no gap */}
                <div
                className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                            bg-white text-black rounded-lg shadow-lg mt-2 right-0 w-44 z-50
                            transition-all duration-200"
                >
                <Link
                    to="/admin/users"
                    className="block px-4 py-2 hover:bg-gray-100"
                >
                    View Users
                </Link>
                <Link
                    to="/admin/bookings"
                    className="block px-4 py-2 hover:bg-gray-100"
                >
                    Manage Bookings
                </Link>
                <Link
                    to="/admin/menu"
                    className="block px-4 py-2 hover:bg-gray-100"
                >
                    Manage Menu
                </Link>
                </div>
            </div>
            )}

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

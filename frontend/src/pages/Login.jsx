import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) {
        newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
        newErrors.password = "Password is required.";
        } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess("");

        if (!validate()) return;

        try {
        const res = await api.post("/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setSuccess("Login successful!");
        setTimeout(() => navigate("/"), 1500);
        } catch (err) {
        console.error(err);
        setErrors({ api: err.response?.data?.message || "Invalid credentials" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navbar fixed at top */}
            <Navbar />

            {/* Login form centered below */}
            <div className="flex-grow flex justify-center items-center">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full border rounded-lg p-2 focus:outline-none ${
                            errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full border rounded-lg p-2 focus:outline-none ${
                            errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* API / Success messages */}
                    {errors.api && (
                    <p className="text-red-500 text-sm mt-2">{errors.api}</p>
                    )}
                    {success && (
                    <p className="text-green-600 text-sm mt-2">{success}</p>
                    )}

                    <button
                    type="submit"
                    className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                    Login
                    </button>
                </form>
                </div>
            </div>
        </div>
    );
}

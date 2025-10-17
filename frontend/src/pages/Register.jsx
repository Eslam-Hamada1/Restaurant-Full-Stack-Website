import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        // Name validation
        if (!form.name.trim()) {
        newErrors.name = "Name is required.";
        }

        // Email validation
        if (!form.email.trim()) {
        newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = "Please enter a valid email address.";
        }

        // Password validation
        if (!form.password) {
        newErrors.password = "Password is required.";
        } else if (form.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
        }

        // Confirm password validation
        if (form.password !== form.password_confirmation) {
        newErrors.password_confirmation = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess("");

        if (!validate()) return;

        try {
        const res = await api.post("/register", form);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setSuccess("Account created successfully!");

        // Redirect after short delay
        setTimeout(() => {
            navigate("/");
        }, 1500);
        } catch (err) {
        console.error(err);
        setErrors({ api: err.response?.data?.message || "Registration failed" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar fixed at top */}
        <Navbar />

        {/* Register form centered below */}
        <div className="flex-grow flex justify-center items-center">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

            <form onSubmit={handleRegister} className="space-y-4">
                {/* Name */}
                <div>
                <label className="block mb-1 text-sm font-medium">Name</label>
                <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2 focus:outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
                </div>

                {/* Email */}
                <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
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
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2 focus:outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                </div>

                {/* Confirm Password */}
                <div>
                <label className="block mb-1 text-sm font-medium">
                    Confirm Password
                </label>
                <input
                    name="password_confirmation"
                    type="password"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2 focus:outline-none ${
                    errors.password_confirmation
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                />
                {errors.password_confirmation && (
                    <p className="text-red-500 text-sm mt-1">
                    {errors.password_confirmation}
                    </p>
                )}
                </div>

                {/* API or Success Messages */}
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
                Register
                </button>
            </form>
            </div>
        </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyBookings() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ✅ Fetch bookings on mount
    useEffect(() => {
        if (!token) {
        navigate("/login");
        return;
        }

        const fetchBookings = async () => {
        try {
            const res = await api.get("/my-bookings", {
            headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch bookings. Please try again later.");
        } finally {
            setLoading(false);
        }
        };

        fetchBookings();
    }, [token, navigate]);

    const getStatusColor = (status) => {
        switch (status) {
        case "accepted":
            return "text-green-600 bg-green-100";
        case "rejected":
            return "text-red-600 bg-red-100";
        default:
            return "text-yellow-600 bg-yellow-100";
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex-grow container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>

            {loading ? (
            <p className="text-center text-gray-500">Loading bookings...</p>
            ) : error ? (
            <p className="text-center text-red-500">{error}</p>
            ) : bookings.length === 0 ? (
            <p className="text-center text-gray-600">You have no bookings yet.</p>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((b) => (
                <div
                    key={b.id}
                    className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                    <h3 className="text-lg font-semibold mb-2">{b.name}</h3>
                    <p className="text-gray-600 text-sm">
                    <strong>Email:</strong> {b.email}
                    </p>
                    <p className="text-gray-600 text-sm">
                    <strong>Party Size:</strong> {b.party_size}
                    </p>
                    <p className="text-gray-600 text-sm">
                    <strong>Date:</strong>{" "}
                    {new Date(b.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm">
                    <strong>Time:</strong> {b.time}
                    </p>
                    <p
                    className={`mt-3 text-sm font-semibold px-3 py-1 inline-block rounded-full ${getStatusColor(
                        b.status
                    )}`}
                    >
                    {b.status ? b.status.toUpperCase() : "PENDING"}
                    </p>
                </div>
                ))}
            </div>
            )}
        </main>

        <Footer />
        </div>
    );
}

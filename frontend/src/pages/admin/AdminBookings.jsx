// src/pages/admin/AdminBookings.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AdminBookings() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!token || user?.role !== "admin") {
        navigate("/");
        return;
        }
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
        const res = await api.get("/admin/bookings", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        try {
        await api.post(`/admin/bookings/${id}/${action}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchBookings();
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6 text-yellow-700">Manage Bookings</h1>
            {loading ? (
            <p>Loading bookings...</p>
            ) : bookings.length === 0 ? (
            <p>No bookings found.</p>
            ) : (
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-yellow-500 text-white">
                <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Party Size</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((b) => (
                    <tr key={b.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{b.name}</td>
                    <td className="p-3">{b.email}</td>
                    <td className="p-3">{b.party_size}</td>
                    <td className="p-3">{b.date}</td>
                    <td className="p-3">{b.time}</td>
                    <td className="p-3 font-medium">
                        {b.status === "accepted" ? (
                        <span className="text-green-600">Accepted</span>
                        ) : b.status === "rejected" ? (
                        <span className="text-red-600">Rejected</span>
                        ) : (
                        <span className="text-yellow-600">Pending</span>
                        )}
                    </td>
                    <td className="p-3 text-center">
                        {b.status === "pending" && (
                        <div className="flex justify-center gap-2">
                            <button
                            onClick={() => handleAction(b.id, "accept")}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                            >
                            Accept
                            </button>
                            <button
                            onClick={() => handleAction(b.id, "reject")}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                            >
                            Reject
                            </button>
                        </div>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </main>
        <Footer />
        </div>
    );
}

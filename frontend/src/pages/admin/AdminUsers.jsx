// src/pages/admin/AdminUsers.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AdminUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (!token || user?.role !== "admin") {
        navigate("/");
        return;
        }

        api
        .get("/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUsers(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6 text-yellow-700">All Users</h1>
            {loading ? (
            <p>Loading users...</p>
            ) : users.length === 0 ? (
            <p>No users found.</p>
            ) : (
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-yellow-500 text-white">
                <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => (
                    <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{u.id}</td>
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 font-medium">
                        {u.role === "admin" ? (
                        <span className="text-green-600">Admin</span>
                        ) : (
                        <span className="text-gray-600">User</span>
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

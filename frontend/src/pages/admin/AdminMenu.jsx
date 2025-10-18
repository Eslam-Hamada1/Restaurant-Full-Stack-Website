import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AdminMenu() {
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", price: "", image_url: "" });
    const [editing, setEditing] = useState(null);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!token || user?.role !== "admin") {
            navigate("/");
            return;
        }

        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const res = await api.get("/admin/menu", { headers: { Authorization: `Bearer ${token}` } });
        setMenu(res.data);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await api.put(`/admin/menu/${editing}`, form, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                await api.post("/admin/menu", form, { headers: { Authorization: `Bearer ${token}` } });
            }
            setForm({ title: "", description: "", price: "", image_url: "" });
            setEditing(null);
            fetchMenu();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        await api.delete(`/admin/menu/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        fetchMenu();
    };

    const startEdit = (item) => {
        setEditing(item.id);
        setForm(item);
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col overflow-x-hidden">
            <Navbar/>
            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-6 text-yellow-700">Manage Menu</h1>

                {/* Add, Edit form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded-lg" required />
                        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded-lg" required />
                    </div>

                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full rounded-lg" required />
                    
                    <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" className="border p-2 w-full rounded-lg" required />
                    
                    <button type="submit" className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600">{editing ? "Update Item" : "Add Item"}</button>
                </form>

                {/* Menu Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden text-sm sm:text-base">
                        <thead className="bg-yellow-500 text-white">
                            <tr>
                                <th className="p-3 text-left">Image</th>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Price</th>
                                <th className="p-3 text-left">Description</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {menu.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3"><img src={item.image_url} alt={item.title} className="w-16 h-16 rounded-lg object-cover" /></td>
                                    <td className="p-3">{item.title}</td>
                                    <td className="p-3">${item.price}</td>
                                    <td className="p-3">{item.description}</td>
                                    <td className="p-3 text-center">
                                        <button onClick={() => startEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 mr-2">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

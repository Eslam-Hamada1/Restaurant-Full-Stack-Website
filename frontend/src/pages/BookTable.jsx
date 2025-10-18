import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BookTable() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        party_size: "",
        date: "",
        time: "",
    });
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState({});

    // check logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await api.get("/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setForm((prev) => ({
                    ...prev,
                    name: res.data.name || "",
                    email: res.data.email || "",
                }));
            } catch (err) {
                console.error(err);
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess("");

        try {
            const token = localStorage.getItem("token");
            const res = await api.post("/bookings", form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess("Booking submitted successfully!");
            console.log(res.data);
        } catch (err) {
            console.error(err);
            setErrors({
                api:
                err.response?.data?.message ||
                "Booking failed, please try again.",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100" style={{ backgroundImage: "url('https://elladiningroomandbar.com/wp-content/uploads/2018/10/chefs-table-1920-1080.jpg')",backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
            <Navbar/>
            <div className="flex justify-center mt-8">
                <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Book a Table</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Name</label>
                            <input name="name" type="text" value={form.name} onChange={handleChange} className="w-full border rounded-lg p-2 focus:outline-none border-gray-300"/>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Email</label>
                            <input name="email" type="email" value={form.email} readOnly className="w-full border rounded-lg p-2 focus:outline-none border-gray-300 bg-gray-100 cursor-not-allowed"/>
                        </div>

                        {/* Party */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Party Size</label>
                            <input name="party_size" type="number" value={form.party_size} onChange={handleChange} className="w-full border rounded-lg p-2 focus:outline-none border-gray-300"/>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Date</label>
                            <input name="date" type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={handleChange} className="w-full border rounded-lg p-2 focus:outline-none border-gray-300"/>
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Time</label>
                            <input name="time" type="time" value={form.time} onChange={handleChange} className="w-full border rounded-lg p-2 focus:outline-none border-gray-300"/>
                        </div>

                        {errors.api && (
                            <p className="text-red-500 text-sm mt-2">{errors.api}</p>
                        )}
                        {success && (
                            <p className="text-green-600 text-sm mt-2">{success}</p>
                        )}

                        <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">Submit Booking</button>
                    </form>
                </div>
            </div>
            <div style={{marginBottom:'3rem'}}></div>
            <Footer/>
        </div>
    );
}

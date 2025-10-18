import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [user, setUser] = useState(null);
    const [editingField, setEditingField] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        old_password: "",
        password: "",
        password_confirmation: "",
    });
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const cachedUser = localStorage.getItem("user");
        if (cachedUser) {
            const parsedUser = JSON.parse(cachedUser);
            setUser(parsedUser);
            setForm((prev) => ({
                ...prev,
                name: parsedUser.name || "",
                email: parsedUser.email || "",
                phone: parsedUser.phone || "",
            }));
            setLoading(false);
        }

        const fetchUser = async () => {
            try {
                const res = await api.get("/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
            } catch (err) {
                console.error(err);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [token, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (field) => {
        setMessage({ type: "", text: "" });

        const data = { [field]: form[field] };
        if (field === "password") {
            data.old_password = form.old_password;
            data.password_confirmation = form.password_confirmation;
        }

        try {
            const res = await api.put("/user/update", data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setEditingField("");
            setMessage({ type: "success", text: "Updated successfully!" });
            setForm((prev) => ({
                ...prev,
                old_password: "",
                password: "",
                password_confirmation: "",
            }));
        } catch (err) {
            console.error(err);
            setMessage({
                type: "error",
                text: err.response?.data?.message || "Update failed",
            });
        }
    };

    if (loading)
        return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar/>
            <div className="flex-grow flex justify-center items-center">
                <p className="text-lg text-gray-600">Loading profile...</p>
            </div>
            <Footer/>
        </div>
        );

    if (!user) return null;

    return (
        <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://wallpapers.com/images/hd/food-4k-1pf6px6ryqfjtnyr.jpg')"}}>
        <Navbar/>
        <main className="flex-grow flex justify-center items-start pt-20">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>

                {message.text && (
                    <p className={`text-center mb-4 ${message.type === "success" ? "text-green-600" : "text-red-500"}`}>{message.text}</p>
                )}

                <div className="space-y-4">
                    <EditableField label="Name" field="name" form={form} user={user} editingField={editingField} setEditingField={setEditingField} handleChange={handleChange} handleUpdate={handleUpdate}/>
                    <EditableField label="Phone" field="phone" form={form} user={user} editingField={editingField} setEditingField={setEditingField} handleChange={handleChange} handleUpdate={handleUpdate}/>
                    <PasswordField form={form} editingField={editingField} setEditingField={setEditingField} handleChange={handleChange} handleUpdate={handleUpdate}/>
                </div>
            </div>
        </main>
        <Footer/>
        </div>
    );
}

    // 🔸 EditableField component
    function EditableField({
    label,
    field,
    form,
    user,
    editingField,
    setEditingField,
    handleChange,
    handleUpdate,
    }) {
    return (
        <div>
        <label className="block font-medium mb-1">{label}</label>
        {editingField === field ? (
            <div className="flex gap-2">
            <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="flex-1 border rounded-lg p-2"
            />
            <button
                onClick={() => handleUpdate(field)}
                className="bg-yellow-500 text-white px-4 rounded-lg hover:bg-yellow-600"
            >
                Save
            </button>
            </div>
        ) : (
            <div className="flex justify-between items-center">
            <span>{user[field] || "Not set"}</span>
            <button
                onClick={() => setEditingField(field)}
                className="text-yellow-600 hover:underline"
            >
                Edit
            </button>
            </div>
        )}
        </div>
    );
}

    // 🔸 PasswordField component with OLD password
function PasswordField({ form, editingField, setEditingField, handleChange, handleUpdate}) {
    return (
        <div>
            <label className="block font-medium mb-1">Password</label>
            {editingField === "password" ? (
                <div className="flex flex-col gap-2">
                    <input type="password" name="old_password" value={form.old_password} onChange={handleChange} placeholder="Current password" className="border rounded-lg p-2"/>
                    <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="New password" className="border rounded-lg p-2"/>
                    <input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} placeholder="Confirm new password" className="border rounded-lg p-2"/>
                    <button onClick={() => handleUpdate("password")} className="bg-yellow-500 text-white py-1 rounded-lg hover:bg-yellow-600">Save</button>
                </div>
            ) : (
                <div className="flex justify-between items-center">
                    <span>••••••••</span>
                    <button onClick={() => setEditingField("password")} className="text-yellow-600 hover:underline" >Change</button>
                </div>
            )}
        </div>
    );
}

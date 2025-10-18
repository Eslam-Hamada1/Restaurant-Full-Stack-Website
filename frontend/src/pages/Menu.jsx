import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Menu() {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        axios
        .get("/menu")
        .then((res) => {
            if (mounted) setMenu(res.data);
        })
        .catch((err) => console.error(err))
        .finally(() => {
            if (mounted) setLoading(false);
        });
        return () => (mounted = false);
    }, []);

    function MenuCard({ item }) {
        return (
            <div className="bg-white shadow rounded-lg overflow-hidden hover:scale-105 transition">
                <img src={item.image_url || "/placeholder.jpg"} alt={item.title} className="w-full h-48 object-cover"/>
                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <span className="text-yellow-600 font-bold">${item.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar/>
            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-6">Our Menu</h1>

                {loading ? (
                    <p>Loading menu...</p>
                ) : menu.length === 0 ? (
                    <p>No menu items found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {menu.map((item) => (
                            <MenuCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </main>
            <Footer/>
        </div>
    );
}

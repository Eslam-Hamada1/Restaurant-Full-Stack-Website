import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axiosClient from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axiosClient.get("/menu").then((res) => setMenu(res.data));
    }, []);

    return (
        <div>
            <Navbar/>

            <section className="h-screen flex flex-col justify-center items-center bg-cover bg-center text-center" style={{ backgroundImage: "need to get image" }}>
                <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-6">Delicious Food for Every Mood</h1>
                <p className="text-white text-lg mb-8 max-w-lg">Enjoy a fine dining experience with fresh ingredients and creative flavors.</p>
                <Link to="/menu" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full">Explore Menu</Link>
            </section>

            <section className="py-20 bg-gray-50" id="menu">
                <h2 className="text-4xl font-bold text-center mb-12">Our Popular Menu</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-10">
                    {menu.map((item) => (
                    <div key={item.id} className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition">
                        <img src={item.image_url || "/placeholder.jpg"} alt={item.title} className="h-56 w-full object-cover"/>
                        <div className="p-5">
                            <h3 className="font-semibold text-xl">{item.title}</h3>
                            <p className="text-gray-600 text-sm my-2">{item.description}</p>
                            <p className="font-bold text-orange-500 text-lg">${item.price}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </section>

            <section className="bg-orange-500 py-16 text-center text-white">
                <h2 className="text-4xl font-bold mb-4">Want to reserve your table?</h2>
                <p className="mb-6">Book online and enjoy a great meal without the wait!</p>
                <Link to="/booking" className="bg-white text-orange-600 px-6 py-3 font-semibold rounded-full hover:bg-gray-100">
                    Book Now
                </Link>
            </section>

            <Footer/>
        </div>
    );
}

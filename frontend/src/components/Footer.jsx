import { useEffect, useState } from "react";

export default function Footer() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(storedUser));
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    }, []);

    return (
        <footer className="bg-gray-900 text-gray-300 py-8 px-6">
            <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
                <div>
                    <h2 className="text-2xl font-bold text-yellow-500 mb-3">🍽️ Foodie </h2>
                    <p className="text-sm mb-4">In the new era of taste and technology, we look to the future with creativity and pride in every dish we serve.</p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">Pages</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-yellow-500">Home</a></li>
                        <li><a href="/about" className="hover:text-yellow-500">About</a></li>
                        <li><a href="/menu" className="hover:text-yellow-500">Menu</a></li>
                        {isLoggedIn && (
                        <>
                            <li><a href="/bookings" className="hover:text-yellow-500">Book a Table</a></li>
                            <li><a href="/my-bookings" className="hover:text-yellow-500">Bookings</a></li>
                            <li><a href="/profile" className="hover:text-yellow-500">Profile</a></li>
                        </>
                    )}

                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">Menu Highlights</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <img src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyZ2hlcml0YSUyMHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600" className="rounded-lg w-full h-24 object-cover"/>
                        <img src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=400&q=80" className="rounded-lg w-full h-24 object-cover"/>
                        <img src="https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2VzYXIlMjBzYWxhZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600" className="rounded-lg w-full h-24 object-cover"/>
                        <img src="https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZWQlMjBjaGlja2VufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600" className="rounded-lg w-full h-24 object-cover"/>
                    </div>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="text-center text-sm text-gray-500 border-t border-gray-700 mt-10 pt-6">
                © {new Date().getFullYear()} Foodie Restaurant. All Rights Reserved.
            </div>
        </footer>
    );
}

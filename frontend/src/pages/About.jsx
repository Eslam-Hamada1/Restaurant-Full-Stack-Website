import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <section className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1950&q=80')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <h1 className="relative text-white text-5xl font-bold z-10">About Us</h1>
        </section>

        <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 space-y-8 md:space-y-0 md:space-x-12">
            <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80" alt="Restaurant Interior" className="w-full md:w-1/2 rounded-2xl shadow-lg"/>
            <div className="md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
                <p className="text-gray-600 leading-relaxed">
                    Welcome to <span className="font-semibold text-yellow-600">Delish Dine</span> — where passion for food meets creativity.
                    Established in 2020, our mission has always been to serve dishes made from the freshest
                    ingredients, crafted with love and care by our talented chefs.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    From cozy family dinners to vibrant celebrations, we create moments of joy through delicious flavors.
                    Every plate tells a story, and we’re thrilled to share ours with you.
                </p>
            </div>
        </section>

        <section className="bg-yellow-50 py-16 px-8 md:px-20">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                <p className="text-gray-600 mt-2">
                    Great food, great people, great experiences — that’s what we believe in.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold text-yellow-600 mb-2">Fresh Ingredients</h3>
                    <p className="text-gray-600 text-sm">
                    We source only the freshest ingredients from local farms to bring you authentic, flavorful meals.
                    </p>
                </div>
                
                <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold text-yellow-600 mb-2">Exceptional Quality</h3>
                    <p className="text-gray-600 text-sm">
                    Every dish is prepared with care and creativity to deliver the perfect balance of taste and presentation.
                    </p>
                </div>
                
                <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold text-yellow-600 mb-2">Warm Hospitality</h3>
                    <p className="text-gray-600 text-sm">
                    We strive to make every visit a memorable one with our friendly staff and cozy atmosphere.
                    </p>
                </div>
            </div>
        </section>

        <section className="py-16 px-8 md:px-20 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-10">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {[
                    { name: "Antonio De Natali", role: "Head Chef", img: "https://randomuser.me/api/portraits/men/32.jpg" },
                    { name: "Maria Gomez", role: "Pastry Specialist", img: "https://randomuser.me/api/portraits/women/44.jpg" },
                    { name: "Liam Smith", role: "Restaurant Manager", img: "https://randomuser.me/api/portraits/men/45.jpg" },
                ].map((member, index) => (
                    <div key={index} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                        <img src={member.img} alt={member.name} className="w-32 h-32 mx-auto rounded-full mb-4 object-cover" />
                        <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                        <p className="text-gray-500 text-sm">{member.role}</p>
                    </div>
                ))}
            </div>
        </section>

        <Footer />
        </div>
    );
}

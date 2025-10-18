import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function VerifySuccess() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const status = params.get("status");

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar/>
            <div className="flex-grow flex justify-center items-center">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                    {status === "success" && (
                        <h2 className="text-green-600 text-xl font-semibold"> Your email has been verified! You can now log in.</h2>
                    )}
                    {status === "already-verified" && (
                        <h2 className="text-yellow-600 text-xl font-semibold">Your email is already verified.</h2>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

// import Menu from "./pages/Menu";
// import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/menu" element={<Menu />} />
        <Route path="/booking" element={<Booking />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/admin" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

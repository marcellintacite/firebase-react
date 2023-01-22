import "font-awesome/css/font-awesome.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import UserInfo from "./pages/UserInfo";
import "react-toastify/dist/ReactToastify.css";
import Signout from "./pages/Signout";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inscription" element={<SignUp />} />
        <Route path="/confirmation" element={<UserInfo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deconnexion" element={<Signout />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

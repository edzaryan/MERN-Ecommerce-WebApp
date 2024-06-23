import React, { useContext, useState } from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigation = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);


    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigation("/");
            fetchUserDetails();
            fetchUserAddToCart();
        }

        if (dataApi.error) {
            toast.error(dataApi.message);
        }
    };

    return (
        <section id="login">
            <div className="mx-auto container p-4">
                <div className="bg-white p-5 w-full max-w-sm mx-auto">
                    <div className="w-20 h-20 mx-auto">
                        <img src={loginIcons} alt="login icons" />
                    </div>

                    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
                        <div className="grid">
                            <label>Email</label>
                            <div className="bg-slate-100 p-2">
                                <input 
                                    type="email" 
                                    name="email"
                                    onChange={handleChange}
                                    value={data.email}
                                    placeholder="Enter email" 
                                    className="w-full h-full outline-none bg-transparent" 
                                />
                            </div>
                        </div>
                        <div className="grid">
                            <label>Password</label>
                            <div className="bg-slate-100 p-2 flex">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password"
                                    onChange={handleChange}
                                    value={data.password}
                                    placeholder="Enter password" 
                                    className="w-full h-full outline-none bg-transparent" 
                                />
                                <div className="cursor-pointer text-xl" onClick={() => setShowPassword(!showPassword)}>
                                    <span>
                                        {showPassword ? <FaEye /> : <IoMdEyeOff />}
                                    </span>
                                </div>
                            </div>
                            <Link to="/forgot-password" className="block w-fit ml-auto hover:underline hover:text-red-600">Forgot password?</Link>
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6">Login</button>
                    </form>

                    <p className="my-5">Don't have an account? <Link to="/signup" className="text-red-600 hover:text-red-700 hover:underline">Sign up</Link></p>
                </div>
            </div>
        </section>
    );
};

export default Login;

import React, { useState } from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import imageToBase64 from "../helpers/imageToBase64";
import { toast } from "react-toastify";


export const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePicture: ""
    });
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password === data.confirmPassword) {

            const response = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (result.success) {
                toast.success(result.message);
                navigate("/login");
            }
            
            if (result.error) {
                toast.error(result.message);
            }
        } else {
            toast.error("Please check password and confirm password");
        }
    };

    const handleUploadPicture = async (e) => {
        const file = e.target.files[0];

        const profilePicture = await imageToBase64(file);

        setData(prev => ({ 
            ...prev,
            profilePicture
        }));
    };

    return (
        <section id="login">
            <div className="mx-auto container p-4">
                <div className="bg-white p-5 w-full max-w-sm mx-auto">
                    <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
                        <div>
                            <img src={data.profilePicture || loginIcons} alt="login icons" />
                        </div>
                        <form>
                            <label>
                                <div className="text-xs bg-opacity-80 bg-slate-200 py-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                                    Upload Photo
                                </div>
                                <div>
                                    <input type="file" className="hidden" onChange={handleUploadPicture} />
                                </div>
                            </label>
                        </form>
                    </div>
                    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
                        <div className="grid">
                            <label>Name</label>
                            <div className="bg-slate-100 p-2">
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    onChange={handleChange}
                                    value={data.name}
                                    placeholder="Enter name" 
                                    className="w-full h-full outline-none bg-transparent" 
                                />
                            </div>
                        </div>
                        <div className="grid">
                            <label>Email</label>
                            <div className="bg-slate-100 p-2">
                                <input 
                                    type="email" 
                                    name="email"
                                    required
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
                                    required
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
                        </div>
                        <div className="grid">
                            <label>Retype Password</label>
                            <div className="bg-slate-100 p-2 flex">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="confirmPassword"
                                    required
                                    onChange={handleChange}
                                    value={data.confirmPassword}
                                    placeholder="Enter confirm password" 
                                    className="w-full h-full outline-none bg-transparent" 
                                />
                                <div className="cursor-pointer text-xl" onClick={() => setShowPassword(!showPassword)}>
                                    <span>
                                        {showPassword ? <FaEye /> : <IoMdEyeOff />}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6">
                            Sign Up
                        </button>
                    </form>

                    <p className="my-5">
                        Already have an account? <Link to="/login" className="text-red-600 hover:text-red-700 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </section>
    )
};

export default SignUp;

import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col">
            <Navbar />
            <div className='flex items-center justify-center min-h-screen py-12'>
                <form onSubmit={submitHandler} className='bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md'>
                    <h1 className='text-3xl font-semibold text-white mb-6 text-center'>Sign Up</h1>
                    <div className='mb-4'>
                        <Label className="text-gray-300">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                            className="bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div className='mb-4'>
                        <Label className="text-gray-300">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="example@gmail.com"
                            className="bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div className='mb-4'>
                        <Label className="text-gray-300">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="0123456789"
                            className="bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div className='mb-4'>
                        <Label className="text-gray-300">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                            className="bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div className='mb-6'>
                        <RadioGroup className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer bg-gray-700"
                                />
                                <Label htmlFor="r1" className="text-gray-300">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer bg-gray-700"
                                />
                                <Label htmlFor="r2" className="text-gray-300">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className='flex items-center gap-2 mb-6'>
                        <Label className="text-gray-300">Profile Picture</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="bg-gray-700 text-white cursor-pointer"
                        />
                    </div>
                    {
                        loading ? (
                            <Button className="w-full mb-4 bg-gray-700 text-gray-300 flex items-center justify-center">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white">
                                Signup
                            </Button>
                        )
                    }
                    <div className='text-center text-gray-400'>
                        Already have an account? <Link to="/login" className='text-blue-400 hover:underline'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;

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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
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
                    <h1 className='text-3xl font-semibold text-white mb-6 text-center'>Login</h1>
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
                    {
                        loading ? (
                            <Button className="w-full mb-4 bg-gray-700 text-gray-300 flex items-center justify-center">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white">
                                Login
                            </Button>
                        )
                    }
                    <div className='text-center text-gray-400'>
                        Don't have an account? <Link to="/signup" className='text-blue-400 hover:underline'>Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

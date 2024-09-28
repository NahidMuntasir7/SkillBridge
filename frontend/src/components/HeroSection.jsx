import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <div className="relative flex items-center justify-start h-screen px-10 lg:px-20 border-b-0"
            style={{
                background: 'radial-gradient(circle at center, #1a0a45 30%, #000000 70%)', // Dark violet center with black edges
                transition: 'background 1s ease-in-out'
            }}>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#1a0a45]"></div>

            <div className="relative z-10 max-w-xl text-left" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                <h1 className="text-6xl font-extrabold leading-tight text-white bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#00A3E0] to-[#90E0EF]">
                    Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A3E0] to-[#90E0EF]">Next Opportunity</span> Today
                </h1>
                <p className="mt-4 text-lg font-bold text-white">
                    Discover incredible job opportunities, connect with top employers and accelerate your career journey with us.
                </p>
                <div className="mt-8 flex w-full shadow-lg rounded-full overflow-hidden bg-white items-center">
                    <input
                        type="text"
                        placeholder="Search for jobs, companies and more..."
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-grow px-4 py-3 text-lg text-[#091f36] placeholder-[#6b7280] outline-none focus:ring-0"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="flex items-center justify-center px-4 py-6 bg-gradient-to-r from-[#0f2862] to-[#4f5f76] text-white font-bold transition-transform transform hover:scale-105 rounded-r-full"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;

import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='relative min-h-screen py-20 border-t border-white border-opacity-20'
            style={{
                background: 'linear-gradient(135deg, #2c3e50, #000000)', // Cool black gradient background
                transition: 'background 1s ease-in-out'
            }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#000000] to-[#2c3e50]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <div className="text-center font-sans mb-12" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    <h1 className="text-5xl font-extrabold leading-tight text-white bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#00A3E0] to-[#90E0EF]">
                        Latest & Top <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A3E0] to-[#90E0EF]">Job Openings</span>
                    </h1>
                    <p className="mt-6 text-lg font-bold text-white leading-relaxed">
                        Explore top job opportunities that align with your career goals. Connect with leading employers and take your career to new heights.
                    </p>
                </div>
                <div className='grid grid-cols-3 gap-8 pt-8'>
                    {
                        allJobs.length <= 0 ? <span className='text-white'>No Job Available</span> : allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                    }
                </div>
                <div className='pb-20' /> {/* Added padding-bottom here */}
            </div>
        </div>
    );
}

export default LatestJobs;

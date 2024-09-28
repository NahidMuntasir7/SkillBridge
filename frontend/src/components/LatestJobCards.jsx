import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='relative p-6 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 cursor-pointer flex flex-col justify-between h-full transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800'
        >
            <div>
                <h1 className='font-medium text-lg text-gray-100'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-400'>USA</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 text-gray-100'>{job?.title}</h1>
                <p className='text-sm text-gray-300'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='bg-gray-700 text-white border-none font-semibold' variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-gray-700 text-white border-none font-semibold' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='bg-gray-700 text-white border-none font-semibold' variant="ghost">
                    ${job?.salary} Per year
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;

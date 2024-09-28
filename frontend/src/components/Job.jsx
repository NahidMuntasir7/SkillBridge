import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-300'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg text-white'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-400'>USA</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2 text-white'>{job?.title}</h1>
                <p className='text-sm text-gray-300'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='bg-gradient-to-br from-gray-700 to-gray-800 text-white font-bold py-1 px-2 rounded-full'>
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-gradient-to-br from-gray-700 to-gray-800 text-white font-bold py-1 px-2 rounded-full'>
                    {job?.jobType}
                </Badge>
                <Badge className='bg-gradient-to-br from-gray-700 to-gray-800 text-white font-bold py-1 px-2 rounded-full'>
                    ${job?.salary} Per year
                </Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="bg-white text-black border border-gray-300 hover:bg-gray-300 transition-colors duration-200">
                    Details
                </Button>
                <Button className="bg-white text-black border border-gray-300 hover:bg-gray-300 transition-colors duration-200">
                    Save For Later
                </Button>
            </div>
        </div>
    )
}

export default Job

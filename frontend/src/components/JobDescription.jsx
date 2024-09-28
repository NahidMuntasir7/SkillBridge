import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div
            className="relative min-h-screen flex flex-col p-10"
            style={{
                background: '#1A1A1A', // Cool black gradient background
                fontFamily: 'Google Sans, sans-serif',
                color: '#FFFFFF',
            }}
        >
            <div className="absolute top-10 left-10 right-10">
                <div className="flex flex-col max-w-4xl mx-auto space-y-4">
                    <h1 className="text-3xl font-bold mb-4">{singleJob?.title}</h1>
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Badge className="bg-gray-700 text-white border-none font-semibold" variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className="bg-gray-700 text-white border-none font-semibold" variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="bg-gray-700 text-white border-none font-semibold" variant="ghost">
                            ${singleJob?.salary} Per year
                        </Badge>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`self-start rounded-full px-4 py-2 text-base font-bold ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                    <div>
                        <hr className="my-6 border-t border-white" />
                        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                        <div className="space-y-2 text-base">
                            <p><strong>Role:</strong> {singleJob?.title}</p>
                            <p><strong>Location:</strong> {singleJob?.location}</p>
                            <p><strong>Description:</strong> {singleJob?.description}</p>
                            <p><strong>Experience:</strong> {singleJob?.experienceLevel} years</p>
                            <p><strong>Salary:</strong> ${singleJob?.salary} Per year</p>
                            <p><strong>Total Applicants:</strong> {singleJob?.applications?.length}</p>
                            <p><strong>Posted Date:</strong> {singleJob?.createdAt.split("T")[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
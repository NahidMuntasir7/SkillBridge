import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div style={{ backgroundColor: '#1A1A1A', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Navbar />
            <div className='flex-grow'>
                <div className='max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-2xl my-5 p-8 shadow-md transition-transform duration-300 hover:scale-105'>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                            </Avatar>
                            <div>
                                <h1 className='font-medium text-xl text-white' style={{ fontFamily: 'Google Sans, sans-serif' }}>{user?.fullname}</h1>
                                <p className='text-gray-300' style={{ fontFamily: 'Google Sans, sans-serif' }}>{user?.profile?.bio}</p>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} className="bg-gray-700 text-white hover:bg-gray-600" variant="outline"><Pen /></Button>
                    </div>
                    <div className='my-5'>
                        <div className='flex items-center gap-3 my-2 text-gray-300'>
                            <Mail />
                            <span>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 my-2 text-gray-300'>
                            <Contact />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>
                    <div className='my-5'>
                        <h1 className='text-white' style={{ fontFamily: 'Google Sans, sans-serif' }}>Skills</h1>
                        <div className='flex items-center gap-2 flex-wrap'>
                            {
                                user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) =>
                                    <Badge key={index} className='bg-gray-700 text-white border-none font-semibold' variant="ghost">
                                        {item}
                                    </Badge>
                                ) : <span className='text-gray-400'>NA</span>
                            }
                        </div>
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label className="text-md font-bold text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Resume</Label>
                        {
                            isResume ? <a target='_blank' rel='noopener noreferrer' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer' style={{ fontFamily: 'Google Sans, sans-serif' }}>
                                {user?.profile?.resumeOriginalName}
                            </a> : <span className='text-gray-400'>NA</span>
                        }
                    </div>
                </div>
                <div className='max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-2xl pb-10 shadow-md my-5'>
                    <h1
                        className='font-bold text-lg my-5'
                        style={{
                            fontFamily: 'Google Sans, sans-serif',
                            color: '#FFFFFF',
                            textAlign: 'center'
                        }}
                    >
                        Applied Jobs
                    </h1>
                    <AppliedJobTable className='text-white' />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;

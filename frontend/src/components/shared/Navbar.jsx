import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { clearState } from '@/redux/companySlice';
import { clearSstate } from '@/redux/jobSlice';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      dispatch(clearState());
      dispatch(clearSstate());
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='bg-black border-b border-white border-opacity-20' style={{ fontFamily: 'Google Sans, sans-serif' }}>
      <div className='flex items-center justify-between mx-auto max-w-screen-xl h-24 p-4'>
        <div>
          <h1 className='text-3xl font-bold text-white'>
            Skill<span className='bg-clip-text text-transparent bg-gradient-to-r from-[#00A3E0] to-[#90E0EF]'>Bridge</span>
          </h1>
        </div>
        <div className='flex items-center gap-12'>
          <ul className='flex font-medium items-center gap-5'>
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies" className='text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500'>Companies</Link></li>
                  <li><Link to="/admin/jobs" className='text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500'>Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/" className='text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500'>Home</Link></li>
                  <li><Link to="/jobs" className='text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500'>Jobs</Link></li>
                  <li><Link to="/browse" className='text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500'>Browse</Link></li>
                </>
              )
            }
          </ul>
          {
            !user ? (
              <div className='flex items-center gap-2'>
                <Link to="/login">
                  <Button variant="outline" className="text-black border-white hover:bg-gray-300 font-bold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#00A3E0] text-white hover:bg-[#007bb5] font-bold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer rounded-full border-2 w-12 h-12 bg-clip-border border-transparent bg-gradient-to-r from-[#00A3E0] to-[#90E0EF]">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  <div className=''>
                    <div className='flex gap-2 space-y-2'>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                      </Avatar>
                      <div>
                        <h4 className='font-medium'>{user?.fullname}</h4>
                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                      </div>
                    </div>
                    <div className='flex flex-col my-2'>
                      {
                        user && user.role === 'student' && (
                          <div className='flex w-fit items-center gap-2 cursor-pointer'>
                            <User2 />
                            <Button 
                              variant="link" 
                              className="text-white hover:text-[#00A3E0] hover:bg-transparent font-semibold transition-colors"
                              style={{ textDecoration: 'none', fontFamily: 'Google Sans, sans-serif' }}
                            >
                              <Link to="/profile">View Profile</Link>
                            </Button>
                          </div>
                        )
                      }
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <LogOut />
                        <Button 
                          onClick={logoutHandler} 
                          variant="link" 
                          className="text-white hover:text-[#00A3E0] hover:bg-transparent font-semibold transition-colors"
                          style={{ textDecoration: 'none', fontFamily: 'Google Sans, sans-serif' }}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;

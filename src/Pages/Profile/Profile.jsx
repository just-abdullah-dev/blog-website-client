import React, { useEffect, useState } from 'react';
import { Blocks, MessageCircle, User2 } from 'lucide-react';
import ProfileBlogs from './ProfileBlogs';
import ProfileComments from './ProfileComments';
import ProfileSettings from './ProfileSettings';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export default function Profile() {
    const navigate = useNavigate();
    const userState = useSelector(state=>state.user);
    useEffect(
        ()=>{
            if(!userState?.userInfo){
                navigate('/login');
            }
        }, [navigate, userState?.userInfo]
    )
    // const { data: profileData, isLoading: profileIsLoading, error: profileError } = useQuery({
    //     queryFn: () => {
    //       return getUserProfile(({ token: userState?.userInfo?.token }))
    //     },
    //     queryKey: ['profile'],
    //     onSuccess: (data)=>{
    //         if(data?.admin){
    //             toast.error("Please sign in to see profile.");
    //             navigate('/');
    //         }
    //     }
    //   }
    //   );

    const [isProfile, setIsProfile] = useState(true);
    const [isBlogs, setIsBlogs] = useState(false);
    const [isComments, setIsComments] = useState(false);

    function sideviewHandler(type = '') {
        if (type === 'blogs') {
            setIsProfile(() => false)
            setIsBlogs(() => true)
            setIsComments(() => false)
        } else if (type === 'comments') {
            setIsProfile(() => false)
            setIsBlogs(() => false)
            setIsComments(() => true)
        } else {
            setIsProfile(() => true)
            setIsBlogs(() => false)
            setIsComments(() => false)
        }
    }

    return (
        <div className='grid md:flex'>
            <aside className='md:block w-full md:w-[25%] bg-white border border-t-2 '>
                <h1 className='hidden md:block my-4 font-bold text-center text-dark-hard'>Main Menu</h1>
                <div className='my-3 md:my-8 px-2 md:px-8 flex flex-row md:flex-col justify-center gap-10 text-md font-bold w-screen text-dark-light'>
                    <button
                        onClick={() => {
                            sideviewHandler()
                        }}
                        className={`${isProfile?"text-primary ":" "} w-fit md:w-full flex gap-1 md:gap-8 items-center hover:text-primary `}>
                        <User2 />
                        <p>Profile</p>
                    </button>
                    {
                    userState?.userInfo?.admin &&
                     <><button
                        onClick={() => {
                            sideviewHandler('blogs')
                        }}
                        className={`${isBlogs?"text-primary ":" "} w-fit md:w-full flex gap-1 md:gap-8 items-center hover:text-primary `}>
                        <Blocks />
                        <p>Blogs</p>
                    </button>
                    <button
                        onClick={() => {
                            sideviewHandler('comments')
                        }}
                        className={`${isComments?"text-primary ":" "} w-fit md:w-full flex gap-1 md:gap-8 items-center hover:text-primary `}>
                        <MessageCircle />
                        <p>Comments</p>
                    </button> </>}
                </div>
            </aside>

            { userState?.userInfo &&
                <div className='w-[100%] md:w-[75%] g-[#f8f8f8] border'>
                {isProfile ?
                    <ProfileSettings /> :
                    isBlogs ?
                        <ProfileBlogs /> :
                        <ProfileComments />}
            </div> }
        </div>
    )
}

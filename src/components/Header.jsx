import React, { useEffect, useState } from 'react'
import { images, stables } from '../constants'
import { NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/user';

export default function Header() {
    const userState = useSelector(state => state.user);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    }
    const toggleNavbar = () => {
        setIsOpen((prevState) => !prevState)
    }
    const navlinks = [
        { path: '/', label: 'Home' },
        { path: '/blogs', label: 'Blogs' },
        { path: '/categories', label: 'Categories' },
        { path: '/about', label: 'About' },
    ];
    return (
        <header className={`${isOpen ? 'flex-col' : 'flex-row'} pl-8 pr-8 py-4 flex justify-between items-center h-fit w-full sticky top-0 left-0 right-0 z-20 bg-white`}>
            <div className={`${isOpen ? 'self-start' : ''} m-0 p-0 flex justify-between items-center w-[100%] md:w-auto`}>
                <a href="/">
                    <img
                        className='w-12 md:w-14'
                        src={images.logo}
                        alt="HPP Logo" />
                </a>
                <div className={`md:hidden`}>
                    {isOpen ?
                        <X onClick={toggleNavbar} /> :
                        <Menu onClick={toggleNavbar} />}
                </div>
            </div>
            <div className={``}>
                <ul className={`${isOpen ? 'block' : 'hidden'} gap-4 items-center flex flex-col md:flex md:flex-row`}>
                    {
                        navlinks.map((item, index) => (
                            <li key={index}
                                className='text-lg relative group font-bold'>
                                <NavLink
                                    onClick={isOpen ? toggleNavbar : null}
                                    className='mx-3'
                                    to={item.path}>{item.label}</NavLink>
                                <span className='text-lg transition-all duration-500 absolute right-0 group-hover:opacity-100 group-hover:right-[95%] opacity-0'>/</span>
                            </li>
                        ))
                    }
                    {userState.userInfo ?
                        <div className='relative'>
                            <button
                                className='text-primary flex text-lg items-center gap-1 font-bold'
                                onClick={() => setProfileDropdown(!profileDropdown)}>
                                <div className='flex items-center justify-between gap-2'>
                                    {userState.userInfo.avatar && <img  className='w-9 h-9 rounded-full' src={stables.UPLOAD_FOLDER_BASE_URL + userState.userInfo.avatar} alt="DP" />}
                                    <p>{userState.userInfo.name.split(" ")[0]}</p>
                                </div>
                                {profileDropdown ?
                                    <ChevronUp /> :
                                    <ChevronDown /> 
                                }

                            </button>
                            {profileDropdown ?
                                <div className='absolute top-8 right-2 rounded-2xl bg-white text-md font-bold w-28 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'>
                                    <button
                                        onClick={() => {
                                            navigate('/profile');
                                            setProfileDropdown(!profileDropdown);
                                            isOpen ? toggleNavbar() : null;
                                        }}
                                        className='px-3 py-2 rounded-t-2xl w-full hover:bg-black hover:text-white'>
                                        Dashboard
                                    </button>
                                    <button
                                        className='px-3 py-2 rounded-b-2xl w-full hover:bg-black hover:text-white'
                                        onClick={()=>{
                                            logoutHandler();
                                            isOpen ? toggleNavbar() : null;
                                        }}>
                                        Log Out
                                    </button>
                                </div> : <></>}
                        </div> :
                        <li>
                            <NavLink
                                onClick={isOpen ? toggleNavbar : null}
                                className={`md:ml-3 m-0 border border-primary text-primary py-2 px-7 md:px-3 rounded-3xl hover:bg-primary hover:text-white ring-offset-2 active:ring-2 ring-primary transition-all font-bold`}
                                to={'/register'}
                            >Sign in</NavLink>
                        </li>}

                </ul>
            </div>
        </header>
    )
}

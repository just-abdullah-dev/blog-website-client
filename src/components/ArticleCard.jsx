import React from 'react'
import { images, stables } from '../constants'
import { NavLink } from 'react-router-dom'
import { BadgeCheck, User2 } from 'lucide-react'

export default function ArticleCard({ post }) {
    return (
        <div className='flex justify-center items-start'>
            <div className='flex flex-col items-center justify-center shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] w-72 rounded-2xl overflow-hidden bg-white pb-1'>
                <NavLink to={`/blogs/${post.slug}`} className=''>
                    <img 
                    className='hover:scale-[98%] transition-all w-full aspect-video' 
                    src={post.photo ? stables.UPLOAD_FOLDER_BASE_URL + post.photo : images.samplePost} 
                    alt="Article Image" />
                </NavLink>
                <div className='py-5 px-3 flex flex-col gap-3 w-full'>
                    <NavLink to={`/blogs/${post.slug}`} className='cursor-pointer hover:text-dark-soft text-xl font-bold text-dark-hard max-h-14 overflow-hidden'>{post.title}</NavLink>
                    <p className='text-dark-light max-h-12 overflow-hidden'>{post.caption}</p>

                    <div className='flex justify-start items-center gap-3'>
                        {post.user.avatar ? 
                        <img 
                        className='w-9 h-9 rounded-full' 
                        src={stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar} 
                        alt="Author Image" />: 
                        <div className='outline outline-2 rounded-full'><User2 /></div>}
                        <div className='flex justify-between items-center w-full'>
                            <div>
                                <NavLink to='/about' className='text-md font-bold hover:scale-[98%] cursor-pointer'>{post.user.name.split(" ")[0]}</NavLink>
                                {!post.user.verified &&
                                    <div className='flex gap-1 items-center'>
                                        <BadgeCheck size={20} color='#ffffff' fill='#11ed11' />
                                        <p className='text-xs text-dark-light'>Verified</p>
                                    </div>}
                            </div>
                            <p className='font-semibold text-dark-hard text-sm'>
                                {(new Date(post.createdAt).getDate())} {" "}
                                {(new Date(post.createdAt).toLocaleString("default", {month:"short",}))} {" "}
                                {(new Date(post.createdAt).getFullYear()%100 )}
                                </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

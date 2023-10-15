import React from 'react'
import { images, stables } from '../constants'
import { NavLink } from 'react-router-dom'

export default function SuggestedPosts({ title, data, tags }) {
  return (
    <div className='shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] px-4 md:px-6 py-6 rounded-2xl grid gap-4'>
      <h1 className='text-xl font-bold pb-2'>{title}</h1>
      <div className='grid gap-4'>
        {data?.data.map((post) => {
          return (
            <NavLink
              to={`/blogs/${post.slug}`}
              key={post.slug} >
              <div className='flex items-start gap-3 cursor-pointer group active:scale-[98%]'>
                <div className='w-1/2 aspect-video overflow-hidden flex justify-center items-center rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'>
                  <img className='' src={post.photo ? stables.UPLOAD_FOLDER_BASE_URL + post.photo : images.samplePost} alt="Article Image" />
                </div>
                <div className='pt-1 w-2/3'>
                  <h1 className='text-md font-bold group-hover:scale-x-[102%] transition-all duration-200'>{post.title}</h1>
                  <p className='text-xs md:text-sm text-dark-light'>
                    {new Date(post.createdAt).getDate()}{" "}
                    {(new Date(post.createdAt).toLocaleString("default", { month: "short", }))} {" "}
                    {new Date(post.createdAt).getFullYear()}
                  </p>
                </div>
              </div>
            </NavLink>
          )
        })}
      </div>
      <div>
        <h1 className='text-xl font-bold'>Tags</h1>
        <div className='flex flex-wrap gap-4 p-3'>
          {tags.map((tag, index) => {
            return (
              <button key={index} className='text-white bg-primary rounded-md px-3 py-1 active:scale-[98%]'>{tag}</button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

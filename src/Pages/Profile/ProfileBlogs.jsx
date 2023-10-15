import { PencilIcon, Plus } from 'lucide-react';
import React, { useState } from 'react';
import ManageBlogs from './ManageBlogs';
import CreateBlog from './CreateBlog';

export default function ProfileBlogs() {
  const [manageBlog, setManageBlog] = useState(true);
  const [createBlog, setCreateBlog] = useState(false);


  return (
    <div>
      <div className='w-full bg-white border-b flex gap-0'>
        <button
          onClick={() => {
            if (!manageBlog) {
              setManageBlog(true);
              setCreateBlog(false);
            }
          }}
          value={manageBlog}
          className={`${manageBlog ? 'bg-primary text-white' : ''} flex gap-1 py-2 px-3 md:gap-2 md:py-4 md:px-6 items-center border-0 border-r-2 cursor-pointer`}>
          <p className='text-md font-bold'>Manage Blogs</p> <PencilIcon size={18} />
        </button>
        <button
          onClick={() => {
            if (manageBlog) {
              setManageBlog(false);
              setCreateBlog(true);
            }
          }}
          value={createBlog}
          className={`${createBlog ? 'bg-primary text-white' : ''} flex gap-1 py-2 px-3 md:gap-2 md:py-4 md:px-6 items-center border-0 border-r-2 cursor-pointer`}>
          <p className='text-md font-bold'>Create a New Blog</p> <Plus />
        </button>
      </div>
      <div>
        {manageBlog ?
          <ManageBlogs /> :
          <CreateBlog />}
      </div>
    </div>
  )
}

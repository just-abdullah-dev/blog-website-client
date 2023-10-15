import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { deletePost, getAllPosts, updatePostStatus } from '../../services/index/posts';
import toast from 'react-hot-toast';
import { images, stables } from '../../constants';
import { NavLink } from 'react-router-dom';
import ManageBlogsSkeleton from './ManageBlogsSkeleton';
import Pagination from '../../components/Pagination';
import { useSelector } from 'react-redux';
import Error from '../../components/Error';
import { PenBoxIcon, Trash2Icon } from 'lucide-react';
import ReactSwitch from 'react-switch';

let isFirstRun = true;

export default function ManageBlogs() {
    const queryClient = useQueryClient();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const userState = useSelector(state => state.user);
    const [status, setStatus] = useState(false);

    const { mutate: mutateUpdatePostStatus, isLoading: isLoadingUpdatePostStatus } = useMutation({
        mutationFn: ({ token, slug, status }) => {
          return updatePostStatus({token, slug, status});
        },
        onSuccess: (data) => {
          toast.success('Blog status has been updated.');
          console.log(data);
          queryClient.invalidateQueries(['posts']);
        },
        onError: (error) => {
          toast.error(error.message);
        },
    });
    function handleUpdatePostStatus(slug, status){
        mutateUpdatePostStatus({
            token: userState.userInfo.token,
            slug,
            status: !status
        });
    }

    const { data: postsData, isLoading, isFetching, refetch, isError } = useQuery({
        queryFn: () => getAllPosts(searchKeyword, currentPage, limit),
        queryKey: ['posts'],
        onError: (error) => {
            toast.error(error.message);
        }
    });

    useEffect(
        () => {
            if (isFirstRun) {
                isFirstRun = false;
                return;
            }
            refetch();
        }, [refetch, currentPage]
    );

    const { mutate: mutateDeletePost, isLoading: isDeletingPost } = useMutation({
        mutationFn: ({ token, slug }) => {
            return deletePost({ token, slug });
        },
        onSuccess: (data) => {
            toast.success('Blog has been deleted successfully.');
            queryClient.invalidateQueries(['posts']);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
    function handleDeletePost(slug) {
        const { token } = userState.userInfo;
        mutateDeletePost({ token, slug });
    }
    function handleSearchBtn(e) {
        e.preventDefault();
        setCurrentPage(1);
        refetch();
    }
    return (
        <div className="my-8 mx-4">
            {isError ?
                <Error message={'No post was found.'} /> :
                (isLoading || isFetching) && isFirstRun ?
                    <ManageBlogsSkeleton /> :
                    <div className="rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-4">
                        <div className="flex flex-col md:flex-row gap-y-5 justify-between items-center w-full p-4">
                            <h2 className="text-2xl font-semibold">
                                Manage Blogs
                            </h2>
                            <form onSubmit={handleSearchBtn} className="flex gap-6">
                                <input type="text" id="&quot;form-subscribe-Filter"
                                    className="py-2 px-4 rounded-lg outline-none border border-gray-300"
                                    placeholder="Search Blog"
                                    value={searchKeyword}
                                    onChange={(e) => { setSearchKeyword(e.target.value) }} />
                                <button
                                    className="py-2 px-4 rounded-lg bg-primary hover:bg-opacity-95 text-white font-semibold" type="submit">
                                    Search
                                </button>
                            </form>
                        </div>
                        <div className="">
                            {isLoading || isFetching ?
                                <ManageBlogsSkeleton title={false} /> :
                                <div>
                                    <div className='flex gap-1 border-y-2'>
                                        <div className='w-2/4 sm:w-3/5 px-2 py-3 border-r-2 text-md font-semibold'><h2>Title</h2></div>
                                        <div className='hidden sm:block w-1/5 px-2 py-3 border-r-2 text-md font-semibold'><h2>Category</h2></div>
                                        <div className='hidden sm:block w-1/5 px-2 py-3 border-r-2 text-md font-semibold'><h2>Date</h2></div>
                                        <div className='w-1/5 px-2 py-3 border-r-2 text-md font-semibold'><h2>Status</h2></div>
                                        <div className='w-1/5 px-2 py-3 text-md font-semibold'><h2>Action</h2></div>
                                    </div>
                                    <div>
                                        {postsData?.data.map((post) => 
                                            <div key={post._id} className='flex gap-1 border-b-2'>
                                                <div className='w-2/4 sm:w-3/5 px-2 py-3 text-md flex gap-2 items-center'>
                                                    <img className='w-14 aspect-square rounded-lg' src={post.photo ? stables.UPLOAD_FOLDER_BASE_URL + post.photo : images.samplePost} alt="post image" />
                                                    <div className=''>
                                                    <NavLink to={`/blogs/${post.slug}`} className={'font-semibold'}>
                                                        {post.title}
                                                    </NavLink>
                                                    <p className='sm:hidden text-sm text-gray-500'>
                                                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}</p>
                                                    </div>
                                                    
                                                    <h2 className='font-semibold'></h2>
                                                </div>

                                                <div className='hidden w-1/5 px-2 py-3 text-sm sm:flex items-center'><p>{post?.categories ? post.categories : 'Uncategorized'}</p></div>

                                                <div className='w-1/5 px-2 py-3 text-sm hidden sm:flex items-center'><p>
                                                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}</p></div>
                                                <div className='w-1/5 px-2 py-3 text-sm flex items-center justify-center'>
                                                    <ReactSwitch
                                                        className='disabled:opacity-60 disabled:cursor-not-allowed'
                                                        disabled={isLoadingUpdatePostStatus}
                                                        height={22}
                                                        width={44}
                                                        checked={post.status}
                                                        uncheckedIcon={false}
                                                        checkedIcon={false}
                                                        onColor='#1565d8'
                                                        onChange={() => handleUpdatePostStatus(post.slug,post.status)} />
                                                </div>
                                                <div className='w-1/5 px-2 py-3 text-sm flex items-center justify-center'>
                                                    <div className='flex gap-4'>
                                                        <NavLink to={`/blogs/edit/${post.slug}`} target='_blank'>
                                                            <PenBoxIcon
                                                                strokeWidth={2}
                                                                size={19} />
                                                        </NavLink>
                                                        <button
                                                            className='disabled:opacity-70 disabled:cursor-not-allowed'
                                                            disabled={isDeletingPost}
                                                            onClick={() => handleDeletePost(post.slug)}
                                                            type="button">
                                                            <Trash2Icon
                                                                strokeWidth={2}
                                                                size={19} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            }
                            <Pagination
                                onPageChange={(page) => setCurrentPage(page)}
                                currentPage={currentPage}
                                totalPageCount={postsData?.headers ? JSON.parse(postsData?.headers?.['x-totalpagecount']) : 10}
                            />
                        </div>
                    </div>
            }

        </div>
    )
}

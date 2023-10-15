/*
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { createPost } from '../../services/index/posts';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const userState = useSelector(state => state.user);
  const navigate = useNavigate();
  const [slug, setSlug] = useState('');
  useEffect(
    ()=>{
      if(slug){
        navigate(`/blogs/edit/${slug}`);
      }
    }, [slug]
  )
  const { mutate: mutateNewPost, isLoading: isLoadingNewPost } = useMutation({
    mutationFn: ({ token, title, caption }) => {
      return createPost({token, title, caption});
    },
    onSuccess: (data) => {
      toast.success("New blog has been created. Add content to your post.");
      setSlug(()=>data.data.slug);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  function handleNewPost(){
    mutateNewPost({
      token: userState.userInfo.token,
      title,
      caption
    })
  }

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      title: "",
      caption: "",
    },
    mode: 'onChange',
    values: useMemo(
      ()=>{
        return{
          title,
          caption
        }
      }
    )
  });

  return (
    <div className='flex justify-center items-center'>
     <form
          className='py-6 flex flex-col gap-4 '
          onSubmit={handleSubmit(handleNewPost)}>
          <div className=''>
            <label className='block text-[#595959] font-semibold mb-1' htmlFor="title">Title</label>
            <input
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required."
                }
              })}
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className='p-4 outline-none border border-dark-light rounded-md w-64 sm:w-80 md:w-96'
              id='title'
              type="text"
              placeholder='Title of Blog' />
            {errors.title?.message && <p className='mt-1 text-xs text-red-500'>{errors.title?.message}</p>}
          </div>

          <div className=''>
            <label className='block text-[#595959] font-semibold mb-1' htmlFor="caption">Caption</label>
            <input
              {...register('caption', {
                maxLength: {
                  value: 60,
                  message: "Caption cannot be more than 60 characters."
                },
              })}
              value={caption}
              onChange={(e)=>setCaption(e.target.value)}
              className='p-4 outline-none border border-dark-light rounded-md w-64 sm:w-80 md:w-96' id='caption' type="text" placeholder='Caption goes here...' />
            {errors.caption?.message && <p className='mt-1 text-xs text-red-500'>{errors.caption?.message}</p>}
          </div>

          <button
            disabled={!isValid || isLoadingNewPost}
            className='mt-5 bg-primary rounded-lg py-4 text-lg text-white hover:bg-opacity-95 disabled:opacity-70 disabled:cursor-not-allowed' type="submit">Create Blog</button>
        </form>
    </div>
  )
}
*/
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createPost } from '../../services/index/posts';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export default function CreateBlog() {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [slug, setSlug] = useState('');

  useEffect(() => {
    if (slug) {
      navigate(`/blogs/edit/${slug}`);
    }
  }, [slug]);

  const { mutate: mutateNewPost, isLoading: isLoadingNewPost } = useMutation({
    mutationFn: ({ token, title, caption }) => {
      return createPost({ token, title, caption });
    },
    onSuccess: (data) => {
      toast.success('New blog has been created. Add content to your post.');
      setSlug(() => data.data.slug);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { register, handleSubmit, formState: { errors }, isValid } = useForm({
    defaultValues: {
      title: "",
      caption: "",
    },
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    mutateNewPost({
      token: userState.userInfo.token,
      title: data.title,
      caption: data.caption,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <form className="py-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label className="block text-[#595959] font-semibold mb-1" htmlFor="title">
            Title
          </label>
          <input
            {...register('title', {
              required: 'Title is required.',
            })}
            className="p-4 outline-none border border-dark-light rounded-md w-64 sm:w-80 md:w-96"
            id="title"
            type="text"
            placeholder="Title of Blog"
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
        </div>

        <div className="">
          <label className="block text-[#595959] font-semibold mb-1" htmlFor="caption">
            Caption
          </label>
          <input
            {...register('caption', {
              maxLength: {
                value: 60,
                message: 'Caption cannot be more than 60 characters.',
              },
            })}
            className="p-4 outline-none border border-dark-light rounded-md w-64 sm:w-80 md:w-96"
            id="caption"
            type="text"
            placeholder="Caption goes here..."
          />
          {errors.caption && <p className="mt-1 text-xs text-red-500">{errors.caption.message}</p>}
        </div>

        <button
          disabled={isLoadingNewPost}
          className="mt-5 bg-primary rounded-lg py-4 text-lg text-white hover:bg-opacity-95 disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}


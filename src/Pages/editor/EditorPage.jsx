import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router';
import ArticleViewSkeleton from '../../components/ArticleViewSkeleton';
import Error from '../../components/Error';
import { images, stables } from '../../constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSinglePost, updatePost } from '../../services/index/posts';
import { parseJsonToHtml } from '../../utils/parseJsonToHtml';
import { Cross, CrossIcon, Eye, Save, XCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Editor from './Editor';
import { useForm } from 'react-hook-form';

export default function EditorPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [tags, setTags] = useState([]);
    const [body, setBody] = useState(null);
    const [isAdmin, setIsAdmin] = useState(true);
    const [newPhoto, setNewPhoto] = useState('');
    const [initialPhoto, setInitialPhoto] = useState('');
    const [inputTagValue, setInputTagValue] = useState('');
    const userState = useSelector(state => state.user);
    const [isSlugChanged, setIsSlugChanged] = useState({check: false, slug: ''});

    const { data, isLoading: singlePostLoading, isError, error } = useQuery({
        queryFn: () => getSinglePost({ slug }),
        queryKey: [slug],
        onError: (error) => {
            toast.error(error.message);
        }
    })
    const { mutate: mutateUpdatePost, isLoading: isLoadingUpdatePost } = useMutation({
        mutationFn: ({ token, slug, updatedData }) => {
            return updatePost({ token, slug, updatedData });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([slug]);
            toast.success("Post has been updated.");
            if(isSlugChanged.check){
                handleSlugChanged();
            }
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
    const { register, handleSubmit, formState: { errors }, isValid } = useForm({
        defaultValues: {
            title: "",
            caption: "",
            newSlug: "",
        },
        mode: 'onChange',
        values: useMemo(() => {
            return {
                title: !singlePostLoading && !isError ? data.title : '',
                caption: !singlePostLoading && !isError ? data.caption : '',
                newSlug: !singlePostLoading && !isError ? data.slug : '',
            }
        }, [data?.title, data?.caption, data?.slug, singlePostLoading])
    });

    useEffect(
        () => {
            if (!isAdmin) {
                toast.error('Please sign in as Admin to edit the blog.');
                navigate(`/blogs/${slug}`);
            }
            if (!userState?.userInfo && !userState?.userInfo?.admin) {
                setIsAdmin(false)
            }
        }, [userState, isAdmin]
    )
    useEffect(
    () => {
        if (!singlePostLoading && !isError) {
            setInitialPhoto(data?.photo);
            setTags(data?.tags);
        }
    }, [data, isError, singlePostLoading]
    )

    function handleSlugChanged(){
        navigate(`/blogs/edit/${isSlugChanged.slug}`);
    }
    function handleChangePhoto(e) {
        const file = e.target.files[0];
        setNewPhoto(file);
    }
    function handleRemovePhoto() {
        setInitialPhoto('');
        setNewPhoto('');
    }
    async function handleUpdateBtn(data) {
        const { title, caption, newSlug } = data;
        let updatedData = new FormData();
        if (newPhoto !== '') {
            // for new photo 
            updatedData.append('postPicture', newPhoto);
        } else if (!newPhoto && !initialPhoto) {
            // for delete existance photo 
            updatedData.append('delete', true);
        }

        // Title, caption, slug & body 
        if (slug === newSlug) {
            updatedData.append('document', JSON.stringify({ body, title, caption, tags }));
        } else {
            updatedData.append('document', JSON.stringify({ body, title, caption, tags, slug: newSlug }));
            setIsSlugChanged({
                check: true,
                slug: newSlug
            });
        }
        // mutation call 
        mutateUpdatePost({
            token: userState.userInfo.token,
            slug,
            updatedData
        });
    }
    const handleDeleteTags = (i)=>{
        setTags(prevArr => {
            const newArr = [];
            prevArr.map((tag,index) => {
                if(index !== i){
                    newArr.push(tag);
                }
            })
            return newArr;
        })
    }
    const handleInputChange = (event) => {
        setInputTagValue(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputTagValue) {
            setTags([...tags, inputTagValue]);
            setInputTagValue('');
        }
    };

    return (
        <div className=''>
                <div className='flex justify-between items-center border-y-2 px-16 py-3 z-[1000] bg-white sticky w-screen top-16 left-0 right-0'>
                    <p className='text-2xl font-bold'>Blog Editor</p>
                    <div className='flex gap-8'>
                        <button
                            disabled={isLoadingUpdatePost || isValid}
                            onClick={handleSubmit(handleUpdateBtn)}
                            className='text-xl tracking-wider px-4 py-2 text-white rounded-lg bg-primary hover:bg-opacity-95 flex gap-2 disabled:opacity-70 disabled:cursor-not-allowed'
                            type="button"><p>Update</p><Save /></button>
                        <NavLink
                            to={`/blogs/${slug}`}
                            target={'_blank'}
                            className='text-xl tracking-wider px-4 py-2 mr-4 text-white rounded-lg bg-gray-500 hover:bg-opacity-90 flex gap-2'
                            type="button"><p>Preview</p> <Eye /></NavLink>
                    </div>
                </div>
                <div>
                    {singlePostLoading ?
                        <ArticleViewSkeleton /> :
                        isError ? <Error message={error.message} /> :
                            <div className='grid gap-4 py-12 px-16'>
                                <div className='flex justify-center items-center rounded-2xl w-full group'>
                                    <div className='w-[70%] aspect-video rounded-2xl overflow-hidden relative flex justify-center items-center bg-gray-200'>
                                        {newPhoto === '' ?
                                            <img className='' src={initialPhoto ? stables.UPLOAD_FOLDER_BASE_URL + initialPhoto : images.samplePost} alt="Post Picture" /> :
                                            <img className='' src={URL.createObjectURL(newPhoto)} alt="Post Picture" />
                                        }
                                    </div>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <div className='my-2 w-[70%] flex justify-around items-center'>
                                        <h1 className='text-3xl font-semibold'>Cover Photo</h1>
                                        <div className=' flex items-center gap-8'>
                                            <label htmlFor="postImage" className='text-lg tracking-wider px-4 py-2 text-white rounded-lg bg-primary hover:bg-opacity-95 cursor-pointer'>Change</label>
                                            <input type="file" id="postImage" className='hidden' onChange={handleChangePhoto} />
                                            <button
                                                onClick={handleRemovePhoto}
                                                className='text-lg tracking-wider px-4 py-2 text-white rounded-lg bg-red-600 hover:bg-opacity-95'
                                                type="button"
                                            >Remove</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='px-4 grid gap-6 my-4'>
                                    <div className="">
                                        <label className="block text-[#595959] font-semibold mb-1 text-xl" htmlFor="title">
                                            Title
                                        </label>
                                        <input
                                            {...register('title', {
                                                required: 'Title is required.',
                                            })}
                                            className="p-4 outline-none border border-dark-light rounded-md w-full"
                                            id="title"
                                            type="text"
                                            placeholder="Title of Blog"
                                        />
                                        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
                                    </div>
                                    <div className='md:grid md:grid-cols-2 md:gap-8'>
                                        <div className="">
                                            <label className="block text-[#595959] font-semibold mb-1 text-xl" htmlFor="caption">
                                                Caption
                                            </label>
                                            <input
                                                {...register('caption', {
                                                    maxLength: {
                                                        value: 60,
                                                        message: 'Caption cannot be more than 60 characters.',
                                                    },
                                                })}
                                                className="p-4 outline-none border border-dark-light rounded-md w-full"
                                                id="caption"
                                                type="text"
                                                placeholder="Caption goes here..."
                                            />
                                            {errors.caption && <p className="mt-1 text-xs text-red-500">{errors.caption.message}</p>}
                                        </div>
                                        <div className="">
                                            <label className="block text-[#595959] font-semibold mb-1 text-xl" htmlFor="slug">
                                                Slug
                                            </label>
                                            <input
                                                {...register('newSlug', {
                                                    required: 'Slug is required.',
                                                })}
                                                className="p-4 outline-none border border-dark-light rounded-md w-full"
                                                id="slug"
                                                type="text"
                                                placeholder="Slug goes here..."
                                            />
                                            {errors.newSlug && <p className="mt-1 text-xs text-red-500">{errors.newSlug.message}</p>}
                                        </div>
                                    </div>
                                    {/* tags input  */}
                                    <div>
                                        <label className="block text-[#595959] font-semibold mb-1 text-xl" htmlFor="slug">
                                                Tags
                                            </label>
                                        <input
                                        className='p-4 outline-none border border-dark-light rounded-md w-full'
                                        type="text"
                                        value={inputTagValue}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter tag and press Enter"
                                        />
                                        <div className='flex gap-3 my-4 flex-wrap'>
                                            {tags.map((tag, index) => (
                                                <div key={index} className='text-md flex items-center gap-3 bg-gray-200 rounded-lg w-fit px-2 py-1'>
                                                    <p>{tag}</p>
                                                    <XCircle stroke='#8d8d8d' onClick={()=>handleDeleteTags(index)} className='cursor-pointer hover:bg-[#8d8d8d] rounded-full' />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Tags */}
                                <h1 className='text-3xl w-full font-bold px-4'>Body of the Blog</h1>
                                <div className='text-md w-full'>
                                    {!singlePostLoading && !isError &&
                                        <Editor content={data?.body} editable={true} onDataChange={(data) => setBody(data)} className={'border border-t-0 min-h-[50vh]'} margin='m-5' />
                                    }
                                </div>
                            </div>
                    }
                </div>
        </div>
    )
}


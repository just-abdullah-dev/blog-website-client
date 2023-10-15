import React, { useState } from 'react'
import { images, stables } from '../constants'
import BreadCrumbs from './BreadCrumbs'
import { useParams } from 'react-router-dom'
import SuggestedPosts from '../container/SuggestedPosts'
import CommentInput from '../comments/CommentInput'
import AllComments from '../comments/AllComments'
import SocialMediaShareButtons from './SocialMediaShareButtons'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts, getSinglePost } from '../services/index/posts'
import toast from 'react-hot-toast';
import {generateHTML} from '@tiptap/html';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Italic from '@tiptap/extension-italic';
import parse from 'html-react-parser';
import ArticleViewSkeleton from './ArticleViewSkeleton';
import Error from './Error';
import {useSelector} from 'react-redux';
import { parseJsonToHtml } from '../utils/parseJsonToHtml'
import Editor from '../Pages/editor/Editor'

export default function ArticleView() {

  const [breadCrumbsData, setBreadCrumbsData] = useState();
  const [body, setBody] = useState(null);
  const { slug } = useParams();
  const userState = useSelector(state => state.user);

  const { data, isLoading: singlePostLoading, isError, error } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: [slug],
    onSuccess: (data) => {
      setBreadCrumbsData([
        { link: '/', name: 'Home' },
        { link: '/blogs', name: 'Blogs' },
        { link: `/blogs/${slug}`, name: slug },
      ]);
      setBody(parseJsonToHtml(data?.body));
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })
  
  const { data: postData, isLoading: postDataLoading, isError: iserror } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['posts'],
    onError: (error) => {
      toast.error(error.message);
    }
  })


  return (
    <div className=''>
      <BreadCrumbs data={breadCrumbsData ? breadCrumbsData : []} />
      {singlePostLoading ?
        <ArticleViewSkeleton /> :
        isError? <Error message={error.message}/> :
        <div className='grid lg:flex items-start gap-6 py-6 px-8 md:px-12'>
          <div className='grid gap-8 lg:w-[66%]'>
            <div className='flex justify-center items-center w-full aspect-video overflow-hidden rounded-2xl'>
              <img className='w-full h-fit' src={data?.photo ? stables.UPLOAD_FOLDER_BASE_URL + data.photo : images.samplePost} alt="Article image" />
            </div>
            {/* Tags */}
            {/* <div>
              {(data?.categories).map((category) => (
                <Link
                  key={category.name}
                  to={`/categories?category=${category.name}`}
                  className='italic text-sm text-dark-light hover:text-dark-hard'
                >
                  {category.name}
                </Link>
              ))}
            </div> */}

            <h1 className='text-4xl font-semibold '>{data?.title}</h1>
            <div className='text-md'>
            <Editor content={data?.body} editable={false} />
            </div>
            
            <CommentInput
              typeOfComment={'new'}
              commentLabel={'Leave your comment here...'}
              buttonLabel={'Send'}/>

            <AllComments
              comments={data?.comments} />
          </div>
          <div className='lg:w-[34%] py-4 grid gap-y-6 lg:flex lg:flex-col-reverse'>
            <SocialMediaShareButtons
              url={'https://moonfo.com/post/client-side-and-server-side-explanation'}
              title={'Client-side and Server-side explanation'} />
            {postDataLoading ?
            <div>Latest blogs are Loading...</div>: 
            <SuggestedPosts 
            title={'Latest Article'} 
            data={postDataLoading ? [] : postData}
            tags={data?.tags} />
          }
          </div>
        </div>}
    </div>
  )
}


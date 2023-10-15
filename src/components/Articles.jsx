import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../services/index/posts';
import { toast } from 'react-hot-toast';
import ArticleCardSkeleton from './ArticleCardSkeleton';
import { ArrowRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { actionsSearchKeyword } from '../store/reducers/searchKeyword';

let isFirstRun = true;

export default function Articles({ limit = 9, showMoreArticlesBtn = false }) {
  const [currentPage, setCurrentPage] = useState(1);
  const searchKeywordState = useSelector(state => state.searchKeyword);
  const dispatch = useDispatch();

  const { data, isLoading, isError, refetch, isLoadingError, isFetching } = useQuery({
    queryFn: () => getAllPosts(searchKeywordState.searchKeyword, currentPage, limit),
    queryKey: ['posts'],
    onError: (error) => {
      toast.error(error.message);
      dispatch(actionsSearchKeyword.setSearchKeyword(''));
    },
    onSuccess: (data) => {
    }
  });
  useEffect(
    ()=>{
      if(searchKeywordState.searchKeyword !== ''){
        refetch();
      }
    },[searchKeywordState, refetch]
  )
  useEffect(
    ()=>{
      if(!isFirstRun){
        isFirstRun = false;
        return;
      }
      refetch();
    }, [refetch, currentPage]
  );
  
  return (
    <div className='grid my-14'>
      {isError || isLoadingError ?
        <div className='w-full h-96 flex justify-center items-center'>
          <p className='text-red-600 font-bold text-xl'>No data was found!</p>
        </div> :
        <><div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-14 mb-10'>
          {isLoading || isFetching ?
            [...Array(6)].map((index) =>
              <ArticleCardSkeleton key={index} />) :
            data?.data.map((post) => {
              if(post.status){
                return <ArticleCard key={post._id} post={post} />;
              }
              }
            )}
        </div>
          {showMoreArticlesBtn ?
            <div className='flex justify-center mt-14'>
              <NavLink className='text-primary font-bold flex gap-2 border-2 border-primary w-fit px-3 py-2 rounded-lg' to='/blogs'>More articles<ArrowRight /></NavLink>
            </div> :
            <Pagination
              onPageChange={(page) => setCurrentPage(page)}
              currentPage={currentPage}
              totalPageCount={data?.headers ? JSON.parse(data?.headers?.['x-totalpagecount']) : 10}
            />}
        </>
      }

    </div>
  )
}

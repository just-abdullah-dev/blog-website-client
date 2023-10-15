import React from 'react';
import CommentIndividual from './CommentIndividual';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../services/index/comments';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

export default function 
AllComments({ 
  comments
}) {
  const {slug} = useParams();
  const queryClient = useQueryClient();
  const userState = useSelector(state => state.user);
  const {mutate: mutateDeleteComment, isLoading} = useMutation({
    mutationFn: ({token, _id}) => {
      return deleteComment({token, _id});
    },
    onSuccess: ()=>{
      toast.success('Message has been deleted.');
      queryClient.invalidateQueries([slug]);
    },
    onError: (error)=>{
      toast.error(error.message);
    }
  })
  
  function handleDelete(_id) {
    if (window.confirm('Are sure to delete comment?')) {
      mutateDeleteComment({
        token: userState.userInfo.token,
        _id
      })
    }
  }
  return (
    <div className='grid gap-4'>
      <h1 className='text-xl font-bold'>All Comments({comments.length})</h1>
      <div className='grid gap-6'>
        {
          comments.map((comment) => {
            return (
              <CommentIndividual
              key={comment._id} 
              comment={comment}
              handleDelete={handleDelete} />
            )
          })
        }
      </div>
    </div>
  )
}

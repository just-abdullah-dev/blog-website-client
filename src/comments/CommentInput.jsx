import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { createNewComment, updateComment } from '../services/index/comments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

export default function CommentInput({
  commentLabel,
  buttonLabel,
  typeOfComment,
  parent = null,
  replyOnUser = null,
  valueOfForm = '',
  closeInput = null,
  commentID = '',
  className = ''
}) {
  const {slug} = useParams();
  const [value, setValue] = useState(valueOfForm);
  const queryClient = useQueryClient();
  const userState = useSelector(state => state.user);
  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } = useMutation({
    mutationFn: ({ token, slug, desc, parent, replyOnUser }) => {
      return createNewComment({ token, slug, desc, parent, replyOnUser });
    },
    onSuccess: () => {
      toast.success("Your comment has been added.");
      queryClient.invalidateQueries([slug]);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const {mutate: mutateUpdateComment, isLoading: isUpdatingComment} = useMutation({
    mutationFn: ({token, _id, desc}) => {
      return updateComment({token, _id, desc});
    },
    onSuccess: (data)=>{
      toast.success("Comment has been successfully updated.");
      queryClient.invalidateQueries([slug]);
    },
    onError: (error)=>{
      toast.error(error.message);
    }
  })

  function handleClick() {
    if (value !== '' && value.length >= 3) {
      if (typeOfComment === 'new' || typeOfComment === 'reply') {
        mutateNewComment({
          token: userState.userInfo.token,
          slug: slug,
          desc: value,
          parent: parent,
          replyOnUser: replyOnUser
        });
        setValue('');
      } else if (typeOfComment === 'edit') {
        mutateUpdateComment({
          token: userState.userInfo.token,
          desc: value,
          _id: commentID
        })
        setValue('');
      }
    } else {
      window.alert('Comment cannot be leave empty. OR Length of comment should be atleast 3 letters.')
    }
    if(typeOfComment === 'reply' || typeOfComment === 'edit'){
      closeInput();
    }
  }

  return (
    <div
      className={`${className} relative`}>
      <textarea
        disabled={!userState.userInfo}
        className={`w-full max-h-36 h-36 border-2 border-primary outline-none p-3 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed`}
        placeholder={commentLabel}
        value={value}
        onChange={(event) => setValue(() => event.target.value)}
      ></textarea>

      <button
        disabled={isLoadingNewComment || !userState.userInfo || isUpdatingComment}
        onClick={handleClick}
        type="button"
        className={`text-white bg-primary rounded-md px-3 py-1 absolute right-4 bottom-5 disabled:opacity-60 disabled:cursor-not-allowed`}>
        {buttonLabel}
      </button>
    </div>
  )
}

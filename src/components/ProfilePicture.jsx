import React, { useState } from 'react';
import {Camera} from 'lucide-react';
import CropEasy from './cropImage/CropEasy';
import { createPortal } from 'react-dom';
import { stables } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfilePicture } from '../services/index/users';
import { userActions } from '../store/reducers/userReducer';
import toast from 'react-hot-toast';

export default function ProfilePicture({avatar}) {
    const [isOpenCrop, setIsOpenCrop] = useState(false);
    const [photo, setPhoto] = useState(null);
    const userState = useSelector(state=>state.user);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

 function handleFileUpload(event){
    const file = event.target.files[0];
    setPhoto({url: URL.createObjectURL(file), file:file})
    setIsOpenCrop(true);
 }

 const { mutate, isLoading: isImageDeleting} = useMutation({
    mutationFn:({token, formData})=>{
      return updateProfilePicture({
        token: token,
        formData: formData
      })
    },
    onSuccess:(data)=>{
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account', JSON.stringify(data));
      queryClient.invalidateQueries(['profile']);
      toast.success('Profile Picture has been deleted.');
    },
    onError:(error)=>{
      toast.error(error.message);
      console.log(error);
    }
  })

 function handleDeleteBtn(){
    try {
        const formData = new FormData();
        formData.append("profilePicture", undefined);
        mutate({
          token: userState.userInfo.token,
          formData: formData
        })
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
 }
  return (
    <>
    {isOpenCrop && 
    createPortal(<CropEasy photo={photo} setIsOpenCrop={setIsOpenCrop} />, document.getElementById('portal'))}
    <div className='flex gap-8 items-center'>
        <div className=''>
            <label htmlFor="profilePicture" >
                {avatar? (
                    <img className='w-28 h-28 rounded-full outline outline-offset-4 cursor-pointer' src={stables.UPLOAD_FOLDER_BASE_URL + avatar} alt="Profile Picture" />
                    ):(
                        <div className='bg-white outline outline-1 outline-primary rounded-full w-fit h-fit p-8 text-primary cursor-pointer'>
                        <Camera size={44} strokeWidth={1.5} />
                    </div>
                )}
            </label>
            <input id='profilePicture' type="file" className='sr-only' onChange={handleFileUpload} alt='Click image to change.' />
        </div>
        <button 
        disabled={isImageDeleting}
        className='rounded-lg px-3 py-1 text-white bg-red-600 disabled:cursor-not-allowed hover:bg-opacity-95' 
        onClick={handleDeleteBtn} 
        type="button">Delete</button>
    </div>
    </>
  )
}

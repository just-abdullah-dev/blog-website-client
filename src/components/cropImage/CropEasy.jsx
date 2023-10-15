import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture } from '../../services/index/users';
import { userActions } from '../../store/reducers/userReducer';
import toast from 'react-hot-toast';

export default function CropEasy({photo, setIsOpenCrop}) {
  const [crop, setCrop] = useState({x:0,y:0});
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixel, setCroppedAreaPixel] = useState(null);

  function handleCropComplete(croppedArea, croppedAreaPixel){
    setCroppedAreaPixel(croppedAreaPixel);
  }

  const userState = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const { mutate, isLoading} = useMutation({
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
      setIsOpenCrop(false);
      toast.success('Profile Picture has been updated.');
    },
    onError:(error)=>{
      toast.error(error.message);
      console.log(error);
    }
  })

  async function handleCropImage(){
    try {
      const croppedImg = await getCroppedImg(photo?.url, croppedAreaPixel);

      const file = new File([croppedImg.file], `${photo?.file?.name}`, {
        type: photo?.file?.type,
      });

      const formData = new FormData();
      formData.append("profilePicture", file);
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
    <div className='fixed z-[1000] inset-0 flex justify-center items-center bg-black/50 h-screen '>
        <div className='bg-white p-10 rounded-lg h-fit flex flex-col gap-4'>
            <h2 className='font-bold text-xl text-dark-hard tracking-wide'>Crop Image</h2>
            <div className='relative h-72 w-72 outline outline-1 outline-black'>
                <Cropper image={photo?.url} crop={crop} zoom={zoom} aspect={1} onZoomChange={setZoom} onCropChange={setCrop} onCropComplete={handleCropComplete} />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='block font-semibold text-sm' htmlFor="zoomRange">Zoom: {Math.round(zoom*100)}%</label>
              <input className='w-full' type="range" id="zoomRange" min={1} max={3} step={0.1} value={zoom} onChange={(event)=>setZoom(event.target.value)} />
            </div>
            <div className='flex justify-around font-semibold text-sm'>
              <button 
              className='py-2 px-3 rounded-lg bg-red-600 text-white hover:bg-opacity-95'
              disabled={isLoading}
              type="button"
              onClick={()=>setIsOpenCrop(false)}
              >Cancel</button>
              <button 
              className='py-2 px-3 rounded-lg text-white bg-primary hover:bg-opacity-95'
              disabled={isLoading}
              type="button"
              onClick={handleCropImage}
              >Crop & Upload</button>
            </div>
        </div>
    </div>
  )
}

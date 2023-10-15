import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ProfilePicture from '../../components/ProfilePicture';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateProfile } from '../../services/index/users';
import ChangePassword from './ChangePassword';
import toast from 'react-hot-toast';
import { userActions } from '../../store/reducers/userReducer';

export default function ProfileSettings() {
  const [isChangePassword, setIsChangePassword] = useState(false)
  const navigate = useNavigate();
  const userState = useSelector(state => state.user);
  useEffect(() => {
    if (!userState.userInfo) {
      navigate('/');
    }
  }, [navigate, userState.userInfo]);

  const { data: profileData, isLoading: profileIsLoading, error: profileError } = useQuery({
    queryFn: () => {
      return getUserProfile(({ token: userState.userInfo.token }))
    },
    queryKey: ['profile']
  }
  );

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    mode: 'onChange',
    values: useMemo(()=>{
      return {
        name: !profileIsLoading ? profileData.name : '',
        email: !profileIsLoading ? profileData.email : '',
      }
    },[profileData?.name, profileData?.email, profileIsLoading])
  });
  
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {mutate, isLoading} = useMutation({
    mutationFn:({name,email})=>{
      return updateProfile({token:userState.userInfo.token, userData:{name,email}});
    },
    onSuccess:(data)=>{
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account',JSON.stringify(data));
      toast.success('Profile has been updated.');
      queryClient.invalidateQueries(['profile']);
    },
    onError:(error)=>{
      toast.error(error.message);
    }
  })

  function toggleChangePassword(){
    setIsChangePassword(val => !val);
  }

  function submitHandler(data){
    const {name,email} = data;
    mutate({name,email});
  }


  return (
    <div className='flex flex-col items-center gap-8 my-8'>
      <h1 className='font-bold text-3xl tracking-wide'>Profile Settings</h1>
      <div className=''>
        <ProfilePicture avatar={userState.userInfo.avatar} />
        <form
          className='py-6 flex flex-col gap-4 '
          onSubmit={handleSubmit(submitHandler)}>
          <div className=''>
            <label className='block text-[#595959] font-semibold mb-1' htmlFor="name">Name</label>
            <input
              {...register("name", {
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long."
                },
                required: {
                  value: true,
                  message: "Name is required."
                }
              })}
              className='p-4 outline-none border border-dark-light rounded-md w-64 sm:w-80 md:w-96'
              name='name'
              type="address"
              placeholder='Enter Name' />
            {errors.name?.message && <p className='mt-1 text-xs text-red-500'>{errors.name?.message}</p>}
          </div>
          <div className=''>
            <label className='block text-[#595959] font-semibold mb-1' htmlFor="email">Email</label>

            <input
              {...register('email', {
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email."
                },
                required: {
                  value: true,
                  message: "Enter new email OR enter existing email."
                }
              })}
              className='p-4 outline-none border border-dark-light rounded-md w-64 sm:w-80 md:w-96' name='email' type="email" placeholder='Enter Email' />
            {errors.email?.message && <p className='mt-1 text-xs text-red-500'>{errors.email?.message}</p>}
          </div>

          <button
            disabled={!isValid || isLoading}
            className='bg-primary rounded-lg py-4 text-lg text-white hover:bg-opacity-95 disabled:opacity-70 disabled:cursor-not-allowed' type="submit">Update</button>
        </form>
        <hr className='border-b-1 border-black w-full mb-6'/>
        <div>
        {!isChangePassword ?
            <button
            className='py-4 rounded-lg text-lg bg-white text-primary w-full font-bold outline outline-1 outline-primary hover:bg-opacity-95 '
              type="button"
              onClick={toggleChangePassword}>Change Password</button> :
            <ChangePassword toggleView={toggleChangePassword}/>}
          </div>
      </div>

    </div>
  )
}

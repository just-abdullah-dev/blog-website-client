import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../services/index/users';
import { userActions } from '../../store/reducers/userReducer';
// import { updatePassword } from '../services/index/users';

export default function ChangePassword({ toggleView }) {
    const userState = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userState.userInfo) {
            navigate('/');
        }
    }, [navigate, userState.userInfo]);

    function submitHandler(data) {
        const { newPassword } = data;
        mutate({ newPassword });
    }
    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
        defaultValues: {
            newPassword: "",
            confirmNewPassword:"",
        },
        mode: 'onChange',
    });
    const newPassword = watch('newPassword');

    const dispatch = useDispatch();
    const { mutate, isLoading } = useMutation({
        mutationFn: ({ newPassword }) => {
            return updateProfile({
                token: userState.userInfo.token,
                userData: {password:newPassword}
            });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem('account',JSON.stringify(data));
            toast.success('Password has been updated.')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    return (
        <section className='flex justify-center items-center'>
            <div className=''>
                <h1 className='text-xl md:text-2xl text-dark-hard text-center font-bold'>Change Password</h1>
                <form
                    className='py-6 flex flex-col gap-4'
                    onSubmit={handleSubmit(submitHandler)}>

                    <div className=''>
                        <label className='block text-[#595959] font-semibold mb-1' htmlFor="newPassword">New Password</label>
                        <input
                            {...register("newPassword", {
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long."
                                },
                                required: {
                                    value: true,
                                    message: "New Password is required."
                                }
                            })}
                            className='p-4 outline-none border border-dark-light rounded-md w-64 sm:w-80 md:w-96' id='newPassword' type="password" placeholder='Enter New Password' />
                        {errors.newPassword?.message && <p className='mt-1 text-xs text-red-500'>{errors.newPassword?.message}</p>}
                    </div>
                    <div className=''>
                        <label className='block text-[#595959] font-semibold mb-1' htmlFor="confirmNewPassword">
                            Confirm New Password</label>
                        
                        <input 
                        {...register("confirmNewPassword",{
                            required:{
                                value:true,
                                message:"Confirm Password is required."
                            },
                            validate:(value)=>{
                                if(value!==newPassword){
                                    return "Password does not match.";
                                }
                            }
                        })}
                        className='p-4 outline-none border border-dark-light rounded-md w-64 sm:w-80 md:w-96' id='confirmNewPassword' type="password" placeholder='Confirm Password' />
                        {errors.confirmNewPassword?.message && (<p className='mt-1 text-xs text-red-500'>{errors.confirmNewPassword?.message}</p>)}
                    </div>
                    <div className='flex justify-around items-center gap-6'>
                        <button className='bg-red-600 text-white rounded-lg py-4 text-lg w-full hover:bg-opacity-95' type="button" onClick={toggleView}>Cancel</button>
                    <button
                        disabled={!isValid || isLoading}
                        className='bg-primary rounded-lg py-4 text-lg text-white hover:bg-opacity-95 disabled:opacity-70 disabled:cursor-not-allowed w-full' type="submit">Update</button>
                    </div>
                </form>

            </div>
        </section>
    )
}

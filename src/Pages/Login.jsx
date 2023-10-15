import React, { useEffect } from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/reducers/userReducer';
import { signIn } from '../services/index/users';

export default function Register() {
    function submitHandler(data) {
        const { email,password } = data;
        mutate({ email,password });
    }
    const {register, handleSubmit, formState:{errors, isValid}} = useForm({
        defaultValues:{
            email:"",
            password:"",
        },
        mode:'onChange',
    });

    const dispatch = useDispatch();
    const {mutate, isLoading} =  useMutation({
        mutationFn:({email,password})=>{
            return signIn({email,password});
        },
        onSuccess:(data)=>{
            dispatch(userActions.setUserInfo(data))
            localStorage.setItem('account',JSON.stringify(data));
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })
    const userState = useSelector(state=>state.user);
    const navigate = useNavigate();
    useEffect(()=>{
        if(userState.userInfo){
            navigate('/');
        }
    }, [navigate, userState.userInfo])
    
    return (
        <section className='flex justify-center items-center'>
            <div className='py-10'>
                <h1 className='text-2xl md:text-3xl text-dark-hard text-center font-bold'>Log in</h1>
                <form
                    className='py-6 flex flex-col gap-4'
                    onSubmit={handleSubmit(submitHandler)}>
                    
                    <div className=''>
                        <label className='block text-[#595959] font-semibold mb-1' htmlFor="email">Email</label>
                        
                        <input 
                        {...register('email',{
                            pattern:{
                                value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message:"Enter a valid email."
                            },
                            required:{
                                value:true,
                                message:"Email is required."
                            }
                        })}
                        className='p-4 outline-none border border-dark-light rounded-md w-64 sm:w-80 md:w-96' name='email' type="email" placeholder='Enter Email' />
                        {errors.email?.message && <p className='mt-1 text-xs text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <div className=''>
                        <label className='block text-[#595959] font-semibold mb-1' htmlFor="password">Password</label>
                        <input 
                        {...register("password",{
                            minLength:{
                                value:6,
                                message:"Password must be at least 6 characters long."
                            },
                            required:{
                                value:true,
                                message:"Password is required."
                            }
                        })}
                        className='p-4 outline-none border border-dark-light rounded-md w-64 sm:w-80 md:w-96' name='password' type="password" placeholder='Enter Password' />
                        {errors.password?.message && <p className='mt-1 text-xs text-red-500'>{errors.password?.message}</p>}
                    </div>

                    <button 
                    disabled={!isValid || isLoading} 
                    className='bg-primary rounded-lg py-4 text-lg text-white hover:bg-opacity-95 disabled:opacity-70 disabled:cursor-not-allowed' type="submit">Sign In</button>

                    <div className='flex flex-row gap-3'>
                        <a className='text-[#595959] font-semibold text-xs'>Don't have an account?</a>
                        <NavLink to={'/register'} className='text-primary font-semibold text-xs'>Register Now</NavLink>
                    </div>
                </form>

            </div>
        </section>
    )
}

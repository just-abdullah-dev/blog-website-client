import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';


export default function ProfileComments() {
    const navigate = useNavigate();
    const userState = useSelector(state=>state.user);
    useEffect(()=>{
        if(!userState.userInfo){
            navigate('/');
        }
    }, [navigate, userState.userInfo]);

  return (
    <div>ProfileComments</div>
  )
}

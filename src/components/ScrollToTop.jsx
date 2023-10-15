import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function ScrollToTop() {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    useEffect(
        ()=>{
            navigate(`${pathname}#top`)
        }, [pathname]
    )
  return (
    <div id='top' className='absolute'></div>
  );
}

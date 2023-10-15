import React, { useState } from 'react';
import Articles from '../components/Articles';
import BreadCrumbs from '../components/BreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from 'lucide-react';
import { actionsSearchKeyword } from '../store/reducers/searchKeyword';

export default function Blogs() {
  const paths = [
    { link: '/', name: 'Home' },
    { link: '/blogs', name: 'Blogs' }
  ];
  const searchKeywordState = useSelector(state => state.searchKeyword);
  const [searchInput, setSearchInput] = useState(searchKeywordState.searchKeyword);
  const dispatch = useDispatch();

  function toggleSearchText(event){
    setSearchInput(()=> event.target.value)
    dispatchSearchKeyword();
}
function handleSearchBtn(){
    dispatchSearchKeyword();
}
function dispatchSearchKeyword(){
    dispatch(actionsSearchKeyword.setSearchKeyword(searchInput));
}

  return (
    <div className=''>
      <BreadCrumbs data={paths} />
      <div className='flex justify-center items-center mt-8 mb-6'>
        <div className='w-72 sm:w-1/2 relative'>
        <input
          className='rounded-lg w-full py-2 px-4 text-lg outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
          type="text" name="search" id="search" placeholder='Search article' value={searchInput} onChange={toggleSearchText} />
          <SearchIcon onClick={handleSearchBtn} className='absolute right-4 top-2 cursor-pointer' />
        </div>
      </div>
      <Articles />
    </div>
  )
}

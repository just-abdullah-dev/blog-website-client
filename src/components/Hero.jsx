import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { images } from '../constants';
import { useDispatch } from 'react-redux';
import { actionsSearchKeyword } from '../store/reducers/searchKeyword';

export default function Hero() {
    const [searchInput, setSearchInput] = useState('');
    const dispatch = useDispatch();

    const popularTags = [
        'Design',
        'Web 3.0',
        'User Interface',
        'Web Development',
        'Artificial Intelligence',
    ]
    function searchArticle(tag){
        setSearchInput(() => tag)
        dispatchSearchKeyword();
    }
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
        <section className='mx-10 my-10 md:mx-14 md:my-14 flex'>
            {/* text div  */}
            <div className='flex flex-col gap-8 lg:w-1/2'>
                <div className='md:text-center lg:text-left'>
                <h1 className='text-4xl font-bold text-dark-hard'>Read the most interesting articles</h1>
                <p className='text-dark-light text-lg '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt magni ipsa obcaecati maxime praesentium dolores reprehenderit enim.</p>
                </div>
                
                <div className='flex flex-col gap-4 relative'>
                    <input 
                    className='rounded-lg w-full py-2 px-4 text-lg outline-none border-b-2'
                    type="text" name="search" id="search" placeholder='Search article' value={searchInput} onChange={toggleSearchText} />
                    <button 
                    className='flex gap-3 justify-center rounded-lg w-full bg-primary text-white py-2 text-lg hover:opacity-95  md:absolute md:right-0 md:w-fit md:px-4 md:scale-75 md:text-xl'
                    type="button"
                    onClick={handleSearchBtn}><SearchIcon /> Search</button>
                    <div className='md:flex md:flex-wrap md:items-center md:gap-2'>
                        <p className='font-bold'>Popular Tags: </p>
                        {
                            popularTags.map((tag,index) => (
                                <button 
                                key={index}
                                onClick={() => searchArticle(tag)}
                                className='font-bold text-primary px-4 py-2 bg-secondary rounded-lg m-1 hover:bg-primary hover:text-white'>
                                    {tag}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Image div */}
            <div className='hidden lg:flex lg:w-1/2'>
                    <img src={images.heroimage} alt="Hero Image" />
            </div>
        </section>
    )
}

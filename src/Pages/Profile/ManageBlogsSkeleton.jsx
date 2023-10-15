import React from 'react';

export default function ManageBlogsSkeleton({title = true}) {
    return (
        <div className='animate-pulse h-fit w-full py-8 fle justify-center items-center'>
            <div className=''>
                {title &&
                <div className='w-[100%] grid grid-cols-3 gap-6'>
                <div className='bg-gray-200 w-1/2 h-12 rounded-lg'></div>
                <div></div>
                <div className='flex gap-6'>
                    <div className=' bg-gray-200 w-44 h-11 rounded-lg'></div>
                    <div className=' bg-gray-200 w-20 h-11 rounded-lg'></div>
                </div>
            </div>}
                <div className='px-6'>
                    {listItem()}
                    {listItem()}
                    {listItem()}
                    {listItem()}
                </div>
            </div>
        </div>
    )
}

function listItem(){
    return <div className='w-full flex gap-6 mt-12'>
                        <div className=''>
                            <div className='bg-gray-200 w-10 h-10 rounded-lg'></div>
                        </div>
                        <div className=' w-full h-10 flex gap-5 justify-center items-center'>
                            <div className='bg-gray-200 w-full h-5 rounded-lg'></div>
                            <div className='bg-gray-200 w-full h-5 rounded-lg'></div>
                            <div className='bg-gray-200 w-full h-5 rounded-lg'></div>
                            <div className='bg-gray-200 w-full h-5 rounded-lg'></div>
                        </div>
                    </div>;
}
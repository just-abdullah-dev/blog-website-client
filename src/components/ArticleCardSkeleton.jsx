import React from 'react';

export default function ArticleCardSkeleton() {
    return (
        <div className='flex justify-center items-center'>
            <div className='w-72 h-fit bg-white rounded-2xl overflow-hidden flex flex-col gap-4 animate-pulse'>
            {/* image div  */}
            <div className='w-full aspect-video bg-slate-300' />
           <div className='px-2 grid gap-3'>
             {/* title div  */}
             <div className='h-3 w-60 bg-slate-300 rounded-2xl' />
            {/* caption div  */}
            <div className='h-2 w-48 bg-slate-300 rounded-2xl' />
            <div className='flex gap-2'>
                {/* avatar div  */}
                <div><div className='h-10 w-10 bg-slate-300 rounded-full' /></div>
                {/* author data div  */}
                <div className='flex justify-between items-center w-full'>
                    <div className='flex flex-col justify-around h-full'>
                        {/* name div  */}
                        <div className='h-2 w-24 bg-slate-300 rounded-2xl' />
                        {/* verified div  */}
                        <div className='h-1 w-16 bg-slate-300 rounded-2xl' />
                    </div>
                    {/* date div  */}
                    <div className='h-1 w-16 bg-slate-300 rounded-2xl'>
                    </div>
                </div>
            </div>
           </div>
        </div>
        </div>
    )
}

import React from 'react';

export default function ArticleViewSkeleton() {
  return (
    <div className='md:flex animate-pulse'>
      <div className='w-full md:w-[66%] p-8 grid gap-4'>
        {/* image div  */}
        <div className='w-full bg-slate-200 aspect-video rounded-2xl'></div>
        {/* category div  */}
        <div className='h-5 w-32 rounded-2xl bg-slate-200'></div>
        {/* title div  */}
        <div className='h-4 w-full rounded-2xl bg-slate-200'></div>
        {/* body div  */}
        <div className='h-2 w-full bg-slate-200 rounded-2xl'></div>
        <div className='h-2 w-full bg-slate-200 rounded-2xl'></div>
        <div className='h-2 w-96 bg-slate-200 rounded-2xl'></div>
        <div className='h-2 w-36 bg-slate-200 rounded-2xl'></div>
        <div className='h-2 w-full bg-slate-200 rounded-2xl'></div>
        <div className='h-2 w-full bg-slate-200 rounded-2xl'></div>
        <div className='h-2 w-72 bg-slate-200 rounded-2xl'></div>
        <div className='h-2 w-20 bg-slate-200 rounded-2xl'></div>
      </div>
      {/* latest post  */}
      <div className='w-full md:w-[34%] p-8 flex flex-col gap-6'>
        <div className='flex w-full gap-6'>
          <div className='h-24 w-40 aspect-video rounded-xl bg-slate-200'></div>
          <div className='grid gap-4'>
            <div className='h-4 w-80 rounded-xl bg-slate-200'></div>
            <div className='h-2 w-80 rounded-xl bg-slate-200'></div>
            <div className='h-2 w-80 rounded-xl bg-slate-200'></div>
            <div className='h-2 w-60 rounded-xl bg-slate-200'></div>
          </div>
        </div>
        <div className='flex w-full gap-6'>
          <div className='h-24 w-40 aspect-video rounded-xl bg-slate-200'></div>
          <div className='grid gap-4'>
            <div className='h-4 w-80 rounded-xl bg-slate-200'></div>
            <div className='h-2 w-80 rounded-xl bg-slate-200'></div>
            <div className='h-2 w-80 rounded-xl bg-slate-200'></div>
            <div className='h-2 w-60 rounded-xl bg-slate-200'></div>
          </div>
        </div>
        <div className='flex w-full gap-6'>
          <div className='h-24 w-40 aspect-video rounded-xl bg-slate-200'></div>
          <div className='grid gap-4'>
            <div className='h-4 w-80 rounded-xl bg-slate-200'></div>
            <div className='h-2 w-80 rounded-xl bg-slate-200'></div>
            <div className='h-2 w-80 rounded-xl bg-slate-200'></div>
            <div className='h-2 w-60 rounded-xl bg-slate-200'></div>
          </div>
        </div>
        <div className='flex w-full gap-6'>
          <div className='h-24 w-40 aspect-video rounded-xl bg-slate-200'></div>
          <div className='grid gap-4'>
            <div className='h-4 w-80 rounded-xl bg-slate-200'></div>
            <div className='h-2 w-80 rounded-xl bg-slate-200'></div>
            <div className='h-2 w-80 w- rounded-xl bg-slate-200'></div>
            <div className='h-2 w-60 rounded-xl bg-slate-200'></div>
          </div>
        </div>
      </div>
    </div>
  )
}


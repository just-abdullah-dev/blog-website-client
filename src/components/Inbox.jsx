import { Mail } from 'lucide-react'
import React, { useState } from 'react'
import { images } from '../constants'

export default function Inbox() {
    const [inboxEmail, setInboxText] = useState('')
    const toggleInboxEmail = (event) => {
        setInboxText(() => event.target.value)
    }
    return (
        <div className='bg-dark-hard outline-none border-none'>
        <div className='h-12 bg-white rounded-b-[50%] lg:h-20 lg:rounded-b-[80%]'></div>

        <div className='md:flex md:flex-col-reverse lg:flex-row lg:justify-center lg:items-center'>
            {/* inbox div  */}
            <div className='px-10 py-10 md:px-14 md:py-14 flex flex-col gap-4 text-white'>
                <h1 className='text-xl font-bold tracking-wide md:text-center'>Get our stories delivered From us to your inbox weekly.</h1>
                <div className='grid gap-4 md:flex md:justify-center'>
                <input
                    className='text-black rounded-lg w-full py-2 px-4 text-lg outline-none border-b-2 md:w-1/2'
                    type="email" name="email" id="email" placeholder='Your Email' value={inboxEmail} onChange={toggleInboxEmail} />
                <button
                    className='flex gap-3 justify-center rounded-lg w-full bg-primary text-white py-2 text-lg hover:opacity-95 md:w-1/3'
                    type="button">Get Started <Mail /></button>
                </div>
                <p className='text-dark-light md:text-center lg:text-[#f7f7f7]'><span className='text-white'>Get a response tomorrow</span> if you submit by 9pm today. If we received after 9pm will get a reponse the following day.</p>
            </div>

            {/* Image div  */}
            <div className='hidden md:flex justify-center items-center md:px-14 md:pt-14 lg:py-14'>
                <img className='w-96 lg:w-full' src={images.inbox} alt="" />
            </div>
        </div>
        </div>
    )
}

import React from 'react'
import {
    FaFacebookSquare, 
    FaInstagramSquare, 
    FaTwitterSquare, 
    FaWhatsappSquare,
} from 'react-icons/fa'

export default function SocialMediaShareButtons() {
    return (
        <div className='px-4 md:px-6 py-6'>
            <h1 className='text-xl font-bold'>Share on:</h1>
            <div className='flex justify-between px-6'>
                <a
                    href="http://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaFacebookSquare className='w-10 h-10 rounded-xl text-[#4267B2]'/>
                </a>
                <a
                    href="http://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaInstagramSquare className='w-10 h-10 rounded-xl text-[#9300ff]'/>
                </a>
                <a
                    href="http://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaTwitterSquare className='w-10 h-10 rounded-xl text-[#1DA1F2]'/>
                </a>
                <a
                    href="http://www.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaWhatsappSquare className='w-10 h-10 rounded-xl text-[#25D366]'/>
                </a>
            </div>
        </div>
    )
}

import React from 'react'
import { NavLink } from 'react-router-dom'
import { images } from '../constants'
import { Mail, Phone } from 'lucide-react'


export default function Footer() {
  const navlinks = [
    { path: '/', label: 'Home' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/categories', label: 'Categories' },
    { path: '/about', label: 'About' },
  ]
  return (
    // <footer 
    // className='text-white pt-3 pb-3 pl-10 pr-10 w-full bg-gray-800 text-center md:flex md:gap-8 md:items-center md:justify-center block'>
    // <p>&copy; 2023 Just-Abdullah-Developer</p>
    // <p>All Rights are Reserved.</p>
    // </footer>

    <footer className="bg-dark-hard text-white p-8 pb-4">
      <div className="grid md:flex gap-8 items-start justify-center">
        {/* Website Logo  */}
        <div className='m-0 p-0'>
          <img className='w-16' src={images.logowhite} alt="Logo" />
          <p className='pt-6 pl-2'>Empowering Your Health Journey</p>
        </div>
        <div className='grid gap-6 justify-center md:grid-cols-3'>
          {/* Quick link div  */}
          <div className="m-0 p-0">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className={``}>
              {
                navlinks.map((item, index) => (
                  <li key={index}
                    className='text-md relative group w-fit'>
                    <NavLink className='mx-3' to={item.path}>{item.label}</NavLink>
                    <span className='transition-all duration-500 absolute right-0 group-hover:opacity-100 group-hover:right-[95%] opacity-0'>/</span>
                  </li>
                ))
              }
            </ul>
          </div>

          {/* follow div  */}
          <div className="m-0 p-0 md:px-2">
            <h3 className="text-lg font-bold">Follow Us</h3>
            <ul className='p-3 pl-0 pt-0'>
              <li className='relative group w-fit'><a className='pl-4' href="https://facebook.com/healthpeakplus" target='_blank'>Facebook</a>
                <span className='transition-all duration-500 absolute right-0 group-hover:opacity-100 group-hover:right-[95%] opacity-0'>/</span>
              </li>
              <li className='relative group w-fit'><a className='pl-4' href="https://instagram.com/healthpeakplus" target='_blank'>Instagram</a>
                <span className='transition-all duration-500 absolute right-0 group-hover:opacity-100 group-hover:right-[95%] opacity-0'>/</span>
              </li>
              <li className='relative group w-fit'><a className='pl-4' href="https://twitter.com/healthpeakplus" target='_blank'>Twitter</a>
                <span className='transition-all duration-500 absolute right-0 group-hover:opacity-100 group-hover:right-[95%] opacity-0'>/</span>
              </li>
            </ul>
          </div>
          {/* contact div  */}
          <div className="m-0 p-0">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <div className='p-2 grid gap-1 pl-0'>
              <p className='flex flex-wrap gap-3 relative w-fit group pl-4'><Mail /><a href="mailto:contact@hpp.com">contact@hpp.com</a>
                <span className='transition-all duration-500 absolute right-0 group-hover:opacity-100 group-hover:right-[95%] opacity-0'>/</span>
              </p>
              <p className='flex flex-wrap gap-3 relative w-fit group pl-4'><Phone /><a href="tel:+(123) 456-7890">(123) 456-7890</a>
                <span className='transition-all duration-500 absolute right-0 group-hover:opacity-100 group-hover:right-[95%] opacity-0'>/</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark-hard pt-4">
        <div className="container mx-auto text-center text-md text-dark-light">
          <p className=''>Founded by Abdullah and Just Abdullah.</p>
          <p className="">&copy; {new Date().getFullYear()} Health Peak Plus</p>
        </div>
      </div>
    </footer>
  )
}

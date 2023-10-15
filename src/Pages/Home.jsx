import React from 'react'
import Hero from '../components/Hero'
import Articles from '../components/Articles'
import Inbox from '../components/Inbox'

export default function Home() {
  return (
    <div className=''>
      <Hero />
      <section>
        <Articles limit={6} showMoreArticlesBtn={true} />
      </section>
      <Inbox />
    </div>
  )
}

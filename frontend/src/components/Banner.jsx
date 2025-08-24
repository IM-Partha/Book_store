import React from 'react'
import banner from '../assets/image.png'

const Banner = () => {
  return (
<>
<div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row'>
    <div className='w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32'>
    <div className='space-y-12'>
    <h1 className='text-4xl font-bold'>Hello, Welcomes here to learn smoething <span className='text-pink-500'>new everyday!</span></h1>
    <p className='text-xl'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              et totam. Tempora amet atque expedita, quae corrupti totam sed
              pariatur corporis at veniam est voluptas animi!</p>
    </div>
    <div className="join mt-8 ">
  <div>
    <label className="input validator join-item">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
      <input className='px-7' type="text" placeholder="mail@site.com" required/>
    </label>
    <div className="validator-hint hidden">Enter valid email address</div>
  </div>
  <button className="btn btn-neutral join-item">Join</button>
</div>
    </div>
    <div className='order-1 w-full mt-20 md:w-1/2'>

        <img className='md:w-[550px] md:h-[460px] md:ml-12' src={banner} alt="Banner" />

    </div>
</div>



</>
  )
}

export default Banner
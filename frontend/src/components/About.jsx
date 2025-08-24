import React from 'react';
import success from '../assets/Success.png'
const About = () => {
  return (
   <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row'>
       <div className='w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32'>
       <div className='space-y-12'>
       <h1 className='text-4xl font-bold'>Hello, Welcomes here to learn smoething <span className='text-pink-500'>new everyday!</span></h1>
       <p className='text-xl'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
                 et totam. Tempora amet atque expedita, quae corrupti totam sed
                 pariatur corporis at veniam est voluptas animi!</p>
       </div>
       <div className="join mt-8 ">

   </div>
       </div>
       <div className='order-1 w-full mt-20 md:w-1/2'>
           <img className='md:w-[550px] md:h-[460px] md:ml-12' src={success} alt="Banner" />
       </div>
   </div>
  );
};

export default About;

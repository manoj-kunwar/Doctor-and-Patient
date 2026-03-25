// import React from 'react'
// import { assets } from '../assets/assets'

// const Header = () => {
//   return (
//     <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      
//       {/* ------ left side-------- */}
//       <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10  m-auto md:py-[10vw] md:mb-[-30px]'>
//      <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading:tight'>
//         Book Appointment <br /> with Truested Doctors
//      </p>
//       <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
//         <img className='w-28' src={assets.group_profiles} alt="" />
//         <p>Simply browse through our extensive list of truested doctors,<br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
//       </div>
//       <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 '>
//         Book appointment <img  className='w-3' src={assets.arrow_icon} alt="" />
//       </a>
//         </div> 
//         {/* ------ right side-------- */}
//         <div className='md:w-1/2 relative'>
//         <img  className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
//         </div>
//     </div>
//   )
// }

// export default Header

import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-2xl px-6 md:px-10 lg:px-20 overflow-hidden'>

      {/* Left Side */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 m-auto md:py-[10vw] md:mb-[-30px]'>

        {/* Badge */}
        <div className='flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full w-fit'>
          <span className='w-4 h-4 bg-green-400 rounded-full animate-pulse'></span>
          Trusted by 10,000+ patients
        </div>

        {/* Heading */}
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight'>
          Find the Right Doctor <br />
          and Book Your Appointment <br className='hidden lg:block' />
          in Minutes
        </p>

        {/* Sub text */}
        <div className='flex flex-col md:flex-row items-center gap-3 text-white/80 text-sm font-light'>
          <img className='w-28 drop-shadow-md' src={assets.group_profiles} alt="" />
          <p> Browse top doctors, view availability in real time, and book your visit — fast, easy, and reliable.<br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
        </div>

        {/* CTA Button */}
        <a
          href="#speciality"
          className='flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full text-sm font-semibold m-auto md:m-0 shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 hover:gap-3 active:scale-95 transition-all duration-300'
        >
          Book Appointment
          <img className='w-3' src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* Right Side */}
      <div className='md:w-1/2 relative flex items-end justify-center'>
        <img
          className='w-full md:absolute bottom-0 h-auto rounded-lg object-cover drop-shadow-xl'
          src={assets.header_img}
          alt="Doctor"
        />
      </div>
    </div>
  )
}

export default Header
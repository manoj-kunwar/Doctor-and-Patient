// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'

// const Banner = () => {
//   const navigate = useNavigate();
//   const { token } = useContext(AppContext)

//   return (
//     <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

//       {/* ----------------- Left Side ----------------- */}
//       <div className='flex-1 py-8 sm:py-16 lg:py-24 lg:pl-5'>
//         <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
//           <p>Book Appointment</p>
//           <p className='mt-4'>With 100+ Trusted Doctors</p>
//         </div>

//         {/* Show "Create account" if not logged in, else "Book Now" */}
//         {!token
//           ? <button
//               onClick={() => { navigate('/login'); scrollTo(0, 0); }}
//               className='bg-white text-gray-600 px-8 py-3 rounded-full mt-6 text-sm sm:text-base hover:scale-105 transition-all'
//             >
//               Create account
//             </button>
//           : <button
//               onClick={() => { navigate('/doctors'); scrollTo(0, 0); }}
//               className='bg-white text-gray-600 px-8 py-3 rounded-full mt-6 text-sm sm:text-base hover:scale-105 transition-all'
//             >
//               Book Now
//             </button>
//         }
//       </div>

//       {/* ----------------- Right Side ----------------- */}
//       <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
//         <img
//           className='w-full absolute bottom-0 right-0 max-w-md'
//           src={assets.appointment_img}
//           alt=""
//         />
//       </div>

//     </div>
//   )
// }

// export default Banner

import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Banner = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext)

  return (
    <div className='flex bg-primary rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden relative'>

      {/* Decorative circles */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4'></div>
      <div className='absolute bottom-0 left-20 w-32 h-32 bg-white/5 rounded-full translate-y-1/2'></div>

      {/* Left Side */}
      <div className='flex-1 py-10 sm:py-16 lg:py-24 lg:pl-5 relative z-10'>

        {/* Badge */}
        <div className='flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full w-fit mb-5'>
          <span className='w-4 h-4 bg-green-400 rounded-full animate-pulse'></span>
          100+ Verified Doctors Available
        </div>

        {/* Heading */}
        <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
           <p>Find the Right Doctor</p>
          <p className='mt-2 text-white/90'>and Book Your Appointment Easily</p>
        </div>

        <p className='text-white/70 text-sm mt-4 max-w-xs hidden sm:block'>
        Fast, simple, and reliable — connect with trusted doctors and book your visit in minutes.
        </p>

        {/* CTA Button */}
        {!token
          ? <button
              onClick={() => { navigate('/login'); scrollTo(0, 0); }}
              className='flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full mt-6 text-sm font-semibold shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 hover:gap-3 active:scale-95 transition-all duration-300'
            >
              Create Account
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          : <button
              onClick={() => { navigate('/doctors'); scrollTo(0, 0); }}
              className='flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full mt-6 text-sm font-semibold shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 hover:gap-3 active:scale-95 transition-all duration-300'
            >
              Book Now
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
        }
      </div>

      {/* Right Side */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative z-10'>
        <img
          className='w-full absolute bottom-0 right-0 max-w-md drop-shadow-2xl'
          src={assets.appointment_img}
          alt="Appointment"
        />
      </div>

    </div>
  )
}

export default Banner
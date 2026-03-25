// import React from 'react'
// import { specialityData } from '../assets/assets'
// import { Link } from 'react-router-dom'

// const SpecialityMenu = () => {
//   return (
//     <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
//       <h1 className='text-3xl font-medium'>Find by Speciality</h1>
//       <p className='sm:w-1/3 text-center text-sm'>
//         Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
//       </p>

//       <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
//         {specialityData.map((item, index) => (
//           <Link
//             onClick={() => scrollTo(0, 0)}
//             className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
//             key={index}
//              to={`/doctors/${item.speciality}`} 
//           >
//             <img className='w-16 sm:w-24 mb-2' src={item.image} alt='' />
//             <p>{item.speciality}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default SpecialityMenu

import React, { useRef } from 'react'
import { specialityData } from '../assets/assets'
import { Link, useLocation } from 'react-router-dom'

const SpecialityMenu = () => {
  const location = useLocation()
  const scrollRef = useRef(null)

  const activeSpeciality = location.pathname.startsWith('/doctors/')
    ? decodeURIComponent(location.pathname.replace('/doctors/', ''))
    : null

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -250 : 250,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className='flex flex-col items-center gap-6 py-16 text-gray-800' id='speciality'>

        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Medical Specialities</h1>
          <p className='sm:w-1/2 text-sm text-gray-400 mt-2 mx-auto'>
           Access a trusted network of specialists, review their credentials, 
            and schedule consultations with confidence.
          </p>
        </div>
      {/* SLIDER WRAPPER */}
      <div className='relative w-full px-4'>

        {/* LEFT ARROW */}
        <button
          onClick={() => scroll('left')}
          className='absolute left-0 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition'
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* SCROLLABLE ITEMS */}
        <div
          ref={scrollRef}
          className='flex items-center gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4'
        >
          {specialityData.map((item, index) => {
            const isActive = activeSpeciality === item.speciality

            return (
              <Link
                key={index}
                to={`/doctors/${item.speciality}`}
                onClick={() => scrollTo(0, 0)}
                className='flex flex-col items-center gap-3 flex-shrink-0 group cursor-pointer'
              >
                {/* BIGGER CIRCLE */}
                <div
                  className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg
                  ${isActive
                      ? 'bg-primary border-2 border-primary shadow-lg shadow-primary/30'
                      : 'bg-[#EEF2FF] border-2 border-[#C7D2FE] group-hover:bg-primary/10 group-hover:border-primary/40'
                    }`}
                >
                  <img
                    src={item.image}
                    alt={item.speciality}
                    className={`w-14 sm:w-20 object-contain transition-transform duration-300 group-hover:scale-110
                    ${isActive ? 'brightness-0 invert' : ''}`}
                  />
                </div>

                {/* TEXT */}
                <p
                  className={`text-sm font-semibold text-center max-w-[100px]
                  ${isActive ? 'text-primary' : 'text-gray-600 group-hover:text-primary'}`}
                >
                  {item.speciality}
                </p>

                {/* ACTIVE DOT */}
                {isActive && (
                  <span className='w-1.5 h-1.5 rounded-full bg-primary -mt-2'></span>
                )}
              </Link>
            )
          })}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={() => scroll('right')}
          className='absolute right-0 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition'
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

      </div>
    </div>
  )
}

export default SpecialityMenu
import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken, getAllDoctors])

  return (
    <div className='p-6 h-[90vh] overflow-y-auto bg-gray-50'>
      
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>
        All Doctors
      </h1>

      <div className='flex flex-wrap gap-6'>
        
        {doctors.map((item, index) => (
          
          <div
            key={index}
            className='w-full sm:w-[48%] md:w-[30%] lg:w-[22%] bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden border border-gray-100 group'
          >

            {/* Image */}
            <div className='overflow-hidden'>
              <img
                className='w-full h-60 object-cover bg-indigo-50 group-hover:scale-105 transition-transform duration-500'
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Content */}
            <div className='p-4 space-y-1'>
              
              <p className='text-lg font-semibold text-gray-800'>
                {item.name}
              </p>

              <p className='text-sm text-indigo-600 font-medium'>
                {item.speciality}
              </p>

              <p className='text-xs text-gray-500'>
                {item.experience} experience
              </p>

              <p className='text-xs text-gray-500'>
                {item.degree}
              </p>

              {/* Availability */}
              <div className='mt-3 flex items-center justify-between'>
                
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.available 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-500'
                }`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>

                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  readOnly
                  className='w-4 h-4 accent-indigo-600 cursor-pointer'
                />

              </div>

            </div>
          </div>

        ))}

      </div>
    </div>
  )
}

export default DoctorsList
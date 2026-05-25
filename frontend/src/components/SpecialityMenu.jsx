import React from 'react'
import { specialityData } from '../assets/assets'
import { Link, useLocation } from 'react-router-dom'

const specialityDescriptions = {
  'General physician': 'Primary care',
  Gynecologist: "Women’s health",
  Dermatologist: 'Skin, hair & nails',
  Pediatricians: 'Child health',
  Neurologist: 'Brain & nervous system',
  Gastroenterologist: 'Digestive system',
  Cardiologist: 'Heart & blood vessels',
  Ophthalmologist: 'Eye care',
  Orthopedic: 'Bones & joints',
  Pathologist: 'Disease diagnosis',
  Pulmonologist: 'Lungs & breathing',
  Urologist: 'Urinary system',
}
const SpecialityMenu = () => {
  const location = useLocation()

  const activeSpeciality = location.pathname.startsWith('/doctors/')
    ? decodeURIComponent(location.pathname.replace('/doctors/', ''))
    : null

  return (
    <div
      className="w-full py-1 px-6 mt-10 bg-gray-50 text-center"
      id="speciality"
    >
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        Browse by Speciality
      </h1>

      <p className="text-gray-500 text-lg mb-12">
        Find the right specialist for your health needs
      </p>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {specialityData.map((item, index) => {
          const isActive = activeSpeciality === item.speciality

          return (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              onClick={() => window.scrollTo(0, 0)}
              className={`rounded-2xl border p-10 bg-white shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1
                ${
                  isActive
                    ? 'border-primary shadow-md'
                    : 'border-gray-200'
                }`}
            >
              {/* Image */}
              <div className="flex justify-center mb-6">
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-24 h-24 object-contain"
                />
              </div>

              {/* Title */}
              <h2
                className={`text-xl font-semibold mb-2 ${
                  isActive ? 'text-primary' : 'text-gray-800'
                }`}
              >
                {item.speciality}
              </h2>

              {/* Short Description */}
              <p className="text-gray-400 text-sm">
                {specialityDescriptions[item.speciality] || 'Specialist care'}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SpecialityMenu
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { specialityData } from "../assets/assets";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
    "Cardiologist", 
    "Ophthalmologist",
    "Orthopedic",
    "Pathologist",  
    "Pulmonologist",
    "Urologist",     

    
  ];

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Find a Doctor</h1>
          <p className="text-sm text-gray-400 mt-1">
            Search and book appointments with experienced and verified doctors near you.
          </p>
        </div>

      <div className="flex flex-col sm:flex-row items-start gap-6">

        {/* Mobile Filter Button */}
        <button
          className={`flex items-center gap-2 py-2 px-5 border rounded-full text-sm font-semibold sm:hidden transition-all duration-200 ${
            showFilter
              ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
              : "bg-white text-gray-600 border-gray-200 hover:border-primary/30 hover:text-primary"
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
          {showFilter ? "Hide Filters" : "Filters"}
        </button>

        {/* Sidebar Filters */}
        <div className={`flex flex-col gap-2 text-sm min-w-[180px] ${showFilter ? "flex" : "hidden sm:flex"}`}>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-1 hidden sm:block">
  Select Speciality
</p>
          {specialities.map((spec, index) => (
            <button
              key={index}
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 text-left font-medium
                ${speciality === spec
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-white text-gray-600 border border-gray-100 hover:border-primary/20 hover:text-primary hover:bg-primary/5"
                }`}
            >
              {/* Speciality icon from assets */}
              {specialityData?.find(s => s.speciality === spec) && (
                <img
                  src={specialityData.find(s => s.speciality === spec).image}
                  className={`w-6 h-6 object-contain ${speciality === spec ? 'brightness-0 invert' : ''}`}
                  alt=""
                />
              )}
              {spec}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-2 hover:border-primary/20 transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                {/* Image */}
                <div className="bg-primary/5 overflow-hidden">
                  <img
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Availability */}
                  <div className="flex items-center gap-1.5 text-xs text-green-500 font-semibold mb-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Available
                  </div>

                  {/* Name */}
                  <p className="text-gray-800 font-bold text-base leading-tight">{item.name}</p>

                  {/* Speciality */}
                  <p className="text-primary text-xs font-semibold mt-0.5">{item.speciality}</p>

                  {/* Degree & Experience */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <span className="text-xs text-gray-400 font-medium">{item.degree}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">{item.experience}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="mb-4 opacity-30">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p className="text-lg font-semibold">No doctors found</p>
              <p className="text-sm mt-1">Try a different speciality</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
// import { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { specialityData } from "../assets/assets";

// const Doctors = () => {
//   const { speciality } = useParams();
//   const navigate = useNavigate();
//   const [filterDoc, setFilterDoc] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const { doctors } = useContext(AppContext);

//   const applyFilter = () => {
//     if (speciality) {
//       setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
//     } else {
//       setFilterDoc(doctors);
//     }
//   };

//   useEffect(() => {
//     applyFilter();
//   }, [doctors, speciality]);

//   const specialities = [
//     "General physician",
//     "Gynecologist",
//     "Dermatologist",
//     "Pediatricians",
//     "Neurologist",
//     "Gastroenterologist",
//     "Cardiologist", 
//     "Ophthalmologist",
//     "Orthopedic",
//     "Pathologist",  
//     "Pulmonologist",
//     "Urologist",     

    
//   ];

//   return (
//     <div className="px-6 py-8 bg-gray-50 min-h-screen">

//       {/* Page Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Find a Doctor</h1>
//           <p className="text-sm text-gray-400 mt-1">
//             Search and book appointments with experienced and verified doctors near you.
//           </p>
//         </div>

//       <div className="flex flex-col sm:flex-row items-start gap-6">

//         {/* Mobile Filter Button */}
//         <button
//           className={`flex items-center gap-2 py-2 px-5 border rounded-full text-sm font-semibold sm:hidden transition-all duration-200 ${
//             showFilter
//               ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
//               : "bg-white text-gray-600 border-gray-200 hover:border-primary/30 hover:text-primary"
//           }`}
//           onClick={() => setShowFilter((prev) => !prev)}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//             <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
//           </svg>
//           {showFilter ? "Hide Filters" : "Filters"}
//         </button>

//         {/* Sidebar Filters */}
//         <div className={`flex flex-col gap-2 text-sm min-w-[180px] ${showFilter ? "flex" : "hidden sm:flex"}`}>
//           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-1 hidden sm:block">
//   Select Speciality
// </p>
//           {specialities.map((spec, index) => (
//             <button
//               key={index}
//               onClick={() =>
//                 speciality === spec
//                   ? navigate("/doctors")
//                   : navigate(`/doctors/${spec}`)
//               }
//               className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 text-left font-medium
//                 ${speciality === spec
//                   ? "bg-primary text-white shadow-md shadow-primary/25"
//                   : "bg-white text-gray-600 border border-gray-100 hover:border-primary/20 hover:text-primary hover:bg-primary/5"
//                 }`}
//             >
//               {/* Speciality icon from assets */}
//               {specialityData?.find(s => s.speciality === spec) && (
//                 <img
//                   src={specialityData.find(s => s.speciality === spec).image}
//                   className={`w-6 h-6 object-contain ${speciality === spec ? 'brightness-0 invert' : ''}`}
//                   alt=""
//                 />
//               )}
//               {spec}
//             </button>
//           ))}
//         </div>

//         {/* Doctors Grid */}
//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {filterDoc.length > 0 ? (
//             filterDoc.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
//                 className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-2 hover:border-primary/20 transition-all duration-300 cursor-pointer overflow-hidden group"
//               >
//                 {/* Image */}
//                 <div className="bg-primary/5 overflow-hidden">
//                   <img
//                     className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
//                     src={item.image}
//                     alt={item.name}
//                   />
//                 </div>

//                 {/* Content */}
//                 <div className="p-4">
//                   {/* Availability */}
//                   <div className="flex items-center gap-1.5 text-xs text-green-500 font-semibold mb-2">
//                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                     Available
//                   </div>

//                   {/* Name */}
//                   <p className="text-gray-800 font-bold text-base leading-tight">{item.name}</p>

//                   {/* Speciality */}
//                   <p className="text-primary text-xs font-semibold mt-0.5">{item.speciality}</p>

//                   {/* Degree & Experience */}
//                   <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
//                     <span className="text-xs text-gray-400 font-medium">{item.degree}</span>
//                     <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">{item.experience}</span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="mb-4 opacity-30">
//                 <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
//               </svg>
//               <p className="text-lg font-semibold">No doctors found</p>
//               <p className="text-sm mt-1">Try a different speciality</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctors;


import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [filterDoc, setFilterDoc] = useState([]);
  const [city, setCity] = useState("");
  const [minRating, setMinRating] = useState("");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");

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

  useEffect(() => {
    let filtered = doctors;

    // Filter by speciality from route
    if (speciality) {
      filtered = filtered.filter(
        (doc) => doc.speciality === speciality
      );
    }

    // Search by doctor name or speciality
    if (search) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(search.toLowerCase()) ||
          doc.speciality.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by city
    if (city) {
      filtered = filtered.filter((doc) =>
        doc.address?.city
          ?.toLowerCase()
          .includes(city.toLowerCase())
      );
    }

    // Filter by rating
    if (minRating) {
      filtered = filtered.filter(
        (doc) => (doc.rating || 0) >= Number(minRating)
      );
    }

    // Filter by fee
    if (minFee) {
      filtered = filtered.filter(
        (doc) => doc.fees >= Number(minFee)
      );
    }

    if (maxFee) {
      filtered = filtered.filter(
        (doc) => doc.fees <= Number(maxFee)
      );
    }

    setFilterDoc(filtered);
  }, [
    doctors,
    speciality,
    search,
    city,
    minRating,
    minFee,
    maxFee,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setMinRating("");
    setMinFee("");
    setMaxFee("");
    navigate("/doctors");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 mt-10 py-14 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Find Your Doctor
        </h1>

        <div className="max-w-2xl mx-auto bg-white rounded-full shadow-sm flex items-center px-10 py-2">
          <input
            type="text"
            placeholder="Search by name or speciality..."
            className="flex-1 outline-none text-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold">
            Search
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 px-8 py-8">
        {/* Left Sidebar */}
        <div className="w-full lg:w-72 bg-white rounded-2xl shadow-sm border p-6 h-fit">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-primary"
            >
              Clear
            </button>
          </div>

          {/* Specialty */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Specialty
            </label>
            <select
              className="w-full border rounded-xl px-4 py-3 outline-none"
              value={speciality || ""}
              onChange={(e) =>
                e.target.value
                  ? navigate(`/doctors/${e.target.value}`)
                  : navigate("/doctors")
              }
            >
              <option value="">Select Specialty</option>
              {specialities.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              placeholder="e.g. Mumbai"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Rating */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Min Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none"
            >
              <option value="">Any Rating</option>
              <option value="4">4+</option>
              <option value="3">3+</option>
              <option value="2">2+</option>
            </select>
          </div>

          {/* Fee Range */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fee Range (₹)
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Min"
                value={minFee}
                onChange={(e) => setMinFee(e.target.value)}
                className="w-1/2 border rounded-xl px-4 py-3 outline-none"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxFee}
                onChange={(e) => setMaxFee(e.target.value)}
                className="w-1/2 border rounded-xl px-4 py-3 outline-none"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Quick Filters
            </label>

            <div className="flex flex-wrap gap-2">
              {[
                "Cardiologist",
                "Dermatologist",
                "Neurologist",
                "Orthopedic",
                "Pediatricians",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(`/doctors/${item}`)}
                  className={`px-3 py-1 rounded-full border text-sm transition ${
                    speciality === item
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-primary/5"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Results */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">
            {filterDoc.length} Doctors Found
          </h2>

          {speciality && (
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm mb-10">
              {speciality}
            </span>
          )}

          {filterDoc.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterDoc.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/appointment/${item._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-white rounded-2xl border shadow-sm hover:shadow-md cursor-pointer overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-4">
                    <p className="font-bold text-lg">{item.name}</p>
                    <p className="text-primary text-sm">
                      {item.speciality}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {item.degree}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.fees}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] text-gray-400">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-3xl font-semibold">
                No doctors found
              </p>
              <p className="text-lg mt-2">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
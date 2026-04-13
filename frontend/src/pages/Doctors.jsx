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



// import { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const Doctors = () => {
//   const { speciality } = useParams();
//   const navigate = useNavigate();
//   const { doctors } = useContext(AppContext);

//   const [search, setSearch] = useState("");
//   const [filterDoc, setFilterDoc] = useState([]);
//   const [city, setCity] = useState("");
//   const [minRating, setMinRating] = useState("");
//   const [minFee, setMinFee] = useState("");
//   const [maxFee, setMaxFee] = useState("");

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

//   useEffect(() => {
//     let filtered = doctors;

//     if (speciality) {
//       filtered = filtered.filter((doc) => doc.speciality === speciality);
//     }

//     if (search) {
//       filtered = filtered.filter(
//         (doc) =>
//           doc.name.toLowerCase().includes(search.toLowerCase()) ||
//           doc.speciality.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (city) {
//       filtered = filtered.filter((doc) =>
//         doc.address?.city?.toLowerCase().includes(city.toLowerCase())
//       );
//     }

//     if (minRating) {
//       filtered = filtered.filter(
//         (doc) => (doc.rating || 0) >= Number(minRating)
//       );
//     }

//     if (minFee) {
//       filtered = filtered.filter((doc) => doc.fees >= Number(minFee));
//     }

//     if (maxFee) {
//       filtered = filtered.filter((doc) => doc.fees <= Number(maxFee));
//     }

//     setFilterDoc(filtered);
//   }, [doctors, speciality, search, city, minRating, minFee, maxFee]);

//   const clearFilters = () => {
//     setSearch("");
//     setCity("");
//     setMinRating("");
//     setMinFee("");
//     setMaxFee("");
//     navigate("/doctors");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ── Hero Search ── */}
//       <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-14 px-6 mt-10">
//         <h1 className="text-4xl font-semibold text-center text-gray-900 mb-2">
//           Find Your Doctor
//         </h1>
//         <p className="text-center text-gray-500 mb-8 text-sm">
//           Book appointments with top-rated specialists near you
//         </p>

//         <div className="max-w-2xl mx-auto flex items-center bg-white border border-gray-200 rounded-full shadow-sm px-5 py-1.5 gap-3">
//           <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
//           </svg>
//           <input
//             type="text"
//             placeholder="Search by name or speciality..."
//             className="flex-1 outline-none text-sm text-gray-700 py-2 bg-transparent placeholder-gray-400"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white text-sm font-medium px-6 py-2.5 rounded-full">
//             Search
//           </button>
//         </div>
//       </div>

//       {/* ── Main Layout ── */}
//       <div className="flex flex-col lg:flex-row gap-6 px-6 py-8 max-w-screen-xl mx-auto">

//         {/* ── Sidebar ── */}
//         <aside className="w-full lg:w-64 flex-shrink-0">
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm sticky top-6">

//             <div className="flex justify-between items-center mb-5">
//               <h2 className="font-semibold text-gray-800 text-base">Filters</h2>
//               <button
//                 onClick={clearFilters}
//                 className="text-xs text-blue-500 hover:text-blue-700 font-medium px-2 py-1 rounded hover:bg-blue-50 transition"
//               >
//                 Clear all
//               </button>
//             </div>

//             {/* Specialty */}
//             <div className="mb-4">
//               <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
//                 Specialty
//               </label>
//               <select
//                 className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
//                 value={speciality || ""}
//                 onChange={(e) =>
//                   e.target.value
//                     ? navigate(`/doctors/${e.target.value}`)
//                     : navigate("/doctors")
//                 }
//               >
//                 <option value="">All Specialties</option>
//                 {specialities.map((spec) => (
//                   <option key={spec} value={spec}>
//                     {spec}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* City */}
//             <div className="mb-4">
//               <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
//                 City
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Mumbai"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//               />
//             </div>

//             {/* Rating */}
//             <div className="mb-4">
//               <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
//                 Min Rating
//               </label>
//               <select
//                 value={minRating}
//                 onChange={(e) => setMinRating(e.target.value)}
//                 className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
//               >
//                 <option value="">Any Rating</option>
//                 <option value="4">⭐ 4+ Stars</option>
//                 <option value="3">⭐ 3+ Stars</option>
//                 <option value="2">⭐ 2+ Stars</option>
//               </select>
//             </div>

//             {/* Fee Range */}
//             <div className="mb-5">
//               <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
//                 Fee Range (₹)
//               </label>
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   placeholder="Min"
//                   value={minFee}
//                   onChange={(e) => setMinFee(e.target.value)}
//                   className="w-1/2 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Max"
//                   value={maxFee}
//                   onChange={(e) => setMaxFee(e.target.value)}
//                   className="w-1/2 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                 />
//               </div>
//             </div>

//             {/* Quick Filters */}
//             <div>
//               <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
//                 Quick Filters
//               </label>
//               <div className="flex flex-wrap gap-1.5">
//                 {["Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", "Pediatricians"].map(
//                   (item) => (
//                     <button
//                       key={item}
//                       onClick={() => navigate(`/doctors/${item}`)}
//                       className={`px-3 py-1 rounded-full border text-xs font-medium transition ${
//                         speciality === item
//                           ? "bg-blue-600 text-white border-blue-600"
//                           : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
//                       }`}
//                     >
//                       {item}
//                     </button>
//                   )
//                 )}
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* ── Results ── */}
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-3 mb-6">
//             <h2 className="text-2xl font-semibold text-gray-900">
//               {filterDoc.length} Doctors Found
//             </h2>
//             {speciality && (
//               <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-medium">
//                 {speciality}
//               </span>
//             )}
//           </div>

//           {filterDoc.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//               {filterDoc.map((item, index) => (
//                 <div
//                   key={index}
//                   onClick={() => {
//                     navigate(`/appointment/${item._id}`);
//                     window.scrollTo(0, 0);
//                   }}
//                   className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
//                 >
//                   {/* Image */}
//                   <div className="relative h-52 bg-gray-100 overflow-hidden">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
//                     />

//                     {/* Available badge */}
//                     <span
//                       className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ${
//                         item.available
//                           ? "bg-green-50 text-green-700 border border-green-200"
//                           : "bg-yellow-50 text-yellow-700 border border-yellow-200"
//                       }`}
//                     >
//                       {item.available ? "● Available" : "● Busy"}
//                     </span>

//                     {/* Experience badge */}
//                     {item.experience && (
//                       <span className="absolute bottom-3 left-3 text-xs bg-black/50 text-white px-2 py-0.5 rounded-md">
//                         {item.experience}
//                       </span>
//                     )}
//                   </div>

//                   {/* Info */}
//                   <div className="p-4">
//                     <p className="font-semibold text-gray-900 text-base leading-tight">
//                       {item.name}
//                     </p>
//                     <p className="text-blue-600 text-sm mt-0.5">{item.speciality}</p>
//                     <p className="text-xs text-gray-400 mt-1">{item.degree}</p>

//                     <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
//                       <span className="text-sm font-semibold text-gray-800">
//                         ₹{item.fees}
//                       </span>

//                       {item.rating && (
//                         <span className="flex items-center gap-1 text-xs text-gray-500">
//                           <span className="text-amber-400">★</span>
//                           {item.rating}
//                         </span>
//                       )}
//                     </div>

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         navigate(`/appointment/${item._id}`);
//                         window.scrollTo(0, 0);
//                       }}
//                       className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-medium rounded-xl transition-all"
//                     >
//                       Book Appointment
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center h-96 text-gray-400">
//               <div className="text-5xl mb-4">🔍</div>
//               <p className="text-xl font-semibold text-gray-500">No doctors found</p>
//               <p className="text-sm mt-1 text-gray-400">
//                 Try adjusting your filters or search terms
//               </p>
//               <button
//                 onClick={clearFilters}
//                 className="mt-5 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctors;


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
import { FaStar, FaRegStar } from "react-icons/fa";

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

    if (speciality) {
      filtered = filtered.filter((doc) => doc.speciality === speciality);
    }

    if (search) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(search.toLowerCase()) ||
          doc.speciality.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (city) {
      filtered = filtered.filter((doc) =>
        doc.address?.city?.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (minRating) {
      filtered = filtered.filter(
        (doc) => (doc.averageRating || 0) >= Number(minRating)
      );
    }

    if (minFee) {
      filtered = filtered.filter((doc) => doc.fees >= Number(minFee));
    }

    if (maxFee) {
      filtered = filtered.filter((doc) => doc.fees <= Number(maxFee));
    }

    setFilterDoc(filtered);
  }, [doctors, speciality, search, city, minRating, minFee, maxFee]);

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

      {/* ── Hero Search ── */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-14 px-6 mt-10">
        <h1 className="text-4xl font-semibold text-center text-gray-900 mb-2">
          Find Your Doctor
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Book appointments with top-rated specialists near you
        </p>

        <div className="max-w-2xl mx-auto flex items-center bg-white border border-gray-200 rounded-full shadow-sm px-5 py-1.5 gap-3">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or speciality..."
            className="flex-1 outline-none text-sm text-gray-700 py-2 bg-transparent placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white text-sm font-medium px-6 py-2.5 rounded-full">
            Search
          </button>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="flex flex-col lg:flex-row gap-6 px-6 py-8 max-w-screen-xl mx-auto">

        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm sticky top-6">

            <div className="flex justify-between items-center mb-5">
              <h2 className="font-semibold text-gray-800 text-base">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-xs text-blue-500 hover:text-blue-700 font-medium px-2 py-1 rounded hover:bg-blue-50 transition"
              >
                Clear all
              </button>
            </div>

            {/* Specialty */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Specialty
              </label>
              <select
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                value={speciality || ""}
                onChange={(e) =>
                  e.target.value
                    ? navigate(`/doctors/${e.target.value}`)
                    : navigate("/doctors")
                }
              >
                <option value="">All Specialties</option>
                {specialities.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                City
              </label>
              <input
                type="text"
                placeholder="e.g. Mumbai"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Min Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              >
                <option value="">Any Rating</option>
                <option value="4">⭐ 4+ Stars</option>
                <option value="3">⭐ 3+ Stars</option>
                <option value="2">⭐ 2+ Stars</option>
              </select>
            </div>

            {/* Fee Range */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Fee Range (₹)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minFee}
                  onChange={(e) => setMinFee(e.target.value)}
                  className="w-1/2 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxFee}
                  onChange={(e) => setMaxFee(e.target.value)}
                  className="w-1/2 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Quick Filters
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", "Pediatricians"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => navigate(`/doctors/${item}`)}
                      className={`px-3 py-1 rounded-full border text-xs font-medium transition ${
                        speciality === item
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Results ── */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {filterDoc.length} Doctors Found
            </h2>
            {speciality && (
              <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-medium">
                {speciality}
              </span>
            )}
          </div>

          {filterDoc.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filterDoc.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/appointment/${item._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
                >
                  {/* Image */}
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Available badge */}
                    <span
                      className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ${
                        item.available
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      }`}
                    >
                      {item.available ? "● Available" : "● Busy"}
                    </span>

                    {/* Experience badge */}
                    {item.experience && (
                      <span className="absolute bottom-3 left-3 text-xs bg-black/50 text-white px-2 py-0.5 rounded-md">
                        {item.experience}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 text-base leading-tight">
                      {item.name}
                    </p>
                    <p className="text-blue-600 text-sm mt-0.5">{item.speciality}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.degree}</p>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      {/* Star rating row */}
                      <div className="flex items-center justify-between mb-2">
                        {item.averageRating > 0 ? (
                          <div className="flex items-center gap-1">
                            <div className="flex gap-0.5">
                              {[1,2,3,4,5].map((s) =>
                                s <= Math.round(item.averageRating)
                                  ? <FaStar key={s} className="text-amber-400" size={11} />
                                  : <FaRegStar key={s} className="text-gray-300" size={11} />
                              )}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 ml-1">
                              {item.averageRating}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              ({item.totalReviews || 0})
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-0.5">
                            {[1,2,3,4,5].map((s) => <FaRegStar key={s} className="text-gray-200" size={11} />)}
                            <span className="text-[10px] text-gray-300 ml-1">No reviews</span>
                          </div>
                        )}
                        <span className="text-sm font-bold text-gray-800">₹{item.fees}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/appointment/${item._id}`);
                        window.scrollTo(0, 0);
                      }}
                      className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-medium rounded-xl transition-all"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-gray-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-xl font-semibold text-gray-500">No doctors found</p>
              <p className="text-sm mt-1 text-gray-400">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={clearFilters}
                className="mt-5 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
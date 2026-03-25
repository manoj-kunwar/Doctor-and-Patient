import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [Speciality, setSpeciality] = useState('General physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (!docImg) return toast.error('Image Not Selected');

            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', Speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } });

            if (data.success) {
                toast.success(data.message);
                setDocImg(false); setName(''); setPassword(''); setEmail('');
                setAddress1(''); setAddress2(''); setAbout(''); setDegree(''); setFees('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 bg-gray-50 hover:bg-white";
    const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1";

    return (
        <form onSubmit={onSubmitHandler} className="m-6 w-full">

            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Add New Doctor</h1>
                <p className="text-sm text-gray-400 mt-1">Fill in the details to register a new doctor</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-4xl overflow-hidden">

                {/* Top Banner */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-8 py-5 border-b border-primary/10">

                    {/* Image Upload */}
                    <div className="flex items-center gap-5">
                        <label htmlFor="doc-img" className="relative cursor-pointer group">
                            <img
                                className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md group-hover:opacity-80 transition-opacity"
                                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                                alt="Upload"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                                </svg>
                            </div>
                        </label>
                        <input type="file" id="doc-img" hidden onChange={(e) => setDocImg(e.target.files[0])} />
                        <div>
                            <p className="font-semibold text-gray-700">Doctor Photo</p>
                            <p className="text-xs text-gray-400 mt-0.5">Click to upload a profile picture</p>
                            {docImg && <p className="text-xs text-primary mt-1 font-medium">✓ Image selected</p>}
                        </div>
                    </div>
                </div>

                {/* Form Body */}
                <div className="px-8 py-6 max-h-[65vh] overflow-y-auto">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left Column */}
                        <div className="w-full lg:flex-1 flex flex-col gap-4">

                            <div className="flex flex-col gap-1">
                                <label className={labelClass}>Doctor Name</label>
                                <input onChange={(e) => setName(e.target.value)} value={name} className={inputClass} type="text" placeholder="Dr. John Smith" required />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className={labelClass}>Email Address</label>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} className={inputClass} type="email" placeholder="doctor@example.com" required />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className={labelClass}>Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} className={inputClass} type="password" placeholder="••••••••" required />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className={labelClass}>Experience</label>
                                <select onChange={(e) => setExperience(e.target.value)} value={experience} className={inputClass}>
                                    {Array.from({ length: 15 }, (_, i) => (
                                        <option key={i + 1} value={`${i + 1} Year`}>{i + 1} Year{i > 0 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className={labelClass}>Consultation Fees (₹)</label>
                                <input onChange={(e) => setFees(e.target.value)} value={fees} className={inputClass} type="number" placeholder="500" required />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="w-full lg:flex-1 flex flex-col gap-4">

                            <div className="flex flex-col gap-1">
                                <label className={labelClass}>Speciality</label>
                                <select onChange={(e) => setSpeciality(e.target.value)} value={Speciality} className={inputClass}>
                                    <option value="General physician">General Physician</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatricians">Pediatricians</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                     <option value="General physician">Cardiologist </option>
                                    <option value="Gynecologist">Orthalmologist</option>
                                    <option value="Dermatologist">Orthopedic</option>
                                    <option value="Pediatricians">Pathologist </option>
                                    <option value="Neurologist">Pulmonologist </option>
                                    <option value="Gastroenterologist">Urologist</option>
                                </select>
                            </div>
                    
                            <div className="flex flex-col gap-1">
                                <label className={labelClass}>Education / Degree</label>
                                <input onChange={(e) => setDegree(e.target.value)} value={degree} className={inputClass} type="text" placeholder="MBBS, MD" required />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className={labelClass}>Address</label>
                                <input onChange={(e) => setAddress1(e.target.value)} value={address1} className={inputClass} type="text" placeholder="Address Line 1" required />
                                <input onChange={(e) => setAddress2(e.target.value)} value={address2} className={`${inputClass} mt-2`} type="text" placeholder="Address Line 2" required />
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    <div className="flex flex-col gap-1 mt-6">
                        <label className={labelClass}>About Doctor</label>
                        <textarea
                            onChange={(e) => setAbout(e.target.value)}
                            value={about}
                            className={`${inputClass} resize-none`}
                            placeholder="Write a brief description about the doctor's expertise, achievements, and specializations..."
                            rows={4}
                            required
                        />
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex items-center gap-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold text-sm shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
                            </svg>
                            Add Doctor
                        </button>
                        <button
                            type="button"
                            onClick={() => { setDocImg(false); setName(''); setPassword(''); setEmail(''); setAddress1(''); setAddress2(''); setAbout(''); setDegree(''); setFees(''); }}
                            className="px-8 py-3 rounded-full border border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            Clear Form
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddDoctor;
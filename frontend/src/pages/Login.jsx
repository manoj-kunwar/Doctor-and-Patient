//  import React, { useState, useContext, useEffect } from 'react';
//  import { AppContext } from '../context/AppContext';
//  import axios from 'axios';
//  import { toast } from 'react-toastify';
//  import { useNavigate } from 'react-router-dom'

//  const Login = () => {
//    const { backendUrl, token, setToken } = useContext(AppContext);
//    const navigate  = useNavigate()

//    const [state, setState] = useState('Sign Up');
//    const [email, setEmail] = useState('');
//    const [password, setpassword] = useState('');
//    const [name, setName] = useState('');

//    const onSubmitHandler = async (event) => {
//      event.preventDefault();

//      try {
//        if (state === 'Sign Up') {
//          const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email });
//          if (data.success) {
//            localStorage.setItem('token', data.token);
//            setToken(data.token);
//          } else {
//            toast.error(data.message);
//          }
//        } else {
//          const { data } = await axios.post(backendUrl + '/api/user/login', { password, email });
//          if (data.success) {
//            localStorage.setItem('token', data.token);
//            setToken(data.token);
//          } else {
//            toast.error(data.message);
//          }
//        }
//      } catch (error) {
//        toast.error(error.message);
//      }
//    };

//    useEffect (() => {
//      if(token){
//        navigate('/')
//      }
//    },[token])

//    return (
//      <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center'>
//        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
//          <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
//          <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
//          {state === 'Sign Up' && (
//            <div className='w-full'>
//              <p>Full Name</p>
//              <input
//                className='border border-zinc-300 w-full p-2 mt-1'
//                type='text'
//                onChange={(e) => setName(e.target.value)}
//                value={name}
//                required
//              />
//            </div>
//          )}
//          <div className='w-full'>
//            <p>Email</p>
//            <input
//              className='border border-zinc-300 w-full p-2 mt-1'
//              type='email'
//              onChange={(e) => setEmail(e.target.value)}
//              value={email}
//              required
//            />
//          </div>
//          <div className='w-full'>
//            <p>Password</p>
//            <input
//              className='border border-zinc-300 w-full p-2 mt-1'
//              type='password'
//              onChange={(e) => setpassword(e.target.value)}
//              value={password}
//              required
//            />
//          </div>
//          <button className='bg-primary text-white w-full py-2 rounded-md text-base' type='submit'>
//            {state === 'Sign Up' ? 'Create Account' : 'Login'}
//          </button>
//          {state === 'Sign Up' ? (
//            <p>
//              Already have an account?{' '}
//              <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>
//                Login here
//              </span>
//            </p>
//          ) : (
//            <p>
//              Create a new account?{' '}
//              <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>
//                click here
//              </span>
//            </p>
//          )}
//        </div>
//      </form>
//    );
//  };

//  export default Login;


import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSignUp = state === "Sign Up";

  // Dynamic theme colors
  const themeColor = isSignUp ? "bg-emerald-600" : "bg-blue-600";
  const themeHover = isSignUp ? "hover:bg-emerald-700" : "hover:bg-blue-700";
  const rightPanelColor = isSignUp ? "bg-emerald-600" : "bg-blue-600";
  const textColor = isSignUp ? "text-emerald-600" : "text-blue-600";

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (isSignUp) {
        const { data } = await axios.post(
          backendUrl + "/api/user/register",
          { name, password, email }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/user/login",
          { password, email }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  const features = isSignUp
    ? [
        "Book appointments instantly",
        "Track your health history",
        "Get reminders & updates",
      ]
    : [
        "Access your appointments",
        "Manage your health profile",
        "Secure & private always",
      ];

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 py-12 bg-white">
        <div className="mb-10">
          <img src={assets.logo} alt="CareOS" className="h-10 w-auto" />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            {isSignUp
              ? "Sign up to start booking appointments."
              : "Sign in to access your dashboard."}
          </p>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-4 max-w-sm w-full"
        >
          {isSignUp && (
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${themeColor} ${themeHover} text-white font-semibold text-sm py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-150`}
          >
            {loading
              ? "Please wait..."
              : isSignUp
              ? "Create Account"
              : "Sign In"}
          </button>

          <p className="text-xs text-slate-500 text-center mt-1">
            {isSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
            <button
              type="button"
              onClick={() =>
                setState(isSignUp ? "Login" : "Sign Up")
              }
              className={`${textColor} font-semibold hover:underline`}
            >
              {isSignUp ? "Sign in" : "Create one"}
            </button>
          </p>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div
        className={`hidden lg:flex lg:w-1/2 ${rightPanelColor} flex-col items-center justify-center px-16 py-12 relative overflow-hidden`}
      >
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute bottom-[-80px] left-[-40px] w-96 h-96 rounded-full bg-white/10" />
        <div className="absolute bottom-[120px] right-[-30px] w-48 h-48 rounded-full bg-white/10" />

        <div className="relative z-10 text-center max-w-sm">
          <div className="w-20 h-20 rounded-3xl bg-white/20 border border-white/30 flex items-center justify-center mx-auto mb-8">
            <span className="text-white text-3xl">
              {isSignUp ? "👨‍⚕️" : "🛡️"}
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-3">
            {isSignUp ? "Join CareOS" : "Admin Control Center"}
          </h2>

          <p className="text-white/70 text-sm leading-relaxed mb-10">
            {isSignUp
              ? "Book appointments, manage your health records, and stay connected with your doctors."
              : "Manage doctors, appointments, and platform operations from one powerful dashboard."}
          </p>

          <div className="flex flex-col gap-3 w-full">
            {features.map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 bg-white/15 border border-white/20 rounded-xl px-5 py-3"
              >
                <span className="text-white">✓</span>
                <span className="text-white text-sm font-medium">
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
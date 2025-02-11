import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div>
      <div className='w-full p-5  flex justify-between items-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 shadow-2xl border-b border-purple-500/20'>
            <div className='logo flex items-center space-x-4'>
                <Link to="/">
                    <h1 className='text-3xl font-montserrat font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-200 transition-all duration-300 tracking-wider'>
                      DataEntry
                    </h1>
                </Link>
            </div>
            <div className='pr-10 flex justify-center items-center gap-8'>
                <Link to="/data">
                    <button className='font-["Poppins"] px-7 py-3 rounded-xl bg-purple-900/50 text-purple-200 hover:bg-purple-800/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg shadow-purple-500/20 border border-purple-500/20 backdrop-blur-sm'>
                      Data
                    </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar

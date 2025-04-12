import { useState } from 'react'
import {FaHome,FaShoppingCart,FaBox, FaSignInAlt ,FaUserAlt, FaCog, FaBars} from 'react-icons/fa'
import {IoCloseSharp} from 'react-icons/io'
import {Link} from 'react-router-dom'

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false)


  return (
    <div className="flex">
        <div className="w-20 md:w-64 bg-gray-800 transition-width duration-300 text-white">
            <div className="flex justify-between items-center p-4">
                <h2 className={`text-xl font-bold hidden md:block ${isOpen ? "block" : "hidden"}`}>POS</h2>
                <button className='block md:hidden' onClick={()=> setIsOpen(!isOpen)}>
                   {isOpen ? <IoCloseSharp size={18} /> : <FaBars size={18}/> } 
                </button>
            </div>

            <nav className="mt-4">
                <ul>
                    <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                        <FaHome size={18}/>
                        <span className='ml-4 hidden md:block'>Home</span>
                    </li>
                    <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                        <FaShoppingCart size={18}/>
                        <span className='ml-4 hidden md:block'>Ventas</span>
                    </li>
                    <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                        <FaBox size={18}/>
                        <span className='ml-4  hidden md:block'>Productos</span>
                    </li>
                    <li className="flex  items-center p-4 hover:bg-gray-700 cursor-pointer">
                        <FaSignInAlt size={18}/>
                        <span className='ml-4 hidden md:block'>Login</span>
                    </li>

                </ul>
            </nav>
        </div>
        {/* Dashboard */}
        <div className='p-8 bg-gray-100 min-h-screen flex-1'>
            <h2 className='text-2xl font-bold'>Dashboard</h2>
            <p className=''>Dashboard to the right side</p>

        </div>
    </div>
  )
}

export default Sidebar

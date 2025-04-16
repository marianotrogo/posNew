import { useState } from 'react'
import {FaHome,FaShoppingCart,FaBox, FaSignInAlt ,FaUserAlt, FaCog, FaBars} from 'react-icons/fa'
import {IoCloseSharp} from 'react-icons/io5'
import {Link} from 'react-router-dom'

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false)


  return (
    <div className="flex">
        <div className={`fixed top-0 left-0 h-full md:w-64 bg-gray-800 transition-width duration-300 text-white
            ${isOpen ? "w-64" : "w-20"}
            `}>
            <div className="flex justify-between items-center p-4">
                <h2 className={`text-xl font-bold  md:block ${isOpen ? "block" : "hidden"}`}>POS</h2>
                <button className='block md:hidden' onClick={()=> setIsOpen(!isOpen)}>
                   {isOpen ? <IoCloseSharp size={18} /> : <FaBars size={18}/> } 
                </button>
            </div>

            <nav className="mt-4">
                <ul>
                    <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                        <FaHome size={18}/>
                        <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Home</span>
                    </li>
                    <Link to={'/sales'} className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                        <FaShoppingCart size={18}/>
                        <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Ventas</span>
                    </Link>
                    <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                        <FaBox size={18}/>
                        <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Productos</span>
                    </li>
                    <Link to={'/login'} className="flex  items-center p-4 hover:bg-gray-700 cursor-pointer">
                        <FaSignInAlt size={18}/>
                        <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Login</span>
                    </Link>

                </ul>
            </nav>
        </div>
        {/* Dashboard */}
        {/* <div className='ml-20 md:ml-64 p-8 bg-gray-100 min-h-screen flex-1'>
            <h2 className='text-2xl font-bold'>Dashboard</h2>
            <p className=''>Dashboard to the right side</p>

        </div> */}
    </div>
  )
}

export default Sidebar

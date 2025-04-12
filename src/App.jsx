import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Sales from './pages/Sales'
import Products from './pages/Products'
import Login from './pages/Login'

const App = () => {
  return (
    <Router>
      <div className='flex'>
        <Sidebar/>
        <div className='md:ml-64 p-6 w-full'>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/sales' element={<Sales/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

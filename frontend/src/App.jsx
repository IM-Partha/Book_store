
import './App.css'
import Course from './components/Course'
import { BrowserRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import Home from './components/Home'
import {Routes ,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login-credential/Login'
import Signup from './components/Login-credential/Signup'
import Cart from './components/Cart'
import Spinner from './components/Spinner'
import About from './components/About'
function App() {


  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/course' element={<Course/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/singup' element={<Signup/>} />
      <Route path='/spinner' element={<Spinner/>} />
      <Route path='/about' element={<About/>} />
    </Routes>
    <Toaster />
    <Footer/>
    </BrowserRouter>
    

    </>
  )
}

export default App

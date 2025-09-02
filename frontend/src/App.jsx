
import './App.css'
import Shop from './components/Shop'
import { BrowserRouter } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import Home from './components/Home'
import {Routes ,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login-credential/Login'
import Signup from './components/Login-credential/Signup'
import Cart from './components/Cart'

import About from './components/About'
import PaymentButton from './components/PaymentButton';
import CheckoutPage from './components/CheckoutPage';
function App() {


  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/shop' element={<Shop/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/singup' element={<Signup/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/paymentbutton' element={<PaymentButton/>} />
      <Route path='/checkout' element={<CheckoutPage/>} />
    </Routes>
    <Toaster />
    <Footer/>
    </BrowserRouter>
    

    </>
  )
}

export default App

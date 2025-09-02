import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Navbar.css";
import Login from "./Login-credential/Login";
import Signup from "./Login-credential/Signup";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "./store/searchSlice";



const Navbar = () => {
  const navigate = useNavigate(); 
  const itemcounter = useSelector((state) => state.cart.cartItems);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);

  const products = useSelector((state)=>state.cart)
  const dispatch = useDispatch()
  const query = useSelector((state)=>state.search.query) 
  

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); 
    navigate("/"); 
    
  };

  const navItems = (
    <>
      <li><Link to={"/"}>Home</Link></li>
      <li><Link to={"/shop"}>Shop</Link></li>
      <li><Link to={"/about"}>About</Link></li>
      <li className="indicator">
        <Link to={'/cart'}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {
            itemcounter.length>0 ?
            <span className="badge bg-red-500 text-white badge-sm indicator-item cursor-pointer">{itemcounter.length}</span>
            :
            null
          }
        </Link>
      </li>
    </>
  );

  // useEffect(()=>{
  //   function setSearchTerm(event){
  //     const filter data = 
  //   }
  // },[])

  return (
    <div className="navbar-container">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navItems}
            </ul>
          </div>
          <a className="text-2xl font-bold cursor-pointer">Book Store</a>
        </div>

        <div className="navbar-end space-x-3">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>

          {/* Search Box */}
          <div className="hidden md:block">
            <label className="input">
              <svg className="h-[1.2em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              // onChange={(e) => setSearchTerm(e.target.value)}
              type="search" 
              value={query}
              className="grow outline-none rounded-md px-1 w-50 dark:bg-slate-900 dark:text-white" placeholder="Search" />
            </label>
          </div>

          {/* Theme Toggle */}
          <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="synthwave" />
            <svg
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="swap-on h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          
          {!isLoggedIn ? (
            <>
              <div>
                <a className="px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer bg-black text-white"
                  onClick={() => document.getElementById("my_modal_3").showModal()}>
                  Login
                </a>
                <Login setIsLoggedIn={setIsLoggedIn} />
              </div>

              <div>
                <a className="px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer bg-pink-500 text-white"
                  onClick={() => document.getElementById("signup_modal").showModal()}>
                  Signup
                </a>
                <Signup />
              </div>
            </>
          ) : (
            <button onClick={handleLogout} className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-700 duration-300">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

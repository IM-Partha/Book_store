import { useEffect, useState } from "react";
import { addToCart } from "./store/cartSlice";
import { setProducts } from "./store/productsSlice"; // ✅ keep products separate
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BaseURL } from "../Api";

const Shop = () => {
  const dispatch = useDispatch();


  const searchQuery = useSelector((state) => state.search.query);
  const products = useSelector((state) => state.products.items);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchBooks(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchBooks = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BaseURL}/api/books`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const booksData = response?.data?.data || [];
      dispatch(setProducts(booksData));
    } catch (error) {
      setError("Unable to load books. Please try again later.");
      console.error(`Unable to get the data ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`, {
      duration: 1000,
      position: "top-center",
    });
  };


  const filteredBooks = products.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 text-center">
        {!isLoggedIn ? (
          <h1 className="text-2xl font-semibold md:text-4xl text-gray-800">
            Please Login
          </h1>
        ) : (
          <>
            <h1 className="text-2xl font-semibold md:text-4xl">
              We're delighted to have you{" "}
              <span className="text-pink-500">Here!</span>
            </h1>
            <p className="mt-8 mb-10 md:text-lg text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <Link
              to="/"
              className="hover:bg-pink-700 duration-300 mt-8 cursor-pointer bg-pink-500 text-white rounded px-6 py-3"
            >
              Back
            </Link>
          </>
        )}
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {isLoggedIn && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((item, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg rounded-lg overflow-hidden hover:scale-105 cursor-pointer transition-all duration-300"
              >
                <figure>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[200px] h-[250px] object-cover"
                  />
                </figure>
                <div className="card-body p-6">
                  <h2 className="card-title text-xl font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-md text-gray-600">Price: ₹{item.price}</p>
                  <div className="card-actions mt-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="btn btn-primary w-full py-2"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;

import  { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

const Spinner = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        // Redirect to home and refresh page
        window.location.href = '/';
      }, 1000);
    }, 3000);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {loading ? (
        <BeatLoader color="#36d7b7" />
      ) : (
        <>
          <h2 className='text-2xl font-semibold mb-4'>Order Successful</h2>
          <p>Your Order Successfully Placed</p>
        </>
      )}
    </div>
  );
}

export default Spinner;

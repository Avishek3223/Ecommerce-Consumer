import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../Context/Context';

const Navbar = () => {
  const [isListVisible, setIsListVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 950);
  const location = useLocation();
  const {cartLength } = useContext(Context);
  console.log(cartLength)

  
  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  useEffect(() => {
    if (isSmallScreen) {
      setIsListVisible(false);
    }
  }, [location, isSmallScreen]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 950);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center p-3 bg-[#181818] text-[#dddddd]">
        <div>Ecommerce</div>
        <div>
          <ul className={`flex gap-7 max950:flex-col max950:absolute right-0 max950:w-full max950:p-10 max950:text-[1.3rem] max950:h-screen z-[2] cursor-pointer ${isListVisible ? 'max950:bg-[#181818]' : ''}`}>
            {isListVisible && (
              <>
                {/* Use Link to navigate to different pages */}
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/products">All Products</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li>
                  <Link className='flex gap-2' to="/Cart">
                    Cart
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>({cartLength})
                </Link>
                </li>
              </>
            )}
          </ul>
          <div className='min950:hidden max950:visible relative top-1 right-3 z-10'>
            {/* Show toggle icon only when screen size is below 950px */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 cursor-pointer block z-[10] min950:hidden" onClick={toggleListVisibility}>
              {isListVisible ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

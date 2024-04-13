import React from 'react'
import Navbar from '../Components/Home/Navbar'
// import headphone from '../Assets/headphone.png'
import NewArrivals from '../Components/Home/NewArrivals'
import Footer from '../Components/Home/Footer'
import headset3 from '../Assets/headset3.png'

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className='bg-[#fffcf4] p-6 flex justify-around max950:flex-col-reverse max950:items-center'>
                {/* <img className='w-[50vw]' src={laptop} alt="" /> */}
                <div className='flex flex-col justify-between items-center'>
                    <div className='min1414:mt-[3rem]'>
                        <p className='text-[1.6vw] ml-8 tracking-[14px] text-center font-[400] max950:text-[2vw] mt-2 min1414:tracking-[25px] min1414:mb-[-4rem] max600:ml-0 max600:text-[3vw]'>NEW ARRIVAL</p>
                        <p className='text-[12vw] tracking-[2px] font-[600] stroke mt-[-2rem] max950:text-[20vw] max950:tracking-[8px] max600:mt-[-1rem] max600:text-[30vw]'>SALE</p>
                        <p className='text-[4.5vw] text-center font-[500] mt-[-1rem] max950:text-[8vw] min1414:mt-[-5rem] max600:text-[12vw] max600:mt-[-2rem]'>HEADPHONE</p>
                        <p className='text-[4.5vw] font-[600] text-center text-[#a038ff] max950:text-[8vw]'>50% OFF</p>
                    </div>
                    <div className="flex gap-4 justify-center mt-7 ">
                        <button className='bg-[#141414] flex text-white p-3 gap-2 rounded-tr-[12px] rounded-bl-[12px]'>ADD TO CART  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg></button>
                        <button className='bg-[#141414] text-white p-3 px-8 rounded-tr-[12px] rounded-bl-[12px]'>BUY NOW</button>
                    </div>
                </div>
                <img className='w-[40%] max-w-[100%] max950:w-[50%] max600:w-[100%]' src={headset3} alt="" />
            </div>
            <NewArrivals />
            <div className='pt-4 mt-9'>
                <Footer />
            </div>
        </div>
    )
}

export default Home
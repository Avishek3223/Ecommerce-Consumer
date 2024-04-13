import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import Loader from './Basic/Loader';

const Authentication = () => {
    const { setIsLoggedIn, setUser, user } = useContext(Context)
    const [isRegister, setIsRegister] = useState(true);
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        console.log(user)
        if (storedUser && storedIsLoggedIn) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(JSON.parse(storedIsLoggedIn));
            setIsLoggedIn(true)
            setUser(storedUser)
            Navigate('/home');
        }
        // eslint-disable-next-line
    }, [])

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when form is submitted
        if (isRegister) {
            if (formData.password !== formData.confirmPassword) {
                setLoading(false); // Set loading to false if there's an error
                alert('Passwords do not match');
                return;
            }

            try {
                const response = await fetch('https://ecommerce-seller.onrender.com/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    setLoading(false); // Set loading to false if there's an error
                    throw new Error('Failed to register user');
                }

                const data = await response.json();
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('user', JSON.stringify(formData))
                setIsLoggedIn(true);
                setUser(data);
                console.log(data);
                Navigate('/home');
            } catch (error) {
                console.error('Error:', error);
                setLoading(false); // Set loading to false if there's an error
                // Optionally, display an error message to the user
            }
        } else {
            try {
                const response = await fetch(`https://ecommerce-seller.onrender.com/api/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    setLoading(false); // Set loading to false if there's an error
                    throw new Error('Failed to login user');
                }

                const userData = await response.json();
                console.log(userData);

                // Iterate through each user
                for (const user of userData) {
                    // Check if the provided email matches the user's email
                    if (user.email === formData.email) {
                        // Compare passwords
                        if (user.password === formData.password) {
                            setIsLoggedIn(true);
                            setUser(user);
                            console.log('Successfully logged in');

                            // Set user data in local storage
                            localStorage.setItem('isLoggedIn', true);
                            localStorage.setItem('user', JSON.stringify(user));

                            Navigate('/home');
                            return; // Exit the loop if login is successful
                        } else {
                            setLoading(false); // Set loading to false if there's an error
                            alert('Incorrect password');
                            return; // Exit the loop if password is incorrect
                        }
                    }
                }

                setLoading(false); // Set loading to false if user not found
                alert('User not found');
            } catch (error) {
                console.error('Error:', error);
                setLoading(false); // Set loading to false if there's an error
                // Optionally, display an error message to the user
            }
        }
    };


    const toggleForm = () => {
        setIsRegister(prevState => !prevState);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {loading ? (
                <Loader />
            ) : (
                <div className='min-w-[25rem] h-content'>
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center bg-[#ffffff] p-8 border-2 rounded-lg">
                        {isRegister ? (
                            <div>
                                <p className='text-[1.3rem] font-light mb-2'>Welcome !</p>
                                <h2 className='text-[2rem] font-[500] mb-2'>Sign up for</h2>
                                <p>the ultimate Ecommerce adventure!</p>
                            </div>
                        ) : (
                            <div>
                                <p className='text-[1.3rem] font-light mb-2'>Welcome !</p>
                                <h2 className='text-[2rem] font-[500] mb-2'>Login in for</h2>
                                <p>the ultimate Ecommerce adventure!</p>
                            </div>
                        )}
                        <div className="mb-6 mt-8">
                            <label className="block text-[#242424] text-[1.1rem] font-[400] mb-2" htmlFor="email">Email:</label>
                            <input placeholder='Enter your email' type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border-[0.1px] border-black h-[3rem] px-3 py-2 rounded-[6px] text-gray-700" />
                        </div>
                        {isRegister && ( // Render additional inputs for register form
                            <>
                                <div className="mb-6">
                                    <label className="block text-[#242424] text-[1.1rem] font-[400] mb-2" htmlFor="username">Username:</label>
                                    <input placeholder='Enter your name' type="text" name="username" value={formData.username} onChange={handleChange} required className="w-full border-[0.1px] border-black h-[3rem] px-3 py-2 rounded-[6px] text-gray-700" />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-[#242424] text-[1.1rem] font-[400] mb-2" htmlFor="username">Phone Number:</label>
                                    <input placeholder='Enter your phoneNumber' type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full border-[0.1px] border-black h-[3rem] px-3 py-2 rounded-[6px] text-gray-700" />
                                </div>
                            </>
                        )}
                        <div className="mb-6">
                            <label className="block text-[#242424] text-[1.1rem] font-[400] mb-2" htmlFor="password">Password:</label>
                            <input placeholder='Enter your password' type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full border-[0.1px] border-black h-[3rem] px-3 py-2 rounded-[6px] text-gray-700" />
                        </div>
                        {isRegister && ( // Render confirmPassword input for register form
                            <div className="mb-6">
                                <label className="block text-[#242424] text-[1.1rem] font-[400] mb-2" htmlFor="confirmPassword">Confirm Password:</label>
                                <input placeholder='Confirm your password' type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full border border-black h-[3rem] px-3 py-2 rounded-[6px] text-gray-700" />
                            </div>
                        )}
                        <button type="submit" className="bg-[#1f1f1f] text-white w-full hover:bg-[#383838] tracking-[1px] font-[400] py-3 px-4 rounded focus:outline-none focus:shadow-outline">{isRegister ? 'Register' : 'Login'}</button>
                        <div className='flex gap-1 justify-center mt-2 font-[300]'>
                            {isRegister ? (
                                <div>Already have an account ?</div>
                            ) : (
                                <div>Don't have an account</div>
                            )}
                            <button onClick={toggleForm} className=" text-[#000000] hover:text-[gray] font-[600] rounded focus:outline-none focus:shadow-outline">{isRegister ? 'Login' : 'Register'}</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
export default Authentication;

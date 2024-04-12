import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
    const { setIsLoggedIn, setUser, isLoggedIn,user } = useContext(Context)
    const [isRegister, setIsRegister] = useState(true);
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
        if (isRegister) {
            if (formData.password !== formData.confirmPassword) {
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
                            alert('Incorrect password');
                            return; // Exit the loop if password is incorrect
                        }
                    }
                }

                // If the loop finishes without finding a matching user, alert user not found
                alert('User not found');
            } catch (error) {
                console.error('Error:', error);
                // Optionally, display an error message to the user
            }
        }
    };

    const toggleForm = () => {
        setIsRegister(prevState => !prevState);
    };

    return (
        <div className="authentication">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 mt-10 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                {isRegister && ( // Render additional inputs for register form
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username:</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} required className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Phone Number:</label>
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    </>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                {isRegister && ( // Render confirmPassword input for register form
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                )}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{isRegister ? 'Register' : 'Login'}</button>
                <div className='flex gap-2 justify-center mt-2'>
                    {isRegister ? (
                        <div>If already Registered then</div>
                    ) : (
                        <div>Don't have an account</div>
                    )}
                    <button onClick={toggleForm} className=" text-[#87ff57] hover:text-[gray] font-bold rounded focus:outline-none focus:shadow-outline">{isRegister ? 'Login' : 'Register'}</button>
                </div>
            </form>
        </div>
    );
};
export default Authentication;

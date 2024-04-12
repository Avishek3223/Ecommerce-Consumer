import React, { useContext } from 'react';
import axios from 'axios';
import { Context } from '../../Context/Context';

const AddToCart = ({ productId }) => {
    const { user, fetchUserData } = useContext(Context);

    const addToCart = async () => {
        try {
            if (!user || !user.email || !user.password) {
                alert('User data is not available or password is missing. Please log in to add the product to your cart.');
                return;
            }

            const requestBody = {
                productId,
                userData: {
                    email: user.email,
                    password: user.password,
                    ...user 
                }
            };

            await axios.put('https://ecommerce-seller.onrender.com/api/user', requestBody);
            alert('Product added to cart successfully!');
            fetchUserData(); // Call fetchUserData after adding the product to the cart
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('An error occurred while adding the product to cart. Please try again later.');
        }
    };

    return (
        <div className="p-2 bg-[#1d1d1d] text-white rounded-[4px] flex items-center" onClick={addToCart}>
            Add to cart &raquo;
        </div>
    );
};

export default AddToCart;

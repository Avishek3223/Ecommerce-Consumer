import React, { useContext, useState, useEffect } from 'react';
import remove_icon from '../../Assets/cart_cross_icon.png';
import { Context } from '../../Context/Context';
import Navbar from '../Home/Navbar';
import axios from 'axios';

function CartItems() {
    const { products, user, updateUser } = useContext(Context);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (user && products.length > 0) {
            // Create a map to store product IDs and their occurrences
            const productMap = {};
            
            // Count the occurrences of each product ID in the cart
            user.cart.forEach((itemId) => {
                if (!productMap[itemId]) {
                    productMap[itemId] = 1;
                } else {
                    productMap[itemId]++;
                }
            });
    
            // Map the product IDs to their corresponding product objects and add the quantity
            const cartItems = Object.keys(productMap).map((itemId) => {
                const product = products.find((p) => p._id === itemId);
                return { ...product, quantity: productMap[itemId] };
            });
    
            setCartItems(cartItems);
    
            // Calculate total price
            const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            setTotalPrice(total);
        }
    }, [user, products]);
    

    const removeFromCart = async (productId) => {
        try {
            // Make a DELETE request to the backend API to remove the item from the cart
            await axios.delete(`https://ecommerce-seller.onrender.com/api/user?userId=${user._id}&productId=${productId}`);

            // Update the local user state to reflect the changes
            const updatedCart = user.cart.filter((itemId) => itemId !== productId);
            updateUser({ ...user, cart: updatedCart });
        } catch (error) {
            console.error('Error removing item from cart:', error);
            // Handle error
        }
    };

    const getProductQuantity = (productId) => {
        // Count the number of occurrences of productId in the cart
        return user.cart.filter((itemId) => itemId === productId).length;
    };

    return (
        <div>
            <Navbar />
            <div className='w-[80vw] m-auto mt-[9rem] max950:mt-0'>
                <div className="grid grid-cols-6 items-center text-[1.3rem] text-gray-700 font-semibold max950:hidden">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr className="my-3 border" />
                {cartItems.map((product) => (
                    <div key={product._id}>
                        <div className="grid grid-cols-6 items-center font-[500] text-[#707070] text-[1.1rem] max950:w-full max950:flex max950:flex-col gap-6">
                            <div className='flex items-center justify-evenly w-full min950:hidden'>
                                <img src={product.thumbnail} alt="" className="h-[5rem]" />
                                <p>{product.title}</p>
                            </div>
                            <img src={product.thumbnail} alt="" className="h-[5rem] max950:hidden" />
                            <p className='max950:hidden'>{product.title}</p>
                            <div className='flex items-center justify-evenly w-full min950:hidden'>
                                <p>Price :</p>
                                <p>${product.price}</p>
                            </div>
                            <p className='max950:hidden'>${product.price}</p>
                            <div className='flex items-center justify-evenly w-full min950:hidden'>
                                <p>Quantity :</p>
                                <p >{getProductQuantity(product._id)}</p>
                            </div>
                            <p className='border px-4 py-2 w-11 max950:hidden'>{getProductQuantity(product._id)}</p>
                            <div className='flex items-center justify-evenly w-full min950:hidden'>
                                <p>Total price :</p>
                                <p>${product.price * getProductQuantity(product._id)}</p>
                            </div>
                            <p className='max950:hidden'>${product.price * getProductQuantity(product._id)}</p>
                            <img src={remove_icon} alt="" className="w-4 h-4 text-center cursor-pointer" onClick={() => removeFromCart(product._id)} />
                        </div>
                        <hr className="my-6 border" />
                    </div>
                ))}
                <div className="flex mt-8 justify-between max950:flex-col-reverse max950:items-center max950:gap-6">
                    <div className="flex flex-col w-[40vw] mr-16 max950:w-[75vw] max950:mr-0">
                        <h1 className="text-[2.1rem] font-bold text-[#2e2e2e]">Cart Total</h1>
                        <div className="mt-4 flex flex-col gap-5 text-[1.15rem] font-[500] text-[#797979]">
                            <div className="flex justify-between ">
                                <p>Subtotal</p>
                                <p>${totalPrice}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Shipping Fee</p>
                                <p>Free</p>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between">
                                <h3>Total</h3>
                                <h3>${totalPrice}</h3>
                            </div>
                        </div>
                        <button className="w-64 h-16 mt-4 bg-red-500 text-white font-semibold text-lg rounded cursor-pointer max950:mx-auto max950:mb-5">PROCEED TO CHECKOUT</button>
                    </div>
                    <div className="flex flex-col w-[30vw] justify-center max950:w-[80vw]">
                        <p className="text-[#6d6d6d] text-[1.15rem]">If you have a promo code, Enter it here</p>
                        <div className="mt-2 flex">
                            <input type="text" placeholder='Promo code' className="w-full h-16 bg-[#e4e4e4] text-[#585858] font-[500] border border-gray-300 rounded-l px-4" />
                            <button className="w-[15rem] h-16 bg-black text-white font-semibold text-lg rounded-r cursor-pointer">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;

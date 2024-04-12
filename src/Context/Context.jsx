import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const Context = createContext({});

const ContextProvider = ({ children }) => {
  const [newProducts, setNewProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartLength, setCartLength] = useState(0);

  // Function to fetch product data
  const fetchData = async () => {
    try {
      const response = await axios.get("https://ecommerce-seller.onrender.com/api/products");
      const sortedProducts = response.data.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      const newArrivals = sortedProducts.slice(0, 10);
      setNewProducts(newArrivals);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Function to fetch category data
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://ecommerce-seller.onrender.com/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
      if (storedIsLoggedIn) {
        setIsLoggedIn(true);
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);

        // Fetch user data from the API to ensure it's up to date
        const response = await axios.get(
          `https://ecommerce-seller.onrender.com/api/user?id=${storedUser._id}`
        );
        setUser(response.data);
        const cartItems =
          response.data && response.data.cart ? response.data.cart.length : 0;
        setCartLength(cartItems);

        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to update user data
  const updateUser = async (updatedUser) => {
    try {
      // Update user data in the state
      setUser(updatedUser);
      // Update user data in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchUserData();
  }, []);

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        newProducts,
        products,
        categories,
        cartLength,
        fetchUserData,
        updateUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

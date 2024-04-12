// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Authentication from './Components/Authentication';
import AllProducts from './Pages/AllProducts';
import ProductDisplay from './Components/ProductDisplay';
import Categories from './Pages/Categories';
import CartItems from './Components/Cart/CartItems';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path='/productsdisplay' element={<ProductDisplay />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/cart' element={<CartItems/>} />
      </Routes>
    </Router>
  );
};

export default App;
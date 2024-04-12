import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/Home/Navbar';
import { Context } from '../Context/Context';
import Card from '../Components/Basic/Card';

const Categories = () => {
  const { categories, products } = useContext(Context);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    if (categories.length > 0 && products.length > 0) {
      // Initialize an array to hold category names and their corresponding products
      const categorizedProducts = categories.map(category => {
        // Filter products for each category
        const categoryProducts = products.filter(product => product.category === category._id);
        return { categoryName: category.name, products: categoryProducts };
      });
      // Update state with categorized products
      setCategoryProducts(categorizedProducts);
    }
  }, [categories, products]);

  return (
    <div>
      <Navbar />
      {/* Render categorized products */}
      {categoryProducts.map(category => (
        <div key={category.categoryName}>
          <h1 className='mb-9 mt-[9rem]'>{category.categoryName}</h1>
          <div className='flex gap-9 justify-center flex-wrap'>
            {category.products.map(product => (
              <div key={product._id}>
                <Card
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  thumbnail={product.thumbnail}
                  offer={product.offer}
                  id={product._id}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '../Basic/Card';
import { Context } from '../../Context/Context';

function NewArrivals() {
  const { user, newProducts } = useContext(Context)
  console.log(user);


  if (!newProducts.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='my-3 mt-[6rem]'>NEW ARRIVALS</h1>
      <div className="flex gap-8 flex-wrap justify-center">
        {newProducts.map((product, index) => (
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
  );
}

export default NewArrivals;

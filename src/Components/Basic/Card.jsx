import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';

function Card({ id, title, description, price, thumbnail, offer }) {
  const [aspectRatio, setAspectRatio] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = thumbnail;
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
  }, [thumbnail]);


  const descriptionToShow = description ? `${description.slice(0, 50)}...` :" No description";

  const style = {
    width: aspectRatio ? `${aspectRatio * 25}rem` : 'auto',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)'
  };

  return (
    <Link to={`/productsdisplay?id=${id}`}>
      <div className="max-w-xs h-[26rem] min-w-[20rem] rounded" style={style}>
        <div className={offer ? 'absolute p-1 rounded-br-[10px] bg-[#ff4141] font-[600] z-0' : 'hidden'}>{offer}% OFF</div>
        <div className='h-[60%] max-h-[60%]'>
          <img className="m-auto h-full" src={thumbnail} alt={title} />
        </div>
        <div className="px-6 py-4 h-[40%] flex flex-col justify-between cursor-pointer">
          <div className='max-h-[20%]'>
            <div className="font-[400] text-[1.2rem] mb-2">{title}</div>
            <p className="text-gray-700 text-[0.9rem]">{descriptionToShow}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-gray-700 text-base">Price: ${price}</span> 
              <AddToCart productId={id}/>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;

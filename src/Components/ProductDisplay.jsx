import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../Context/Context';
import AddToCart from './Basic/AddToCart';
import star from '../Assets/star_icon.png'
import emptyStar from '../Assets/star_dull_icon.png'
import DescriptionBox from './DescriptionBox/Description';
import Card from './Basic/Card';

function ProductDisplay() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const { products, categories } = useContext(Context);
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const foundProduct = products.find(product => product._id === id);
        setProduct(foundProduct);
        if (foundProduct) {
            // Set the main image to the thumbnail initially
            setMainImage(foundProduct.thumbnail);
        }
        if (foundProduct && categories.length > 0) {
            const categoryID = foundProduct.category;
            console.log(categoryID)
            const related = products.filter(prod => prod.category === categoryID && prod._id !== id);
            console.log(related)
            setRelatedProducts(related);
        }
    }, [id, products, categories]);


    const handleImageClick = (image) => {
        // Set the main image to the clicked image URL
        setMainImage(image);
    };

    const handlePrevImage = () => {
        // Go to the previous image
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
        setMainImage(product.images[currentIndex]);
    };

    const handleNextImage = () => {
        // Go to the next image
        setCurrentIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
        setMainImage(product.images[currentIndex]);
    };

    if (!product) {
        return <div>No Product Found</div>;
    }

    return (
        <div>
            <div className="flex justify-center mt-8 max950:flex-col max950:items-center ">
                {window.innerWidth <= 600 ? (
                    <div className='flex flex-col items-center justify-center'>
                        <img src={mainImage} alt="Main Product Image" className="w-[95vw]" />
                        <div className="flex gap-6 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={handlePrevImage}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={handleNextImage}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-4">
                            {product.images.map((images, index) => (
                                <img
                                    key={index}
                                    src={images}
                                    alt={`Product Image ${index + 1}`}
                                    className="h-[8rem] w-[11rem]"
                                    style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', cursor: 'pointer' }}
                                    onClick={() => handleImageClick(images)} // Click handler to set main image
                                />
                            ))}
                        </div>
                        <div className='flex items-center' style={{
                            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)'
                        }}>
                            <img src={mainImage} alt="Main Product Image" className="" />
                        </div>
                    </div>
                )}
                <div className="ml-20 flex flex-col items-start mt-3 max600:ml-0">
                    <h1 className="text-[2.5vw] text-gray-800 max600:text-[5vw]">{product.title}</h1>
                    <div className="text-gray-700 mt-4 text-[1.2rem] w-[40rem] max600:w-[95vw] max600:text-[1rem]">
                        {product.description}
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                        <img src={emptyStar} alt="" />
                    </div>
                    <div className="flex flex-col gap-4 mt-5 max600:flex-row max600:justify-between max600:w-full">
                        <div className="text-red-600 font-bold text-[2rem]">${product.price}</div>
                        <AddToCart productId={product._id}/>
                    </div>
                </div>
            </div>
            <DescriptionBox />
            <div className=''>
                {relatedProducts.length > 0 && (
                    <div>
                        <h1 className='text-center'>RELATED PRODUCTS</h1>
                        <div className='flex flex-wrap gap-11 justify-center mt-9 mb-9'>
                            {relatedProducts.map((relatedProduct, index) => (
                                <div key={index}>
                                    <Card
                                        title={relatedProduct.title}
                                        description={relatedProduct.description}
                                        price={relatedProducts.price}
                                        thumbnail={relatedProduct.thumbnail}
                                        offer={relatedProduct.offer}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
}

export default ProductDisplay;

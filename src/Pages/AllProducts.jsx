import React, { useContext } from 'react';
import Card from '../Components/Basic/Card';
import { Context } from '../Context/Context';
import Navbar from '../Components/Home/Navbar';

function AllProducts() {
    const { user, products } = useContext(Context);
    console.log(user);


    if (!products.length) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className='mt-[3rem]'>
                <div className="flex gap-8 flex-wrap justify-center">
                    {products.map((product, index) => (
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
        </>
    );
}

export default AllProducts;

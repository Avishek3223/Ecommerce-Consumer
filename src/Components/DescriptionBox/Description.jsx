import React from 'react';
import './DescriptionBox.css';

function DescriptionBox() {
    return (
        <div className='w-full flex justify-center my-9'>
            <div className='descriptionbox'>
                <div className="description-navigator">
                    <div className="descriptionbox-nav-box">Description</div>
                    <div className="descriptionbox-nav-box fade">Reviews (122)</div>
                </div>
                <div className="descriptionbox-description">
                    <p>Welcome to our online marketplace, your one-stop destination for all things extraordinary! Discover a diverse array of products curated just for you, from the latest in fashion trends to innovative gadgets, home essentials, beauty must-haves, and much more.</p>
                    <p>This product is good. From the moment I started using it, I could tell it was designed with excellence in mind. Its functionality is impressive, delivering on its promises effortlessly.</p>
                </div>
            </div>
        </div>
    );
}

export default DescriptionBox;
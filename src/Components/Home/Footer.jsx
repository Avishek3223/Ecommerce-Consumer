import React from 'react';

const Footer = () => {
  return (
    <div className='w-full bg-[#141414] text-white'>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="footer-section">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p>Email: example@example.com</p>
            <p>Phone: +1234567890</p>
            <p>Helpline: 24/7 Support</p>
          </div>
          <div className="footer-section">
            <h2 className="text-xl font-semibold mb-4">Customer Service</h2>
            <p>Chat with us</p>
            <p>Track Orders</p>
            <p>Returns & Exchanges</p>
          </div>
          <div className="footer-section">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p>Our Story</p>
            <p>FAQs</p>
            <p>Careers</p>
          </div>
          <div className="footer-section">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <p>Social Media Links</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

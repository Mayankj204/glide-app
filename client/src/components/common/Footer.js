import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 text-center p-4">
      <p>&copy; {new Date().getFullYear()} Glide. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
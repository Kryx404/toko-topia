import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-blue-700 text-white py-6 mt-10">
            <div className="container mx-auto flex flex-col md:flex-col md:gap-4 justify-center items-center">
                <div className="text-center md:text-left">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} TokoTopia. All rights reserved.
                    </p>
                </div>
               
            </div>
        </footer>
    );
};

export default Footer;
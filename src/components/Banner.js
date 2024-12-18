import React, { useEffect, useState } from 'react';

const Banner = ({ banners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);


    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
                setIsTransitioning(false);
            }, 500); // Durasi animasi
        }, 3000); // Ganti gambar setiap 3 detik

        return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
    }, [banners.length]);

    return (
        <div className="mb-8">
            <img
                src={banners[currentIndex].url}
                alt={`Banner ${currentIndex + 1}`}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
        </div>
    );
};

export default Banner;
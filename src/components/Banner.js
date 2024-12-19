import React, { useEffect, useState } from 'react';

const Banner = ({ banners }) => {
    // State untuk menyimpan indeks gambar banner yang sedang ditampilkan.
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // State untuk menandakan apakah sedang dalam proses transisi antar gambar.
    const [isTransitioning, setIsTransitioning] = useState(false);

    /**
     * Efek yang dijalankan saat komponen di-mount.
     * Membuat interval untuk mengganti gambar banner setiap 3 detik.
     */
    useEffect(() => {
        const interval = setInterval(() => {
            // Menandakan bahwa sedang dalam proses transisi.
            setIsTransitioning(true);
            
            // Mengganti gambar banner setelah 500ms.
            setTimeout(() => {
                // Mengganti indeks gambar banner ke indeks berikutnya.
                setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
                
                // Menandakan bahwa proses transisi telah selesai.
                setIsTransitioning(false);
            }, 500); // Durasi animasi
        }, 3000); // Ganti gambar setiap 3 detik

        // Membersihkan interval saat komponen di-unmount.
        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="mb-8">
            <img
                src={banners[currentIndex].url}
                alt={`Banner ${currentIndex + 1}`}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            />
        </div>
    );
};

export default Banner;
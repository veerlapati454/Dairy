// Updated App.jsx with Header component
import React, { useEffect, useRef, useState } from 'react';

import './Home.css';

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isZooming, setIsZooming] = useState(false);
  const imageRef = useRef(null);
  const fadeTimeoutRef = useRef(null);
  const zoomTimeoutRef = useRef(null);

  // Dairy product images from online sources
  const images = [
    'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=1600&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1582054625534-0fd2ada45a5b?w=1600&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1600&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1600&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1582054625534-0fd2ada45a5b?w=1600&h=1000&fit=crop',
  ];

  // Custom image slideshow with smooth zoom effect
  useEffect(() => {
    let isMounted = true;
    let currentIndex = 0;

    const showNextImage = () => {
      if (!isMounted) return;

      setOpacity(0);
      setIsZooming(false);

      fadeTimeoutRef.current = setTimeout(() => {
        if (!isMounted) return;
        currentIndex = (currentIndex + 1) % images.length;
        setCurrentImageIndex(currentIndex);
        
        setTimeout(() => {
          if (!isMounted) return;
          setIsZooming(true);
          setOpacity(1);
        }, 50);
        
        zoomTimeoutRef.current = setTimeout(() => {
          if (!isMounted) return;
          setIsZooming(false);
          if (imageRef.current) {
            imageRef.current.style.transform = 'scale(1)';
            imageRef.current.style.transition = 'transform 0.3s ease-out';
          }
        }, 4000);
      }, 500);
    };

    setTimeout(() => {
      if (isMounted) {
        setIsZooming(true);
        setOpacity(1);
      }
    }, 100);

    const interval = setInterval(showNextImage, 5500);

    return () => {
      isMounted = false;
      clearInterval(interval);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
    };
  }, [images.length]);

  // Handle zoom animation
  useEffect(() => {
    if (imageRef.current) {
      if (isZooming) {
        imageRef.current.style.transform = 'scale(1.15)';
        imageRef.current.style.transition = 'transform 6s ease-in-out';
      }
    }
  }, [isZooming, currentImageIndex]);

  return (
    <div className="app-container">
      {/* Image Background Layer with Zoom Effect */}
      <div className="image-layer">
        <div className="image-container">
          <img
            ref={imageRef}
            src={images[currentImageIndex]}
            alt="Dairy product"
            className="background-image"
            style={{
              opacity: opacity,
              transition: 'opacity 0.6s ease-in-out',
              transform: 'scale(1)',
            }}
          />
        </div>
        {/* Gradient Overlay */}
        <div className="gradient-overlay"></div>
      </div>

      {/* Content Layer */}
      <div className="content-layer">
        {/* Header with Liquid Glass Effect */}
     

        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">
            <span className="hero-title-black">From our</span>{' '}
            <span className="hero-title-gray">pastures,</span>{' '}
            <span className="hero-title-black">to your</span>{' '}
            <span className="hero-title-gray">table.</span>
          </h1>

          <p className="hero-description">
            Pure, organic dairy crafted with care. From grass-fed cows to your family's breakfast table — taste the difference of farm-fresh goodness.
          </p>

          <button className="hero-cta">
            Explore Products
          </button>

          {/* Image indicators */}
          <div className="indicators">
            {images.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentImageIndex ? 'indicator-active' : ''}`}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setOpacity(1);
                  setIsZooming(true);
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
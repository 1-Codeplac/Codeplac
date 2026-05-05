import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../css/GaleriaCarrosel.css";

/* CAROUSEL GALLERY COMPONENT */
export default function GaleriaCarrosel({
  title,
  imagens,
  variant = "purple",
  onSelectImage,
  carouselId,
}) {
  return (
    <div className="gc-section">

      {/* GALLERY HEADER */}
      <h3 className={`gc-title gc-title-${variant}`}>
        {title}
      </h3>

      <div className="gc-carousel-container">

        {/* NAVIGATION: PREVIOUS */}
        <button className={`gc-nav gc-prev-${carouselId} gc-nav-${variant}`}>
          &#10094;
        </button>

        {/* SWIPER SLIDER CONFIGURATION */}
        <Swiper
          modules={[Navigation, Pagination]}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = `.gc-prev-${carouselId}`;
            swiper.params.navigation.nextEl = `.gc-next-${carouselId}`;
          }}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={25}
          slidesPerView={1}
          breakpoints={{
            0: { slidesPerView: 1.1 },
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="gc-swiper"
        >
          {imagens.map((img, idx) => (
            <SwiperSlide key={idx}>
              
              {/* INTERACTIVE IMAGE CARD */}
              <motion.div
                className={`gc-card gc-card-${variant}`}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={() => onSelectImage(img)}
              >
                <motion.img
                  src={img}
                  alt={title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>

            </SwiperSlide>
          ))}
        </Swiper>

        {/* NAVIGATION: NEXT */}
        <button className={`gc-nav gc-next-${carouselId} gc-nav-${variant}`}>
          &#10095;
        </button>

      </div>
    </div>
  );
}
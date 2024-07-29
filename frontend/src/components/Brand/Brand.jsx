import React, { useEffect, useState } from "react";
import { fetchProductBrand } from "../../service/Service";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Brand = () => {
  const [brands, setbrand] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetchProductBrand();
      setbrand(response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(brands);

  return (
    <div className="mx-auto max-w-2xl px-4 md:max-w-5xl py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Shop By Brands
        </h2>
      </div>
      <Swiper
        watchSlidesProgress={true}
        className="mySwiper mt-10"
        breakpoints={{
          575: {
            slidesPerView: 2,
          },
          1024:{
            slidesPerView:3
          }
        }}

        slidesPerView={1}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.brandId}>
            <Link to={`/brand/${brand.brandName}`} className="brand_list relative">
              <div className="aspect-h-1 aspect-w-1 md:w-full overflow-hidden flex justify-center items-center lg:aspect-none  object-cover contrast-100  brightness-75 opacity-85">
                <img
                  src={
                    brand.brandImage
                      ? `/src/assets/brand/${brand.brandImage}`
                      : ""
                  }
                  alt=""
                />
              </div>
              <div className="absolute top-0 w-full hover:backdrop-blur-[2px] h-full ">
                <h2 className="text-6xl font-extrabold tracking-widest text-white text-center flex items-center justify-center h-full">
                  {brand.brandName}
                </h2>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brand;

import React, { useState } from "react";

import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";


import "./Banner.css"

const images = [banner1, banner2, banner3];

const Banner = () => {
  const [currentImage, setImagePosition] = useState(images[0]);

  return (
    <>
      <section className="bg-white dark:bg-gray-900 p-5 md:py-7 md:mt-9  my-3 rounded-3xl relative  lg:mx-11  md:mx-7 mx-3">
        <div className="grid px-4 py-8  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-5">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Grab New Arrival Shoes
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Discover the perfect pair to match your active lifestyle and
              elevate your sneaker game to the next level. Don't miss out on our
              exclusive new arrivals, available now!
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Speak to Sales
            </a>
          </div>
          <div className="lg:mt-0 lg:col-span-7 lg:flex justify-center align-center place-self-center py-3">
            <div className="currentImage">
                    <img src={currentImage} className="md:h-80 h-60 py-4 " />
            </div>
                
            <div className="absolute bottom-5 right-5 transform  flex space-x-4 ">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`h-20 w-20  object-cover cursor-pointer rounded backdrop-blur-xl  border-2 transition-transform duration-300 ease-in-out ${
                    currentImage === image
                      ? "border-blue  transform scale-125"
                      : "border-white"
                  }`}
                  onClick={() => setImagePosition(image)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;

import React from "react";
import { Carousel } from "flowbite-react";

const Carousels = () => {
  return (
    <div className="flex items-center w-full justify-center h-48 mb-6 rounded bg-gray-50 dark:bg-gray-800">
      <Carousel>
        <img src={require("../../images/banner.jpg")} alt="banner" />
        <img src={require("../../images/포트폴리오.PNG")} alt="portfolio" />
        <img src={require("../../images/FilmFinder.PNG")} alt="film-finder" />
        <img
          src={require("../../images/portfolio-next.PNG")}
          alt="portfolio-next"
        />
        <img src={require("../../images/shopfind.png")} alt="shop-find" />
      </Carousel>
    </div>
  );
}

export default Carousels;
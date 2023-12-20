import React, {Component} from "react";
import {DiGit, DiCss3, DiAngularSimple, DiDocker, DiJsBadge, DiPython, DiMysql, DiPostgresql, DiMongodb} from "react-icons/di"
import styles from "./infinite.module.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function InfiniteSlider() {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 9,
        slidesToScroll: 9,
    }
  return (
    <>
      <div className={styles.infinitiCarrousel}>
        <Slider {...settings} >
          <div>
            <DiAngularSimple size={80} />
          </div>
          <div>
            <DiDocker size={80} />
          </div>
          <div>
            <DiGit size={80} />
          </div>
          <div>
            <DiCss3 size={80} />
          </div>
          <div>
            <DiMysql size={80}/>
          </div>
          <div >
            <DiPython size={80} />
          </div>
          <div>
            <DiJsBadge size={80} />
          </div>
          <div>
            <DiMongodb size={80} />
          </div>
          <div>
            <DiPostgresql size={80} />
          </div>
        </Slider>
      </div>
    </>
  );
}

export default InfiniteSlider;

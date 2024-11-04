'use client'

import styles from './splash.module.css';

var Carousel = require('react-responsive-carousel').Carousel;
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Splash(){
    return (
      <div className={styles.main}>
            <Carousel showArrows={true} infinteLoop={true} autoPlay={true} renderThumbs={()=>{}} onChange={()=>{}} onClickItem={()=>{}} onClickThumb={()=>{}}>
                <div>
                    <img src="/branding/logo-text.svg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="/branding/logo-text.svg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="/branding/logo-text.svg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="/branding/logo-text.svg" />
                    <p className="legend">Legend 4</p>
                </div>
                <div>
                    <img src="/branding/logo-text.svg" />
                    <p className="legend">Legend 5</p>
                </div>
                <div>
                    <img src="/branding/logo-text.svg" />
                    <p className="legend">Legend 6</p>
                </div>
            </Carousel>
      </div>
    )
  }
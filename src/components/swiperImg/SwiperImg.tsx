import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./SwiperImg.style.scss";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

function SwiperImg(props: { images: string[]}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore|null>(null);
  const listImages = props.images.map((urlImage, index) => 
    <SwiperSlide key={index}>
      <img src={urlImage} />
    </SwiperSlide>
  )
  return (
    <div>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2"
        loop={true}
      >
        {listImages}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className="mySwiper"
      >
        {listImages}
      </Swiper>
    </div>
  );
}

export default SwiperImg;

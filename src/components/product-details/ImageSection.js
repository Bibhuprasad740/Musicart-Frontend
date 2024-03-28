import React, { useState } from "react";
import classes from "./ImageSection.module.css";

const ImageSection = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const changeImage = (newImage) => {
    setMainImage(newImage);
  };

  return (
    <div className={classes.imageSection}>
      <div className={classes.mainImage}>
        <img src={mainImage} alt="" key="key" />
      </div>
      <div className={classes.thumbnails}>
        {images.map((image, index) => (
          <img
            className={classes.thumbnail}
            src={image}
            alt=""
            key={index}
            onClick={() => changeImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSection;

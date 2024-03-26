import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";
import classes from "./Rating.module.css";

const color = "rgb(255, 221, 0)";
const size = 25;

const Rating = ({ rating, total }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar color={color} key={i} size={size} />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt color={color} key="half" size={size} />);
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <IoIosStarOutline
        key={`empty${i}`}
        className="empty-star"
        color={color}
        size={size}
      />
    );
  }

  return (
    <div className={classes.rating}>
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
      <span className={classes.title}>{`(${total} Customer Rating)`}</span>
    </div>
  );
};

export default Rating;

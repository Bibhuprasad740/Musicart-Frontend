import React, { useState, useEffect } from "react";
import classes from "./LoadingProgressBar.module.css";

const LoadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      );
    }, 100); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={classes.loadingProgressBar}>
      <div
        className={classes.bar}
        style={{ width: `${progress}%`, transition: "width 0.1s" }}
      />
    </div>
  );
};

export default LoadingProgressBar;

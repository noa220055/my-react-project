import React, { useState, useEffect } from "react";
import styles from '../style/LoaderAdmin.module.css';

const LoaderAdmin = () => {
  useEffect(() => {
    document.body.className = styles["loader-page-admin"];
    return () => {
      document.body.className = "";
    };
  }, []);

  const loadingTexts = ["📖📚📕", "📚📕📖", "📕📖📚"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    },500); // שינוי כל 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles["loader-container-admin"]}>
      <p className={styles["loading-text-admin"]}>Loading {loadingTexts[index]}</p>
    </div>
  );
};

export default LoaderAdmin;

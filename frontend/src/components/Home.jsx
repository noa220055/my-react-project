import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "../style/Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = styles["home-page"];
    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <div className={styles["home-container"]}>
      <h1 className={styles["home-title"]}>Welcome to BookSpot!</h1>
      <div className={styles["home-buttons"]}>
        <button onClick={() => navigate("/login")} className={styles["home-button"]}>
          Login
        </button>
        <button onClick={() => navigate("/signup")} className={styles["home-button"]}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home;

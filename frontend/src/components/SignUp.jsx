import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { useEffect } from "react";
import styles from '../style/SignUp.module.css'; // אל תשכח לייבא את הקובץ CSS

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = styles["signupPage"];
    return () => {
      document.body.className = "";
    };
  }, []);


  const signupUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // אם אחד השדות ריק – הצג שגיאה
    if (!email || !username || !password || !phone) {
      setError("Please fill in all fields.");
      return;
    }

    console.log("Signing up with:", { email, username, password, phone });

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);

        // שמירת המשתמש ב-Redux
        dispatch(setUser({ userId: data.userId, username }));
        console.log("Dispatched Redux with userId:", data.userId, "username:", username);

        // שמירה ב-localStorage
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", username);
        console.log("localStorage userId:", localStorage.getItem("userId"));
        console.log("localStorage username:", localStorage.getItem("username"));

        // הפניה לעמוד הציוד
        navigate("/equipments");

        // ניקוי השדות לאחר הצלחה
        setEmail("");
        setUsername("");
        setPassword("");
        setPhone("");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("An error occurred while signing up.");
    }
  };

  return (
      <div className={styles.signupContainer}>
        <h2 className={styles.signupTitle}>Sign Up</h2>
        <form onSubmit={signupUser} className={styles.signupForm}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.signupInput}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.signupInput}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.signupInput}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.signupInput}
            required
          />

          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}

          <button type="submit" className={styles.signupButton}>
            Sign Up
          </button>
        </form>
      </div>
  );
};

export default SignUp;

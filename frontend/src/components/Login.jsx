import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';
import styles from '../style/Login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = styles["loginPage"];

        // ניהול היסטוריה רק אם אין היסטוריה קיימת
        if (window.history.length <= 1) {
            window.history.replaceState({ key: 'home' }, 'Home', '/');
        }

        return () => {
            document.body.className = "";
        };
    }, []);

    const loginUser = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!username || !password) {
            setError('Please enter both username and password.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (username.toLowerCase() === 'admin' && password === '1234567') {
                dispatch(setUser({ userId: data.userId, username: data.username }));
                localStorage.setItem('userId', data.userId);
                navigate('/admin/equipments');
            } else {
                dispatch(setUser({ userId: data.userId, username: data.username }));
                localStorage.setItem('userId', data.userId);
                navigate('/equipments');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.loginTitle}>Login</h2>
            <form onSubmit={loginUser} className={styles.loginForm}>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.loginInput}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.loginInput}
                    required
                />
                {error && <p className={styles.errorMessage}>{error}</p>}
                <button type='submit' className={styles.loginButton} disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
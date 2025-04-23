import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';
import logo from "../assets/logo.png";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await authService.login({ email, password });
            navigate('/chat');
        } catch (error) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoogleLogin = () => {
        //todo
    }

    return (
        <div className="chat-container">
            <header className="header">
                <div className="logo-container">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="logo"/>
                    </Link>
                </div>
            </header>

            <main className="auth-main">
                <div className="auth-card">
                    <h1 className="auth-title">Log in</h1>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button 
                            type="submit" 
                            className="submit-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </button>

                        <div className="divider">
                            <div className="divider-line"></div>
                            <div className="divider-text">or</div>
                            <div className="divider-line"></div>
                        </div>

                        <button 
                            type="button" 
                            className="google-button" 
                            onClick={handleGoogleLogin}
                        >
                            Continue with Google
                        </button>
                    </form>

                    <div className="auth-footer">
                        Don't have an account?
                        <Link to="/signup" className="auth-link">
                            Sign up
                        </Link>
                    </div>
                </div>
            </main>
            <div className="language-icon-container">
                <IconButton style={{ color: 'white' }} aria-label="Language">
                    <LanguageIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default LoginPage;
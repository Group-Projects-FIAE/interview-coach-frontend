import {FormEvent, useState} from "react";
import logo from "../assets/logo.png";
import {Link} from "react-router";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would validate and authenticate here

  };

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

            <button type="submit" className="submit-button">
              log in
            </button>

            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">or</div>
              <div className="divider-line"></div>
            </div>

            <button type="button" className="google-button">
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
        <IconButton style={{ color: 'white' }} aria-label="Lanquage">
          <LanguageIcon/>
        </IconButton>
      </div>
    </div>
  );
}

export default LoginPage;
import React from 'react';
import logo from "../assets/logo.png";
import {Link} from "react-router";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";

const Home: React.FC = () => {
  return (
    <div className="chat-container">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo"/>
        </div>
        <div className="nav-buttons">
          <IconButton style={{ color: 'white' }} aria-label="Lanquage"><LanguageIcon/></IconButton>
          <Link to="/login" className="nav-button">log in</Link>
          <Link to="/signup" className="nav-button">get started</Link>
        </div>
      </header>

      <main className="landing-main">
        <h1 className="landing-title">
          <span>your AI</span>
          <span>interview</span>
          <span>coach</span>
        </h1>
        <Link to="/signup" className="get-started-button">
          get started
          <svg xmlns="http://www.w3.org/2000/svg" className="arrow-icon" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </Link>
      </main>
    </div>
  );
};

export default Home;
import React from 'react';
import logo from "../assets/logo.png";
import {Link} from "react-router";

const PricingPage: React.FC = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo"/>
          </Link>
        </div>
        <div className="nav-buttons">
          <Link to="/login" className="nav-button">log in</Link>
          <Link to="/signup" className="nav-button">sign up</Link>
        </div>
      </header>

      <main className="auth-main" style={{padding: "100px"}}>
        <div className="auth-card" style={{height: "500px"}}>
          <h3 className="auth-title">Free</h3>
          <h4 className="auth-description">
            - Basic interview questions <br/>
            - Limited coaching feedback <br/>
            - Limited Quiz
          </h4>
          <br/>
          <h2 className="auth-price">€0/month</h2>
          <br/>
          <button className="nav-button" style={{marginTop: "150px", width:"300px"}}>Subscribe</button>
        </div>
        <div className="auth-card" style={{height: "500px"}}>
          <h3 className="auth-title">Educational Plan</h3>
          <h4 className="auth-description">
            - Everything in Free <br/>
            - Personalized feedback <br/>
            - Unlimited Quiz <br/>
            - Mock interviews
          </h4>
          <br/>
          <h2 className="auth-price">€10/month</h2>
          <br/>
          <button className="nav-button" style={{marginTop: "120px", width:"300px"}}>Subscribe</button>
        </div>
        <div className="auth-card" style={{height: "500px"}}>
          <h3 className="auth-title">Pro Plan</h3>
          <h4 className="auth-description">
            - Everything in Educational <br/>
            - Priority support <br/>
            - Advanced interview scenarios <br/>
            - Resume and cover letter reviews
          </h4>
          <br/>
          <h2 className="auth-price">€20/month</h2>
          <br/>
          <button className="nav-button" style={{marginTop: "120px", width:"300px"}} >Subscribe</button>
        </div>
      </main>
    </div>
  )
}

export default PricingPage;

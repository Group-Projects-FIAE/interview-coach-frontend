import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import LoginPage from "./pages/LoginPage.tsx";
import {MainLayout} from "./components/MainLayout.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import Home from "./pages/Home.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import React from "react";
import PricingPage from "./pages/PricingPage.tsx";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="pricing" element={<PricingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
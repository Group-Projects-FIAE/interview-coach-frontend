import {createBrowserRouter} from "react-router";
import LoginPage from "./pages/LoginPage.tsx";
import {MainLayout} from "./components/MainLayout.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import Home from "./pages/Home.tsx";
import ChatPage from "./pages/ChatPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "/login",
        element: <LoginPage/>
      },
      {
        path: "/signup",
        element: <SignUpPage/>
      },
      {
        path: "/chat",
        element: <ChatPage/>
      }
    ]
  },

])
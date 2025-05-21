import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import SendIcon from "@mui/icons-material/Send";
import logo from "../assets/logo.png";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import { v4 as uuidv4 } from "uuid";
import { chatApi } from "../services/api";
import { authService } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatPage = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [isSessionInitialized, setIsSessionInitialized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load or generate sessionId
  useEffect(() => {
    const storedSession = localStorage.getItem("sessionId");
    if (storedSession) {
      setSessionId(storedSession);
    } else {
      const newSession = uuidv4();
      localStorage.setItem("sessionId", newSession);
      setSessionId(newSession);
    }
  }, []);

  // Initialize session with backend and show welcome message
  useEffect(() => {
    const initializeSession = async () => {
      if (!sessionId || isSessionInitialized) return;

      try {
        await chatApi.createSession(sessionId);
        setMessages([
          {
            text:
                "Hi! I'm your personal Interview Coach.\n" +
                "To get started, just paste the job description or a link to the job posting you're applying for.\n" +
                "I’ll tailor the session to your role and guide you through your options.",
            isUser: false,
            timestamp: new Date(),
          },
        ]);
        setIsSessionInitialized(true);
      } catch (error) {
        console.error("Failed to initialize session:", error);
        setError("Failed to initialize chat session. Please refresh the page.");
      }
    };

    initializeSession();
  }, [sessionId, isSessionInitialized]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize input
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [inputText]);

  const addMessage = (text: string, isUser: boolean) => {
    setMessages((prev) => [...prev, { text, isUser, timestamp: new Date() }]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing || !sessionId) return;

    setError(null);
    addMessage(inputText, true);
    setInputText("");
    setIsProcessing(true);

    try {
      const response = await chatApi.sendMessage(sessionId, inputText);
      if (response?.response) {
        addMessage(response.response, false);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error("Error fetching AI response:", error);
      const errorMessage =
          error.response?.data?.detail || "AI is not responding. Try again later.";
      setError(errorMessage);
      addMessage("Sorry, I encountered an error. Please try again.", false);
    } finally {
      setIsProcessing(false);
    }
  };

  const startNewChat = async () => {
    const newSession = uuidv4();
    localStorage.setItem("sessionId", newSession);
    setSessionId(newSession);
    setIsSessionInitialized(false);
    setMessages([
      {
        text:
            "Welcome back! Ready to prepare for another interview?\n" +
            "Just paste a job description or a link to the posting — I’ll handle the rest.\n" +
            "Once I have the job info, I’ll guide you through different preparation modes.",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    setIsProcessing(false);
  };
  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="sidebar-actions">
          <IconButton
            style={{ color: "white" }}
            aria-label="Chat"
            onClick={startNewChat}
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton
            style={{ color: "white" }}
            aria-label="Chat History"
          >
            <FormatListBulletedIcon />
          </IconButton>

        </div>

        <div className="sidebar-footer">
          <div className="sidebar-actions">
            <IconButton style={{ color: "white" }} aria-label="Settings">
              <SettingsIcon />
            </IconButton>
            <IconButton style={{ color: "white" }} aria-label="Info">
              <InfoIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-area">
        {error && <div className="error-message">{error}</div>}
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.isUser ? "user-message" : "ai-message"
              }`}
            >
              {!message.isUser && (
                <div className="ai-avatar">
                  <div className="ai-avatar-inner"></div>
                </div>
              )}
              <div className="message-bubble">
                <p>{message.text}</p>
              </div>
            </div>
          ))}

          {isProcessing && messages.length > 0 && (
            <div className="message ai-message">
              <div className="ai-avatar">
                <div className="ai-avatar-inner"></div>
              </div>
              <div className="message-bubble typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form className="input-area" onSubmit={handleSendMessage}>
          <textarea
            ref={textareaRef}
            placeholder="Ask me....."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isProcessing}
            rows={1}
            className="message-input resize-none overflow-hidden leading-snug max-w-[60ch] w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <IconButton
            style={{ color: "white" }}
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className="send-button"
          >
            <SendIcon />
          </IconButton>
        </form>
      </div>
      <div className="language-icon-container">
        <IconButton style={{ color: "white" }} aria-label="Language">
          <LanguageIcon />
        </IconButton>
        <IconButton
          style={{ color: "white" }}
          aria-label="LogOut"
          onClick={handleLogout}
        >
          <LogoutIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatPage;

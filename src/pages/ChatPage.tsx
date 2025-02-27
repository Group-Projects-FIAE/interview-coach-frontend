import React, {useEffect, useRef, useState} from "react";
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import SendIcon from "@mui/icons-material/Send";
import logo from "../assets/logo.png"
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';


interface Message {
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const ChatPage = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            text: "Hi, its ur personal interview coach",
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputText.trim()) return;

        // Add user message
        const userMessage: Message = {
            text: inputText,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputText("");
        setIsProcessing(true);

        const aiMessage: Message = {
            text:"",
            isUser:false,
            timestamp: new Date()
        }
        setMessages(prevMessages => [...prevMessages, aiMessage]);
        try {
            const response = await fetch(`http://127.0.0.1:8000/chat/stream/${encodeURIComponent(inputText)}`)
            if (!response.body) {
                throw new Error("No response body received.")
            }
            const reader = response.body.getReader()
            const decoder = new TextDecoder("utf-8");

            let accumulatedText = ""
            while(true) {
                const { done, value } = await reader.read();
                if(done) break;

                accumulatedText +=decoder.decode(value, { stream: true});

                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages]
                    updatedMessages[updatedMessages.length -1].text = accumulatedText
                    return [...updatedMessages]
                });
            }
        }catch (error) {
            console.error("Error fetching AI response.", error);
        } finally {
            setIsProcessing(false);
        }
    }

    const startNewChat = () => {
        setMessages([
            {
                text: "Hi, its ur personal interview coach",
                isUser: false,
                timestamp: new Date()
            }
        ]);
    };

    return (
      <div className="chat-container">

          {/* Sidebar */}
          <div className="sidebar">
              <div className="logo-container">
                  <img src={logo} alt="Logo" className="logo"/>
              </div>
              <div className="sidebar-actions">
                  <IconButton style={{ color: 'white' }} aria-label="Chat" onClick={startNewChat}>
                      <ChatBubbleOutlineIcon/>
                  </IconButton>
                  <IconButton style={{ color: 'white' }} aria-label="Chat History">
                      <FormatListBulletedIcon/>
                  </IconButton>
              </div>

              <div className="sidebar-footer">
                  <div className="sidebar-actions">
                      <IconButton style={{ color: 'white' }} aria-label="Settings">
                          <SettingsIcon/>
                      </IconButton>
                      <IconButton style={{ color: 'white' }} aria-label="Info">
                          <InfoIcon/>
                      </IconButton>
                  </div>
              </div>
          </div>

          {/* Main Chat Area */}
          <div className="chat-area">
              <div className="messages-container">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${message.isUser ? "user-message" : "ai-message"}`}
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

                  {isProcessing && (
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

                  <div ref={messagesEndRef}/>
              </div>

              <form className="input-area" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    placeholder="Ask me....."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isProcessing}
                    className="message-input"
                  />
                  <IconButton style={{ color: 'white' }}
                    type="submit"
                    disabled={!inputText.trim() || isProcessing}
                    className="send-button"
                  >
                      <SendIcon/>
                  </IconButton>
              </form>
          </div>
          <div className="language-icon-container">
              <IconButton style={{ color: 'white' }} aria-label="Lanquage">
                  <LanguageIcon/>
              </IconButton>
              <IconButton style={{ color: 'white' }} aria-label="LogOut">
                  <LogoutIcon/>
              </IconButton>
          </div>
      </div>
    )
}

export default ChatPage;
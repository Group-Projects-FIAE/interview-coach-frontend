import './App.css'
import ChatPage from "./pages/ChatPage.tsx";

function App() {

  return (

      <div className="background">
        <video autoPlay loop muted playsInline>
        <source src="public/Background.mp4" type="video/mp4" />
            your browser does not support the video tag.
        </video>
          <ChatPage />
      </div>
  )
}

export default App

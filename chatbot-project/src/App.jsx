import { useEffect, useState } from 'react'
import { Chatbot } from 'supersimpledev'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('chatMessages')) || [], []);
  let title = `${chatMessages.length} Messages`;

  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye! Have a great day!',
      'give me a unique id': () => {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      }
    })
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <>
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href="src/assets/robot.png" />

      <div className='app-container'>
        {chatMessages.length === 0 && (
          <p className='welcome-message'>
            Welcome to the chatbot project! Send a message using the textbox
            below.
          </p>
        )}
        <ChatMessages chatMessages={chatMessages} />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </>
  );
}

export default App

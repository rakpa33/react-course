import { useState } from 'react'
import {Chatbot} from 'supersimpledev'
import dayjs from 'dayjs'
import LoadingGif from '../assets/loading-spinner.gif'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        function saveInputText(event) {
          setInputText(event.target.value); // uses the onClick event to trigger a get on the input field's value and save the value to setInputText
        }

        function isEnterKey(event) {
          return event.key === 'Enter'
            ? sendMessage()
            : event.key === 'Escape'
            ? setInputText('')
            : undefined;
        }

        async function sendMessage() {
          if (isLoading || inputText === '') {
            return;
          }

          setIsLoading(true);
          const newChatMessages = [
            ...chatMessages,
            {
              message: inputText,
              sender: 'user',
              id: crypto.randomUUID(),
              timestamp: dayjs().valueOf()
            },
          ];

          setInputText(''); // resets the input text to empty

          setChatMessages([
            ...newChatMessages,
            {
              message: (
                <img className='loading-img' src={LoadingGif} />
              ),
              sender: 'robot',
              id: crypto.randomUUID(),
              timestamp: dayjs().valueOf()
            },
          ]);

          const response = await Chatbot.getResponseAsync(inputText);

          setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender: 'robot',
              id: crypto.randomUUID(),
              timestamp: dayjs().valueOf(),
            },
          ]);

          setIsLoading(false);
        }

        function clearMessage() {
          setInputText(''); // resets the input text to empty
          setChatMessages([]); // clears the chat messages
        }

        return (
          <div className='chat-input-container'>
            <input
              placeholder='Send a message to Chatbot'
              size='30'
              onChange={saveInputText}
              value={inputText}
              onKeyDown={isEnterKey}
              className='chat-input'
            />
            <button onClick={sendMessage} className='send-button'>
              Send
            </button>
            <button onClick={clearMessage} className='clear-button'>Clear</button>
          </div>
        );
      }
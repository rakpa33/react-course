import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/profile-1.png'
import dayjs from 'dayjs'
import './ChatMessage.css'

export function ChatMessage({ message, sender, timestamp }) {
  return (
    <div
      className={
        sender === 'user' ? 'chat-message-user' : 'chat-message-robot'
      }
    >
      {sender === 'robot' && (
        <img src={RobotProfileImage} className='chat-message-profile' />
      )}
      <div className='chat-message-text'>{message}
        <div className='chat-message-time'>
            {dayjs(timestamp).format('h:mma')}
          </div>
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className='chat-message-profile' />
      )}
    </div>
  );
}
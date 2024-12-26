import React, { useState } from 'react'
import styles from './message-input.module.css'

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('')

  const handleSendClick = () => {
    // if (message.trim()) {
      onSendMessage(message)
      setMessage('') // Clear the input after sending
    // }
  }

  return (
    <div className={styles.message}>
      <input
        title="Write Message"
        placeholder="Message.."
        className={styles.msgInput}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        className={styles.sendSVG}
        onClick={handleSendClick}
      >
        <g
          transform="translate(0,30) scale(0.1,-0.1)"
          fill="#ffffff70"
          stroke="none"
        >
          <path d="M44 256 c-3 -8 -4 -29 -2 -48 3 -31 5 -33 56 -42 28 -5 52 -13 52 -16 0 -3 -24 -11 -52 -16 -52 -9 -53 -9 -56 -48 -2 -21 1 -43 6 -48 10 -10 232 97 232 112 0 7 -211 120 -224 120 -4 0 -9 -6 -12 -14z"></path>
        </g>
      </svg>
      <span className={styles.l}></span>
    </div>
  )
}

export default MessageInput

import React from 'react'
import './chat.css'
import ScrollToBottom from 'react-scroll-to-bottom'

export default function Join({name,message,username,time}) {
  return (
    <>
    <ScrollToBottom>
    <div className='message' id={username === name ? "you": "other" }>
        <div>
            <div className='message-content'>
                <p>{message}</p>
            </div>
            <div className='message-meta'>
                <p id='time'>{time}</p>
                <p id='author'>{name}</p>

            </div>
        </div>
        
    
    </div>
    </ScrollToBottom>
    
    </>
  )
}

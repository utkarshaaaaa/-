import React, { useEffect } from 'react'
import {useState} from "react"
import Join from './Join'
import io from 'socket.io-client'
import './chat.css'
import ScrollToBottom from 'react-scroll-to-bottom'

export default function Chat({socket,room,username }) {

  const[message,setmessage]=useState("")
  const[messagelist,setmessagelist]=useState([])
  const sendmessage= async ()=>{
    if(message !==""){
      const data={
        room:room,
        name:username,
        message:message,
        time:
          new Date(Date.now()).getHours()+
          ":" +
          new Date (Date.now()).getMinutes()
      }
      await socket.emit("send_message",data)
    }
    setmessage("")
  }
  useEffect(()=>{
    socket.on("recieve",(data)=>{
      setmessagelist((list)=>[...list,data])
      
    })

  },[socket])
  
  
  return (
    <>
    <div className='chat-window'>
        <div className='chat-header'>
          
          <p>LIVE chat </p>
        </div>
       <ScrollToBottom>
        <div className='chat-body'>
            {messagelist.map((e)=>{
            return <Join name={e.name} message={e.message} username={e.username} time={e.time}/>
            })}
          

        </div>
        </ScrollToBottom>
        <div className='chat-footer'>
          <input type='text' value={message} onChange={(e)=>{setmessage(e.target.value)}}  placeholder='message...' onKeyPress={(e)=>{
            e.key==="Enter" && sendmessage()

          }}/>
          <button onClick={sendmessage}>&#9658;</button>
        </div>
      
    </div>
    </>
  )
}

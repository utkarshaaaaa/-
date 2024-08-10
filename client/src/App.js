import "./App.css";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";


function App() {
  const socket = io.connect("http://localhost:3001");
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const [show, setshow] = useState(false);
  const [roomname, setroomname] = useState("");
  const join = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      setshow(true);
    } else {
      console.log("fill the form");
    }
  };

  return (
    <>
      <div>
        <div className="page">
          <h1>Join CHAT ROOM </h1>
          <div className="field field_v1">
            <label className="ha-screen-reader">First name</label>
            <input
              id="first-name"
              className="field__input"
              placeholder="name..."
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Name</span>
            </span>
          </div>
          <div className="field field_v3">
            <label className="ha-screen-reader">E-mail</label>
            <input
              id="text"
              className="field__input"
              placeholder="ID...."
              type="text"
              value={room}
              onChange={(e) => {
                setroom(e.target.value);
              }}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Room ID.....</span>
            </span>
          </div>
          <button class="button-30" role="button" onClick={join}>
            Join
          </button>
        </div>

        <Chat socket={socket} username={name} room={room} roomname={roomname} />
      </div>
    </>
  );
}

export default App;

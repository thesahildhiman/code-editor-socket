import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaLaptopCode } from "react-icons/fa";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleCreateNewRoom = (e) => {
    e.preventDefault();
    setRoomId(uuidV4());
    toast.success("Room is created");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("All fields required");
      return;
    }
    navigate(`/editor/${roomId}`, {
      // you can pass data to route
      state: {
        username,
      },
    });
  };

  const handleKeyEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <span className="logo">
          <FaLaptopCode color="#4aee88" />
          <span className="logoText">Code Editor</span>
        </span>
        <h4 className="mainLabel">Paste invitation roomId</h4>
        <div className="inputGroup">
          <input
            className="inputBox"
            type="text"
            placeholder="Room Id"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleKeyEnter}
            // readOnly
          />
          <input
            className="inputBox"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleKeyEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createText">
            If you don't have an invite then create &nbsp;
            <a href="" onClick={handleCreateNewRoom} className="createBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        Built by <a href="#">Sahil</a>
      </footer>
    </div>
  );
};

export default Home;

import React, { useState, useRef } from "react";
import { FaLaptopCode } from "react-icons/fa";
import {
  useParams,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { useEffect } from "react";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import toast from "react-hot-toast";

const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 12, username: "aman" },
    { socketId: 9, username: "rahul" },
    { socketId: 18, username: "singh" },
    { socketId: 82, username: "tinku" },
  ]);
  const reactNavigator = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();
  const socketRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (e) => {
        console.log("---socket error", e);
        toast.error("socket connection failed");
        reactNavigator("/");
      };

      socketRef.current.emit(ACTIONS.JOIN, {
        // sending data on socket emit
        roomId,
        username: location.state?.username,
      });
    };
    init();
  }, []);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  console.log("--roomId->>>", roomId);
  return (
    <div className="mainWrapper">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            {/* <span className="logo"> */}
            <FaLaptopCode color="#4aee88" />
            <span className="logoText">Code Editor</span>
            {/* </span> */}
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => {
              return (
                <Client key={client.socketId} username={client.username} />
              );
            })}
          </div>
        </div>
        <button className="btn copyBtn">Copy Room Id</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorWrapper">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;

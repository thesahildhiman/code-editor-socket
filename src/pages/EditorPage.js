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
  // { socketId: 12, username: "aman" },
  // { socketId: 9, username: "rahul" },
  // { socketId: 18, username: "singh" },
  // { socketId: 82, username: "tinku" },
  const [clients, setClients] = useState([]);
  const reactNavigator = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();
  const socketRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      // socket initialisation
      socketRef.current = await initSocket();

      // socket errors handling
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (e) => {
        console.log("---socket error", e);
        toast.error("socket connection failed");
        reactNavigator("/");
      };

      // emiting client connection event
      socketRef.current.emit(ACTIONS.JOIN, {
        // sending data on socket emit
        roomId,
        username: location.state?.username,
      });

      // listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clientList, username, socketId }) => {
          console.log("---frontend---joined", clientList);
          if (socketRef.current.id !== socketId) {
            toast.success(`${username} joined`);
          }
          setClients(clientList);
        }
      );

      // listening for disconnected client
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    // cleaning socket
    // return () => {
    //   socketRef.current.disconnect();
    //   socketRef.current.off(ACTIONS.JOINED);
    //   socketRef.current.off(ACTIONS.DISCONNECTED);
    // };
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

import React, { useState } from "react";
import "../css/SidebarChat.css";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { db } from "../firebase";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { Link } from "react-router-dom";
import Chat from "./Chat";

const SidebarChat = ({ id, name, addnewChat }) => {
  const [seed, setSeed] = useState("");
  const [messagess, setMessagess] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessagess(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, []);

  const createChat = () => {
    const roomName = prompt("Please Enter name for Chat");
    if (roomName) {
      // Database
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addnewChat ? (
    <div className="sidebar">
      <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
          {/* Avatar */}
          <Avatar src={`https://robohash.org/${seed}&200x200`} />
          <div className="sidebarChat_info">
            {/* Name h2 */}
            <h2>{name}</h2>
            {/* message p tag */}
            <p>{messagess[0]?.message}</p>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat side">
      <h2 className="sidebarChat_h">Add new Chat</h2>
    </div>
  );
};

export default SidebarChat;

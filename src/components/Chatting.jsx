import React from "react";
import { useEffect, useState } from "react";
import "../css/Chatting.css";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import axios from "../axios";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "../firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

const Chatting = ({ messages }) => {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messagess, setMessagess] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  // To open a specific chat room
  useEffect(() => {
    if (roomId) {
      console.log(roomId);
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessagess(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId, messagess]);
  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const res = db
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add(data);
    setInput("");
    const element = document.getElementById("chat_button");
    element.classList.add("hide");
    element.classList.remove("show");
  };

  return (
    <div className="chat">
      {/* Chat Header  avatar , chat infor , icons inside */}
      <div className="chat_header">
        <Avatar src={"https://random.imagecdn.app/500/150"} />
        <div className="chat_headerInfo">
          {/*<h3>{roomName}</h3>*/}
          {/* we make use of last message of that chat room to get the last seen */}
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {new Date(
              messagess[messagess.length - 1]?.timestamp?.toDate()
            ).toUTCString()}{" "}
          </p>
        </div>
        <div className="chat_headerRight">
          {/* Icons */}
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chatting_body">
        {messagess.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      {/* Chat input to write messages */}
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <AttachFileIcon />
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              const element = document.getElementById("chat_button");
              element.classList.remove("hide");
              element.classList.add("show");
            }}
            type="text"
            placeholder="Type a message"
          />
          <button
            type="submit"
            onClick={sendMessage}
            className="hide"
            id="chat_button"
          >
            <SendIcon />
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chatting;

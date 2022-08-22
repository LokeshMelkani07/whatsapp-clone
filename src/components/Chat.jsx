import React from "react";
import { useEffect, useState } from "react";
import "../css/chat.css";
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
  getDocs,
  onSnapshot,
} from "firebase/firestore";

/*
 {messages.map((message) => (
          <p className={`chat_message ${message.received && "chat_reciever"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date().toISOString().slice(0, 10)}
            </span>
          </p>
        ))}
*/

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");
  const [messagess, setMessagess] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  /*
  // To open a specific chat room
  useEffect(() => {
    const collectionref = doc(db, "rooms", `${roomId}`);
    if (roomId) {
      console.log("New id is ", roomId);
      // console.log("I am running");
      getDoc(collectionref).then((doc) => {
        console.log(doc.data().name);
      });
      onSnapshot(collectionref, (doc) => {
        setRoomName(doc.data().name);
      });
      */
  /*
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          // console.log(snapshot.data());
          setRoomName(snapshot.docs.data().name);
        });
        db.collection("rooms")
           .doc(roomId)
           .collection("messages")
           .orderBy("timestamp", "asc")
           .onSnapshot((snapshot) => {
             setMessagess(snapshot.docs.map((doc) => doc.data()));
           });
        */
  // console.log(messagess);
  // }
  // }, [roomId, messagess]);
  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //   /*
  //   await axios.post("/messages/new", {
  //     message: input,
  //     name: "Lokesh", // this will come from autentication stuff
  //     timeStamp: "Just now",
  //     received: true,
  //   });
  //   */
  //   db.collection("rooms").doc(roomId).collection("messages").add({
  //     message: input,
  //     name: user.displayName,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  //   setInput("");
  //   const element = document.getElementById("chat_button");
  //   element.classList.add("hide");
  //   element.classList.remove("show");
  // };

  return (
    <div className="chat">
      {/* Chat Header  avatar , chat infor , icons inside */}
      <div className="chat_header">
        <Avatar src={"https://random.imagecdn.app/500/150"} />
        <div className="chat_headerInfo">
          {/*<h3>{roomName}</h3>*/}
          {/* we make use of last message of that chat room to get the last seen */}
          <h3>{"Welcome to Whatsapp Clone"}</h3>
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
      <div className="chat_body">
        <div className="chat_paragraphChat">
          <p className="chat_paragraph">
            Choose any Chat Room from Sidebar to start chatting
          </p>
          <img
            src="https://www.pngitem.com/pimgs/m/378-3783469_finger-clipart-hand-direction-hand-showing-direction-png.png"
            alt=""
          />
        </div>
      </div>
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
          <button type="submit" className="hide" id="chat_button">
            <SendIcon />
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;

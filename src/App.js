import { Fragment, useEffect } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";
import { useState } from "react";
import Favicon from "react-favicon";
import { Route, Routes, useParams } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";
import Chatting from "./components/Chatting";
import Temp from "./components/Temp";
function App() {
  const [{ user }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    // In frontend we use "npm i pusher-js"
    // In backend we do "npm i pusher"
    const pusher = new Pusher("64da271c86f02bceb675", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      // alert(JSON.stringify(newMessage));
      // append new message to the array
      setMessages([...messages, newMessage]);
    });
    // Everytime messages changes outer useEffect gets fired so we do not want to run subsribe again & again so we do
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  // console.log("message is ", messages);
  return (
    <div className="App">
      <Favicon url="https://seeklogo.com/images/W/whatsapp-logo-33F6A82887-seeklogo.com.png" />
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Sidebar />
          {/*<Router> */}
          <Routes>
            <Route path="/" element={<Chat messages={messages} />} />
            <Route path="/rooms/:roomId" element={<Chatting />} />
          </Routes>
          {/*</Router>*/}
        </div>
      )}
    </div>
  );
}

export default App;

// <Route path="/rooms/:roomId" element={<Chatting />} />

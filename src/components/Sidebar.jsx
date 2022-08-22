import React from "react";
import { useState, useEffect } from "react";
import "../css/sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  // console.log(user);
  useEffect(() => {
    // connecting with database
    // snapshot means as anything changes take latest snapshot
    const unsubscribe = db.collection("rooms").onSnapshot((snapShot) =>
      setRooms(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      {/* Sidebar header with icons on left , pic on right */}
      <div className="sidebar_header">
        <Avatar src={user.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        {/* display picture */}
      </div>
      {/* Sidebar Searchbox */}
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="sidebar_input"
          />
        </div>
      </div>
      {/* Sidebar chat container */}
      <div className="sidebar_chats">
        <SidebarChat addnewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

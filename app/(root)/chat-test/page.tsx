"use client";
import styles from "./page.module.css";
import { io } from "socket.io-client";
import { useState } from "react";
import ChatPage from "@/components/chat-page/ChatPage";

export default function Home() {
  const [showChat, setShowChat] = useState(true);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setroomId] = useState("");

  var socket: any;
  socket = io(process.env.CHAT_URL ?? "locahost:3001");


  const sender = "sender123";
  const receiver = "receiver123";
  return (
    <div>
      <div
        className={styles.main_div}
        style={{ display: showChat ? "none" : "" }}
      >
        <input
          className={styles.main_input}
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          disabled={showSpinner}
        />
        <input
          className={styles.main_input}
          type="text"
          placeholder="room id"
          onChange={(e) => setroomId(e.target.value)}
          disabled={showSpinner}
        />
      </div>
      <div style={{ display: !showChat ? "none" : "" }}>
        <ChatPage
          socket={socket}
          roomId={roomId}
          username={userName}
          sender={sender}
          receiver={receiver}
        />
      </div>
    </div>
  );
}

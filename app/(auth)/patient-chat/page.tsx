"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import io from "socket.io-client";
import ChatPage from "@/components/chat-page/ChatPage";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
const Page = ({ context }: any) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const doctor_id = searchParams.get("doctor_id");
  const patient_id = searchParams.get("patient_id");
  const { userId } = useAuth();
  const [showChat, setShowChat] = useState(true);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setroomId] = useState("");
  const router = useRouter();
  var socket: any;
  socket = io(process.env.CHAT_URL ?? "locahost:3001");


  const sender = userId;
  const receiver = doctor_id === userId ? patient_id : doctor_id;
  console.log("PATIENT_IDDD", patient_id);
  return (
    <div className="text-black">
      <div
        className={styles.main_div}
        style={{ display: showChat ? "none" : "" }}
      >
        <input
          className={styles.main_input}
          type="text"
          placeholder="room id"
          onChange={(e) => setroomId(e.target.value)}
          disabled={showSpinner}
        />
      </div>
      <div style={{ display: !showChat ? "none" : "" }}>
        <Button
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </Button>
        <ChatPage
          socket={socket}
          roomId={roomId}
          username={userName}
          sender={sender}
          receiver={receiver}
          myId={userId}
          patientId={patient_id}
        />
      </div>
    </div>
  );
};
export default Page;

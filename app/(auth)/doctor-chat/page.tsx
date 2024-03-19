"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "@clerk/clerk-react";
const Page = ({ context }: any) => {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const searchParams = useSearchParams();
  const { userId } = useAuth();
  if (!userId) redirect("/");
  const myId = userId;
  const id = searchParams.get("id");
  const doctor_id = searchParams.get("doctor_id");
  const patient_id = searchParams.get("patient_id");

  console.log("MY_ID:", myId);
  console.log("APPOINTMENT_ID:", id);
  console.log("Doctor ID:", doctor_id);
  console.log("Patient ID:", patient_id);

  useEffect(() => {
    const newSocket = io(`:3001`, {
      path: "/api/chat",
      addTrailingSlash: false,
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off("message");
  }, [socket]);

  const sendMessage = () => {
    if (!socket || !messageInput.trim()) return;

    socket.emit("message", {
      appointmentId: id,
      message: messageInput,
      doctorId: doctor_id,
      patientId: patient_id,
    });
    setMessageInput("");
  };
  return (
    <div className="text-black">
      <h2>Chat With The Patient</h2>

      <div className="max-w-md mx-auto bg-white ">
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
export default Page;

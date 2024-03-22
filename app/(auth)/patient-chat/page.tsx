"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import io from "socket.io-client";
const Page = ({ context }: any) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const doctor_id = searchParams.get("doctor_id");
  const patient_id = searchParams.get("patient_id");

  console.log("ID:", id);
  console.log("Doctor ID:", doctor_id);
  console.log("Patient ID:", patient_id);
  console.log("here");
  useEffect(() => {
    const socket = io("http://localhost:3001"); // Connect to the server
    console.log(socket);
    socket.on("connection", () => {
      console.log("Connected to server");

      // Emit a message to the server
      socket.emit("send:message", {
        senderId: id,
        receiverId: doctor_id || patient_id, // Depending on whether it's a doctor or patient
        message: "Hello, I need help.",
      });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, [id, doctor_id, patient_id]);

  return (
    <div className="text-black">
      <h2>Chat With The Doctor</h2>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3"></div>
    </div>
  );
};
export default Page;

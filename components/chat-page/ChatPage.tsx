"use client";
import React, { useEffect, useState } from "react";
import { database } from "@/services/firebase";
import { push, ref, set, query, onValue } from "firebase/database";

import style from "./chat.module.css";

interface IMsgDataTypes {
  msg: string;
  time: string;
  patientId: string;
  doctorId: string;
  type: string;
}

const ChatPage = ({ Id, type, patientId, doctorId }: any) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);

  useEffect(() => {
    let chatRef;
    chatRef = ref(database, 'chats/' + Id);

    const handleReceiveMsg = (snapshot: any) => {
      const data: IMsgDataTypes[] = [];
      snapshot.forEach((childSnapshot: any) => {
        const msgData = childSnapshot.val();
        data.push(msgData);
      });
      setChat(data);
    };

    // Listen for changes in the chat
    onValue(chatRef, handleReceiveMsg);

    return () => {
      // Unsubscribe from the chatRef when the component unmounts
      // This is important to avoid memory leaks
    };
  }, [Id, type, doctorId]); 

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        msg: currentMsg,
        patientId: patientId,
        doctorId: doctorId,
        type: type,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      const chatRef = ref(database, "chats/" + Id);
      const newDataRef = push(chatRef);
      await set(newDataRef, msgData);
      setCurrentMsg("");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-col h-screen">
        <div className="flex-1 p-4 overflow-y-auto">
          {chat.map(({ msg, time, type }, key) => (
            <div
              key={key}
              className={`flex items-start ${type === "patient" ? "justify-start" : "justify-end"} mb-4`}
            >
              <div className="flex items-center">
                {type === "patient" ? (
                  <img
                    src="/assets/images/patient.png"
                    alt="Patient Avatar"
                    className="h-8 w-8 rounded-full mr-2"
                  />
                ) : (
                  <img
                    src="assets/images/doctor_chat.png"
                    alt="Doctor Avatar"
                    className="h-8 w-8 rounded-full mr-2"
                  />
                )}
                <div
                  className={`${
                    type === "patient" ? "bg-gray-300 text-gray-800" : "bg-blue-500 text-white"
                  } p-2 rounded-lg max-w-xs`}
                >
                  <p>{msg}</p>
                  <span className="text-xs">{time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => sendData(e)} className="flex p-4">
          <input
            className="flex-1 mr-2 py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            value={currentMsg}
            placeholder="Type your message.."
            onChange={(e) => setCurrentMsg(e.target.value)}
          />
          <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;

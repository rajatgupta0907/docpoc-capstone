"use client";
import React, { useEffect, useState } from "react";
import style from "./chat.module.css";

interface IMsgDataTypes {
  msg: string;
  sender: string;
  receiver: string;
  time: string;
  patientId: string;
}

const ChatPage = ({ socket, sender, receiver, myId, patientId }: any) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        msg: currentMsg,
        sender: sender,
        receiver: receiver,
        patientId,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_msg", msgData);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data: [IMsgDataTypes]) => {
      console.log(data);
      console.log("MYID", myId);
      setChat((pre) => [...data]);
    });
  }, [socket]);

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-col h-screen">
        <div className="flex-1 p-4 overflow-y-auto">
          {chat.map(({ msg, time, sender, patientId }, key) => (
            <div
              key={key}
              className={`flex items-start ${sender === myId ? "justify-end" : "justify-start"} mb-4`}
            >
              <div className="flex items-center">
                {patientId === sender ? (
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
                    sender === myId ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
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

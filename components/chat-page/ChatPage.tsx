"use client";
import React, { useEffect, useState } from "react";
import style from "./chat.module.css";

interface IMsgDataTypes {
  msg: String;
  sender: String;
  receiver: String;
  time: String;
  patientId: String;
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
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
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
  console.log("AM I THE PATIENT??", patientId == myId);
  return (
    <div className={style.chat_div}>
      <div className={style.chat_border}>
        {/* <div style={{ marginBottom: "1rem" }}>
          <p>
            Name: <b>patientId:{patientId}</b>{" "}
          </p>
          <p>
            Name: <b>sender:{sender}</b>{" "}
          </p>
          <p>
            Name: <b>receiver:{receiver}</b>{" "}
          </p>
          <p>
            Name: <b>does match?:{sender === myId ? "true" : "false"}</b>{" "}
          </p>
        </div> */}
        <div>
          {chat.map(({ msg, time, sender, patientId }, key) => (
            <div
              key={key}
              className={
                sender == myId ? style.chatProfileRight : style.chatProfileLeft
              }
            >
              <span className={style.chatProfileSpan}>
                {patientId === sender ? "🤒" : "💊"}
              </span>
              <h3
                className={
                  patientId === myId ? "text-black" : "text-blue-egg-dark"
                }
              >
                {msg}
              </h3>
            </div>
          ))}
        </div>
        <div>
          <form onSubmit={(e) => sendData(e)}>
            <input
              className={style.chat_input}
              type="text"
              value={currentMsg}
              placeholder="Type your message.."
              onChange={(e) => setCurrentMsg(e.target.value)}
            />
            <button className={style.chat_button}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

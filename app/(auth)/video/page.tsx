"use client"
import Peer from 'peerjs';
import React, { useState, useEffect, useRef } from 'react';
import { useClerk } from "@clerk/nextjs";

export default function Page() {
  const clerk = useClerk();
  const currentUserfromClerk = clerk.user;
  const [peerId, setPeerId] = useState<string>('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState<string>('');
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);

  const call = (remotePeerId: string) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(mediaStream => {
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
        }

        if (peerInstance.current) {
          const call = peerInstance.current.call(remotePeerId, mediaStream);

          call.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            }
          });
        }
      })
      .catch(err => {
        console.log('Failed to get local stream', err);
      });
  }

  useEffect(() => {
    if (!currentUserfromClerk) return; // Wait until clerk user data is available

    const peer = new Peer(currentUserfromClerk.id);

    peer.on('open', (id: string) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(mediaStream => {
          if (currentUserVideoRef.current) {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();
          }

          call.answer(mediaStream);

          call.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            }
          });
        })
        .catch(err => {
          console.log('Failed to get local stream', err);
        });
    });

    peerInstance.current = peer;

    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
      }
    };
  }, [currentUserfromClerk]); // Add currentUserfromClerk as a dependency

  console.log(peerId);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
  <h1 className="text-white text-2xl mb-4">Current user id is {peerId}</h1>
  <input
    type="text"
    value={remotePeerIdValue}
    onChange={e => setRemotePeerIdValue(e.target.value)}
    className="mb-4 px-4 py-2 rounded-md border border-white bg-gray-800 text-white focus:outline-none focus:border-blue-500"
    placeholder="Enter remote peer ID"
  />
  <button
    onClick={() => call(remotePeerIdValue)}
    className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
  >
    Call
  </button>
  <div className="flex justify-center mt-8">
    <div className="w-full md:w-1/2 lg:w-1/3 mr-4">
      <video
        ref={currentUserVideoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-auto rounded-md shadow-lg"
      />
    </div>
    <div className="w-full md:w-1/2 lg:w-1/3">
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-full h-auto rounded-md shadow-lg"
      />
    </div>
  </div>
</div>

  
  );
}

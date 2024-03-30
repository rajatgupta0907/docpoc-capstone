"use client"
import Peer from 'peerjs';
import React, { useState, useEffect, useRef } from 'react';
import { useClerk } from "@clerk/nextjs";
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import NavBars from '@/components/navbars/NavBars';
import DoctorNavbar from '@/components/navbars/DoctorNavbar';
export default function Page() {
  const clerk = useClerk();
  let currentUserfromClerk = clerk.user;
  const [peerId, setPeerId] = useState<string>('');
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);
  const searchParams = useSearchParams();
  const patient_ids = searchParams.get("patient_id") || null;
  const doctor_ids = searchParams.get("doctor_id") || null;
  let redirection= "";

  if (doctor_ids) {
    redirection = "/my-appointment";
  } else if (patient_ids) {
    redirection = "/doctor-appointment";

  }
  const call = () => {

    const patient_id = searchParams.get("patient_id") || null;
    const doctor_id = searchParams.get("doctor_id") || null;
      let redirection= "";
      
    let remotePeerId="";
    if (doctor_id) {
      remotePeerId = doctor_id;
      redirection = "/my-appointment";
    } else if (patient_id) {
      remotePeerId = patient_id;
      redirection = "/doctor-appointment";

    }
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

    const initializePeer = () => {

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
  }
  initializePeer();


  const checkClerkId = setInterval(() => {
    if (currentUserfromClerk?.id) {
      clearInterval(checkClerkId);
      initializePeer();
    }
  }, 1000);


    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
      }
    };
  }, [currentUserfromClerk]); // Add currentUserfromClerk as a dependency

  console.log(peerId);

  return (
    <div className='bg-white'>  
        {patient_ids ? <DoctorNavbar /> : <NavBars />}

      <div className="bg-white ">
  <h1 className="text-black text-2xl mb-4">Current user id is {peerId}</h1>
  
  <button
    onClick={() => call()}
    className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
  >
    Call
  </button>
  
  <Link href={
    `${redirection}`
  }
  className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
  
  >
End Call      
</Link>
  <div className="video_box flex justify-center mt-8">
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

  <div>
  
  </div>
</div>

</div>
 
  );
}
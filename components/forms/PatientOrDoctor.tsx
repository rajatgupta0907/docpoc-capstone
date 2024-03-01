"use client";

import { useState } from "react";
import { saveSpecialtyToUser } from "@/lib/actions/user.actions";
import  {saveSpecialtyToDoctor} from '@/lib/actions/doctor.actions';
interface Props{
    userId : string,
    username: string
}
async function saveSpecialtyType(profileType: string, username: string,userId: string,setSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>) {

    try {
        if (profileType === "patient") {
            await saveSpecialtyToUser({ userId: userId,username: username ,profileType: profileType });
            window.location.href= '/patient-dashboard';
        }else{
            await saveSpecialtyToDoctor({userId: userId,username: username,profileType: profileType});
            window.location.href= '/doctor-admin';

        }
        setSuccessMessage(true);


    } catch (error) {
        alert(error);
        console.error("Error saving specialty type:", error);
        // Handle error
    }
}

const PatientOrDoctor = ({userId, username}:Props) =>{
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

    return (
        <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
            <h1 className='head-text'>Welcome to DOCPOC</h1>
            <h4 className="head-text">Please Select your Specialty Type</h4>
            <div>
                <button onClick={() => { setSelectedSpecialty("patient"); }}>Patient</button>
                <button onClick={() => { setSelectedSpecialty("doctor"); }}>Doctor</button>
            </div>
            {selectedSpecialty && (
                <button onClick={() => saveSpecialtyType(selectedSpecialty, username,userId,setShowSuccessMessage)}>Save</button>
            )}
            {showSuccessMessage && (
                <p>Specialty type saved successfully!</p>
            )}
        </main>
    );
}

export default PatientOrDoctor;

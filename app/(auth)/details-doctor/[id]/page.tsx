"use server"
import DisplayDetailedDoctors from '@/components/cards/DisplayDetailedDoctors';
import { detailsfetchdoctor } from '@/lib/actions/admin.actions';
import Link from 'next/link';
import styles from '/globals.css'; 
import NavBar from '@/components/shared/navbar';
import { Phone } from 'lucide-react';

const Page = async ({ params }: { params: { id: string } }) => {

    const doctor = await detailsfetchdoctor(params.id);
    return (
        <>
        <div style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
            <NavBar />
            <div className="det_doc bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-semibold text-center mb-8">{doctor.name}'s Details</h1>
                    {doctor ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="doc_det_container md:col-span-2">
                               
                                    <img
                                        src={doctor.image}
                                        alt="Doctor"
       
                                    />
                                
                           
                                    <div className="doctor_info">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{doctor.name}</h2>
                                        <p className="text-gray-600 text-lg mb-4">{doctor.speciality}</p>
                                        <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
                                        <p className="text-gray-700 mt-4">Phone Number: <a href='tel:{doctor.phonenumber}'>{doctor.phonenumber}</a></p>
                                        <br></br>
                                        
                                    <Link  href={ `/create-appointment/${params.id}` } className="doctor_info_btn">Appointment</Link></div>
                                </div>
                                 
                        </div>
                    ) : (
                        <p className="text-center">Loading...</p>
                    )}
                </div>
            </div>
            </div>
        </>
    );
};

export default Page;

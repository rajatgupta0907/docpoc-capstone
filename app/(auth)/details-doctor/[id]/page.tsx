"use server"
import DisplayDetailedDoctors from '@/components/cards/DisplayDetailedDoctors';
import { detailsfetchdoctor } from '@/lib/actions/admin.actions';
import Link from 'next/link';

const Page = async ({ params }: { params: { id: string } }) => {

    const doctor = await detailsfetchdoctor(params.id);
    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-semibold text-center mb-8">Doctor Details</h1>
                    {doctor ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <img
                                        src={doctor.image}
                                        alt="Doctor"
                                        className="w-full h-auto md:w-3/4 mx-auto md:min-h-[650px]"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-1">
                                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <div className="p-6">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{doctor.name}</h2>
                                        <p className="text-gray-600 text-lg mb-4">{doctor.speciality}</p>
                                        <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
                                        <p className="text-gray-700 mt-4">Phone Number: {doctor.phonenumber}</p>
                                        <br></br>
                                        <Link  href={ `/create-appointment/${params.id}` } className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-full mt-4">
                                            Schedule Your Appointment
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center">Loading...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Page;

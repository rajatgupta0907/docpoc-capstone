import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DoctorNavbar from "@/components/navbars/DoctorNavbar";
import { getAppointmentbyDoctor } from "@/lib/actions/appointment.actions";
import DoctorAppointMentShow from "@/components/shared/DoctorAppointMentShow";
import { fetchUser } from "@/lib/actions/user.actions";

import appointment from "@/lib/models/appointment.model";
import { fetchDoctor } from "@/lib/actions/admin.actions";
import Link from "next/link";
const Page = async ({ searchParams }: any) => {
  const user = await currentUser();
  if (!user) {
    redirect("/account");
  }
  const myAppointments = await getAppointmentbyDoctor({ doctor_id: user.id });
  const doctorName = await fetchDoctor(user.id);
  let name = "";
  if (!doctorName.name || doctorName.name == "") {
    name = doctorName.username;
  } else {
    name = doctorName.name;
  }
  type AppointmentType = {
    id: string;
    patient_name: string;
    doctor_name: string;
    doctor_id: string;
    patient_id: string;
    appointment_time: string;
    appointment_date: Date;
  };

  const newAppointment: AppointmentType[] = [];
  const appointmentsWithPatientNames = await Promise.all(
    myAppointments.map(async (appointment) => {
      const patientName = await fetchUser(appointment.patient_id);
      let patientString = "";
      if (patientName.name == "" && !patientName.name) {
        patientString = patientName.username;
      } else {
        patientString = patientName.name;
      }

      const localAppointment = {
        id: appointment.id,
        patient_name: patientString,
        doctor_name: name,
        doctor_id: appointment.doctor_id,
        patient_id: appointment.patient_id,
        appointment_time: appointment.appointment_time,
        appointment_date: appointment.appointment_date,
      };

      newAppointment.push(localAppointment);
    })
  );

  console.log(newAppointment);

  return (
    <div className="bg-white">
      <DoctorNavbar />
      <div className="mt-[50px] pt-[50px]"></div>
      <br></br>
      <Link
                  href={`/doctor-dashboard`}
                  className="w-full mt-10 px-4  py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded"
                >
                  Go Back
                </Link>
             
      {newAppointment.map((appointment) => (
        <DoctorAppointMentShow
          id={appointment.id}
          key={appointment.id}
          doctor_id={appointment.doctor_id}
          patient_id={appointment.patient_id}
          appointment_date={appointment.appointment_date}
          appointment_time={appointment.appointment_time}
          patient_name={appointment.patient_name}
          doctor_name={appointment.doctor_name}
        />
      ))}

<br></br>
      <Link
                  href={`/doctor-dashboard`}
                  className="w-full mt-10 px-4  py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded"
                >
                  Go Back
                </Link>
    </div>
  );
};
export default Page;

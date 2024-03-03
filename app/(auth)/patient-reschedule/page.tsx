"use client";
import { fetchDoctor } from "@/lib/actions/admin.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useClerk } from "@clerk/nextjs";
import { rescheduleAppointment } from "@/lib/actions/appointment.actions";

import { useSearchParams } from 'next/navigation'
const Page =   ( {context}: any) => {
    const clerk = useClerk();
    const currentUser = clerk.user;
  
    const router = context;
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const doctor_id = searchParams.get('doctor_id');
    const patient_id = searchParams.get('patient_id');
    const doctor_name = searchParams.get('doctor_name');
    const patient_name = searchParams.get('patient_name');
    const appointment_date = searchParams.get('appointment_date');
    const appointment_time= searchParams.get('appointment_time');

        console.log('ID:', id);
console.log('Doctor ID:', doctor_id);
console.log('Patient ID:', patient_id);
console.log('Doctor Name:', doctor_name);
console.log('Patient Name:', patient_name);
console.log('Appointment Date:', appointment_date);
console.log('Appointment Time:', appointment_time);
let rescheduleAppointments = {
    id: id
}
  
const events = [
    {
      title: "Meeting",
      start: "2024-02-21T09:00:00",
      end: "2024-02-21T10:00:00",
    },
    {
      title: "Lunch",
      start: "2024-02-21T12:00:00",
      end: "2024-02-21T13:00:00",
    },
    {
      title: "Conference",
      start: "2024-02-22T10:00:00",
      end: "2024-02-22T15:00:00",
    },
  ];

const handleEventClick = async (arg: any) => {
    const clickedDate = arg.date;
    console.log(currentUser?.id);
    if (clickedDate < new Date()) {
      alert("You cannot select a time slot in the past.");
    } else {
      const formattedDate = clickedDate.toLocaleDateString();
      const formattedTime = clickedDate.toLocaleTimeString();
      console.log(
        currentUser?.id +
          " " +
          doctor_id +
          " " +
          formattedDate +
          " " +
          formattedTime
      );
      const appointmentObject = {
        doctor_id: doctor_id || '',
        patient_id: currentUser!.id,
        appointment_date: formattedDate,
        appointment_time: formattedTime,
        prev_id: id || ''
        
      };
      try {
        await rescheduleAppointment(appointmentObject);
      } catch (err: any) {
        alert(err.message);
      }
      console.log(appointmentObject);
    }
  };
const handleSlotLabelMount = (arg: any) => {
    const rowEl = arg.el.closest(".fc-timegrid-slots tr") as HTMLElement | null; // Find the closest row element
    const rowEl1 = arg.el.closest(
      ".fc-timeGridWeek-view"
    ) as HTMLElement | null; // Find the closest row element
    if (rowEl) {
      rowEl.style.height = "100px"; // Set row height
    }
  }; // Run this effect only once after initial render

  return (
      <div className="">

        
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          start: "title",
          center: "",
          end: "today prev next",
        }}
        height="500px" // Set calendar height to 100% of viewport height
        contentHeight="auto" // Allow calendar to determine its own height based on content
        events={events}
        dateClick={handleEventClick}
        slotMinTime="09:00"
        slotMaxTime="17:00"
        slotDuration="01:00:00" // Set slot duration to 1 hour
        slotLabelDidMount={handleSlotLabelMount}
        slotLabelContent={(arg: any ) => {
          const hour = arg.date.getHours();
          return `${hour}:00 - ${hour + 1}:00`; // Format slot label as "9:00 - 10:00"
        }} // Custom slot label format
      />
      </div>
  );
};
export default Page;

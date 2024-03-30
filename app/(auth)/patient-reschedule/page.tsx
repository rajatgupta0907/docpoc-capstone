"use client"
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useClerk } from "@clerk/nextjs";
import { parse, format } from 'date-fns';

import { getAppointmentbyDoctor, rescheduleAppointment } from "@/lib/actions/appointment.actions";
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const clerk = useClerk();
  const currentUser = clerk.user;
  const searchParams = useSearchParams();
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null); // State to store selected date and time
 
  let newEvents: any[] = []; // Explicitly declare the type of newEvents

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const newDoctorId = searchParams.get("doctor_id") || "";
        const appointments = await getAppointmentbyDoctor({ doctor_id: newDoctorId });
        const dates = appointments.map((appointment) => appointment.appointment_date);
        console.log(dates);
        setBookedDates(dates);
        
  
  
        
        appointments.forEach((appointment) => {
      let newDate = new Date(appointment.appointment_date);
      let convert =newDate.toISOString().slice(0, 10);

    
      let time= appointment.appointment_time;
      const parsedTime = parse(time, 'h:mm:ss a', new Date());
      const formattedTime = format(parsedTime, 'HH:mm:ss');
      console.log(formattedTime);
      console.log(convert);
      newEvents.push({
              title: "booked",
              start: convert+"T"+formattedTime,
              end: convert+"T"+formattedTime,

              color: "red"
          });
      });

      setEvents(newEvents);
      
        console.log("events");
        console.log(newEvents);
  
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
  
    fetchAppointments();
  }, [searchParams]);
  
  const handleEventClick = async (arg: any) => {


    const clickedDate = arg.date;
    if (clickedDate < new Date()) {
      alert("You cannot select a time slot in the past.");
    } else {
      const formattedDate = clickedDate.toLocaleDateString();
      const formattedTime = clickedDate.toLocaleTimeString();
      const appointmentObject = {
        doctor_id: searchParams.get("doctor_id") || '',
        patient_id: currentUser!.id,
        appointment_date: formattedDate,
        appointment_time: formattedTime,
        prev_id: searchParams.get('id') || ''
      };
      try {
        await rescheduleAppointment(appointmentObject);
        setSelectedDateTime(clickedDate); // Update selected date and time
        
        
        
        fetchAppointments();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  async function fetchAppointments() {
    try {
      const newDoctorId = searchParams.get("doctor_id") || "";
      const appointments = await getAppointmentbyDoctor({ doctor_id: newDoctorId });
      const dates = appointments.map((appointment) => appointment.appointment_date);
      console.log(dates);
      setBookedDates(dates);
      


      
      appointments.forEach((appointment) => {
    let newDate = new Date(appointment.appointment_date);
    let convert =newDate.toISOString().slice(0, 10);

  
    let time= appointment.appointment_time;
    const parsedTime = parse(time, 'h:mm:ss a', new Date());
    const formattedTime = format(parsedTime, 'HH:mm:ss');
    console.log(formattedTime);
    console.log(convert);
    newEvents.push({
            title: "booked",
            start: convert+"T"+formattedTime,
            end: convert+"T"+formattedTime,

            color: "red"
        });
    });

    setEvents(newEvents);
    
      console.log("events");
      console.log(newEvents);

    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }



  const eventContent = (arg: any) => {
    const isBooked = bookedDates.includes(arg.event.startStr);
    const isSelected = selectedDateTime && arg.event.startStr === selectedDateTime.toISOString(); // Check if the event is selected
    let classNames = "";

    // Add custom class based on booking status
    if (isBooked) {
      classNames += " booked-event";
    }

    // Add custom class based on whether the event is selected
    if (isSelected) {
      classNames += " selected-event";
    }

    // Customize additional styles based on event properties
    const backgroundColor = isBooked ? "red" : (isSelected ? "blue" : "green");
    const borderColor = isBooked ? "darkred" : (isSelected ? "darkblue" : "darkgreen");
    const textColor = isBooked ? "white" : "black";
    const style = {
      backgroundColor,
      borderColor,
      color: textColor
    };

    return { 
      className: classNames,
      style
    };
  };

  const handleSlotLabelMount = (arg: any) => {
    const rowEl = arg.el.closest(".fc-timegrid-slots tr") as HTMLElement | null;
    if (rowEl) {
      rowEl.style.height = "100px";
    }
  };

  return (
    <div className="cal_appt" style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
      <FullCalendar 
        allDayClassNames="cal_allday"
        dayCellClassNames="cell"
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          start: "title",
          center: "",
          end: "today prev next",
        }}
        height="400px"
        contentHeight="auto"
        dateClick={handleEventClick}
        slotMinTime="09:00"
        slotMaxTime="17:00"
        slotDuration="01:00:00"
        slotLabelDidMount={handleSlotLabelMount}
        events={events}
        slotLabelContent={(arg: any) => {
          const hour = arg.date.getHours();
          return `${hour}:00 - ${hour + 1}:00`;
        }}
      />
    </div>
  );
};

export default Page;

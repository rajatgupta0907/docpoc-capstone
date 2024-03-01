"use client";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { currentUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
const Page = ({ params }: { params: { id: string } }) => {
  // const params = useParams();
  const clerk = useClerk();
  const currentUser = clerk.user;
  console.log(params.id);
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
      alert("Date: " + formattedDate + "\nTime: " + formattedTime);
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
    <>
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
        slotLabelContent={(arg) => {
          const hour = arg.date.getHours();
          return `${hour}:00 - ${hour + 1}:00`; // Format slot label as "9:00 - 10:00"
        }} // Custom slot label format
      />
    </>
  );
};

export default Page;

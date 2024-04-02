export const NavLinksLanding = [
  {
    link: "/our-doctors",
    displayName: "Our Doctors",
  },
  {
    link: "/services",
    displayName: "Services",
  },
  {
    link: "/about-us",
    displayName: "About Us",
  },
  {
    link: "/sign-in",
    displayName: "Account",
  },
];
export const HomePageCardContent = [
  {
    index: "1",
    image: "describing_issue.jpg",
    text: "Describing The Issue",
  },
  {
    index: "2",
    image: "chat_with_doctor.jpg",
    text: "Chat With Doctor",
  },
  {
    index: "3",
    image: "getting_prescription.jpg",
    text: "Getting Prescription",
  },
];
export const ServicesPageCards = [
  {
    id: 1,
    header: "Medical Advice",
    description:
      "Experience round-the-clock access to top medical specialists with our 24/7 online consultation service. Receive immediate, expert advice for any health concern, ensuring prompt and personalized care. Benefit from the convenience of ,connecting you to medical experts from the comfort of your home. Our platform revolutionizes healthcare, offering peace of mind and expert guidance",
    icon: "getadvice.svg",
  },
  {
    id: 2,
    header: "Video Call",
    description:
      "Engage in face-to-face virtual consultations from anywhere, ensuring personalized and  medical advice. This convenient platform brings expert healthcare to your fingertips, transforming how you manage your health with the added comfort of visual interaction. Embrace a new era of medical consultations, combining convenience, expertise, and the personal touch of real-time video communication",
    icon: "video_call.svg",
  },
  {
    id: 3,
    header: "Medical Advice",
    description:
      "Experience round-the-clock access to top medical specialists with our 24/7 online consultation service. Receive immediate, expert advice for any health concern, ensuring prompt and personalized care. Benefit from the convenience of ,connecting you to medical experts from the comfort of your home. Our platform revolutionizes healthcare, offering peace of mind and expert guidance",
    icon: "prescription_icon.svg",
  },
  // {
  //   id:4,
  //   header: "Medical Advice",
  //   description:
  //     "Experience round-the-clock access to top medical specialists with our 24/7 online consultation service. Receive immediate, expert advice for any health concern, ensuring prompt and personalized care. Benefit from the convenience of ,connecting you to medical experts from the comfort of your home. Our platform revolutionizes healthcare, offering peace of mind and expert guidance",
  //     icon:"video_call.svg"
  // },
];

export const ServicesWeCantProvide = [
  "Emergency Assitance",
  "Complex Chronic Condition Management",
  "Surgical Procedures",
  "Vaccinations and Certain Treatments",
  "Diagnostic Testing",
];

export const OurMission = [
  {
    boldText: "Accessiblity:",
    description:
      "To make healthcare accessible to everyone, regardless of their location or the time of day, breaking down the barriers to a healthier life.",
  },
  {
    boldText: "Quality Care:",
    description:
      "To ensure every interaction on our platform is with certified, experienced, and compassionate healthcare professionals.",
  },
  {
    boldText: "Privacy and Security:",
    description:
      "To protect our users' privacy with the highest standards of data protection, ensuring confidentiality and security in all medical consultations.",
  },
  {
    boldText: "Innovation:",
    description:
      "To continuously improve and innovate our services by integrating the latest technologies in telemedicine, ensuring we meet the evolving needs of our patients and healthcare providers.",
  },
];
export const DoctorTypes = [
  "General Practitioner",
  "Ophthalmologist",
  "Pediatrician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic Surgeon",
  "Psychiatrist",
  "Gynecologist",
  "Urologist",
  "Endocrinologist",
  "Oncologist",
  "Dentist",
];
// export const chatUrl = process.env.NEXT_CHAT_URL || "http://localhost:3001";
export const chatUrl = "http://ec2-35-183-30-231.ca-central-1.compute.amazonaws.com:3001"
console.log("CHAT URL", chatUrl);

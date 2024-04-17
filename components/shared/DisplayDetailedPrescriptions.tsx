"use client";
import { pdf } from '@/lib/pdf';

interface Medicine {
  medicinename: string;
  medicinetype: string;
  medicineqty: number;
}

interface Props {
  patientname: string;
  doctorname: string;
  uniqueappointmentid: string;
  typeofdisease: string;
  description: string;
  medicines: Medicine[];
}

const DisplayDetailedPrescriptions = ({
  patientname,
  doctorname,
  uniqueappointmentid,
  description,
  typeofdisease,
  medicines,
}: Props) => {
  const handleDownloadInvoice = () => {
    const pdfGenerator = new pdf();
    pdfGenerator.downloadinvoice(
      patientname,
      doctorname,
      uniqueappointmentid,
      typeofdisease,
      description,
      medicines
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Appointment Details</h1>
      <div className="bg-blue-500 p-6 rounded-lg shadow-md text-white">
        <p>
          <span className="font-semibold">Patient Name:</span> {patientname}
        </p>
        <p>
          <span className="font-semibold">Doctor Name:</span> {doctorname}
        </p>
        <p>
          <span className="font-semibold">Appointment Unique ID:</span> {uniqueappointmentid}
        </p>
        <p>
          <span className="font-semibold">Type of Disease:</span> {typeofdisease}
        </p>
        <p>
          <span className="font-semibold">Description Disease:</span> {description}
        </p>
      </div>
      <h2 className="text-2xl font-semibold text-black mt-8 mb-4">Medicines Prescribed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medicines.map((medicine, index) => (
          <div key={index} className="p-4 bg-green-500 shadow rounded-lg text-white">
            <h2 className="text-xl font-semibold">{medicine.medicinename}</h2>
            <p>Type: {medicine.medicinetype}</p>
            <p>Quantity: {medicine.medicineqty}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleDownloadInvoice}
        className="mt-8 py-3 px-6 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md text-gray-800 font-semibold transition duration-300 ease-in-out"
      >
        Download Invoice
      </button>
    </div>
  );
};

export default DisplayDetailedPrescriptions;

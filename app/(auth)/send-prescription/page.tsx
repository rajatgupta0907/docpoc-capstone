"use client"
import DoctorNavbar from '@/components/navbars/DoctorNavbar';
import { createMedicines } from '@/lib/actions/medicine.actions';
import React, { useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation'

interface Medicine {
  name: string;
  doseType: string;
  totalTablets: number;
}

export default function Page() {

  const searchParams = useSearchParams();
  const uniqueaptid = searchParams.get('id') || "";
  const doctor_id = searchParams.get('doctor_id') || "";
  const patient_id = searchParams.get('patient_id') || "";
  const doctor_name = searchParams.get('doctor_name');
  const patient_name = searchParams.get('patient_name');
  const appointment_date = searchParams.get('appointment_date');
  const appointment_time= searchParams.get('appointment_time');
  const [medicineCreated, setMedicineCreated] = useState<boolean>(false);


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputFields, setInputFields] = useState<Medicine[]>([{ name: "", doseType: "", totalTablets: 0 }]);
  const handleInputChange = (index: number, fieldName: keyof Medicine, value: string | number) => {
    const updatedInputFields = [...inputFields];
    updatedInputFields[index] = {
      ...updatedInputFields[index],
      [fieldName]: value
    };
    setInputFields(updatedInputFields);
  };
  
  

  const handleAddInputField = () => {
    setInputFields([...inputFields, { name: '', doseType: '', totalTablets: 0 }]);
  };

  const handleRemoveInputField = (index: number) => {
    const fields = [...inputFields];
    fields.splice(index, 1);
    setInputFields(fields);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get('name') as string;
      const description = formData.get("description") as string;
      const typeofdisease= formData.get("typeofdisease") as string;
      formData.append('name', name);
      formData.append('description', description);
      formData.append('medicines', JSON.stringify(inputFields));
      formData.append('uniqueaptid',uniqueaptid);
      formData.append('doctor_id',doctor_id);
      formData.append('patient_id',patient_id);

      formData.append('typeofdisease',typeofdisease);
      console.log(typeofdisease);

      const response = await createMedicines(formData);
      if(response){
        setMedicineCreated(true);
        setIsLoading(false);
        
      }else{
        setIsLoading(false);

      }
      
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='mb-[150px]'>
        <DoctorNavbar />
      </div>
      <div className="max-w-[75%] mx-auto bg-white rounded-lg shadow-lg p-6">
  <h2 className='text-black'>Send Prescription</h2>
  {error && <div className="text-red-500 mb-4">{error}</div>}
  
{medicineCreated && (
  <div className="text-green-500 mb-4">Prescription created successfully!</div>
)}
  <form onSubmit={onSubmit} className="text-black">
    <input
      type='text'
      name="name"
      className="border border-gray-300 rounded-md px-4 py-2 w-full mr-2 focus:outline-none focus:border-blue-400 mb-5"
      placeholder='Enter patient name'
      
    />
    <input
      type='text'
      name="typeofdisease"
      className="border border-gray-300 rounded-md px-4 py-2 w-full mr-2 focus:outline-none focus:border-blue-400 mb-5"
      placeholder='Please enter disease type'
      
    />
    {inputFields.map((medicine, index) => (
      <div key={index} className="flex flex-wrap items-center mb-4">
        {/* Medicine Name Input */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-full mr-2 focus:outline-none focus:border-blue-400"
            placeholder="Enter Medicine Name"
            value={medicine.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
        </div>
        {/* Dose Type Input */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-full mr-2 focus:outline-none focus:border-blue-400"
            placeholder="Enter Dose Type"
            value={medicine.doseType}
            onChange={(e) => handleInputChange(index, 'doseType', e.target.value)}
          />
        </div>
        {/* Total Tablets Input */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="number"
            className="border border-gray-300 rounded-md px-4 py-2 w-full mr-2 focus:outline-none focus:border-blue-400"
            placeholder="Enter Total Tablets"
            value={medicine.totalTablets}
            onChange={(e) => handleInputChange(index, 'totalTablets', parseInt(e.target.value))}
          />
        </div>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 md:ml-0"
          onClick={() => handleRemoveInputField(index)}
        >
          Remove
        </button>
      </div>
    ))}
   <textarea
  name="description"
  className="border border-gray-300 rounded-md px-4 py-2 w-full mr-2 focus:outline-none focus:border-blue-400 mb-5 resize-none"
  placeholder='Enter Detail About Description'
  style={{ resize: "none", height: "auto" }}
  onChange={(e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }}
/>


    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleAddInputField}
    >
      Add Medicine
    </button>
    <button
      type="submit"
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
    >
      {isLoading ? 'Loading...' : 'Submit'}
    </button>
  </form>
</div>


    </>
  );
}

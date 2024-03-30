"use client"
import React, { useState, FormEvent } from 'react';
import { createRating } from '@/lib/actions/rating.actions';
import Link from 'next/link';

interface Params {
    doctor_id: string,
    patient_id: string
}
export default function SendReviewCards({
    patient_id,
    doctor_id
  }: Params) {

  const [rating, setRating] = useState<number | null>(null);
  const [nameError, setNameError] = useState<string>('');
  const [ratingError, setRatingError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get('name') as string;
      const description = formData.get("description") as string;

      // Check if name, rating, and description are not empty
      if (!name) {
        setNameError('Name cannot be empty');
      } else {
        setNameError('');
      }

      if (!rating) {
        setRatingError('Please select a rating');
      } else {
        setRatingError('');
      }

      if (!description) {
        setDescriptionError('Description cannot be empty');
      } else {
        setDescriptionError('');
      }

      if (name && rating && description) {
        // Include rating value in form data
        formData.append('name', name);
        formData.append('description', description);
        formData.append('doctor_id', doctor_id);
        formData.append('patient_id', patient_id);
        formData.append('rating', String(rating));
        
        const response = await createRating(formData);
        if (response) {
          setSuccessMessage('Rating created successfully!');
        } else {
          setSuccessMessage('');
          // Handle error case if needed
        }
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  // Function to handle rating selection
  const handleRatingClick = (value: number) => {
    setRating(value === rating ? null : value);
  };

  return (
    <>
      <div className='mb-[150px]'>
      </div>
      <div className="max-w-[75%] mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className='text-black'>Send Your Review</h2>

        <form onSubmit={onSubmit} className="text-black">
          <input
            type='text'
            name="name"
            className="border border-gray-300 rounded-md px-4 py-2 w-full mr-2 focus:outline-none focus:border-blue-400 mb-1"
            placeholder='Enter Your name'
          />
          {nameError && <p className="text-red-500">{nameError}</p>}

          {/* Rating Stars */}
          <div className="flex items-center mt-2.5 mb-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <svg
                key={value}
                className={`w-4 h-4 text-yellow-300 cursor-pointer ${
                  value <= (rating || 0) ? 'text-yellow-500' : ''
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                onClick={() => handleRatingClick(value)}
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            {ratingError && <p className="text-red-500">{ratingError}</p>}
          </div>

          <textarea
            name="description"
            className="border border-gray-300 rounded-md px-4 py-2 w-full mr-2 focus:outline-none focus:border-blue-400 mb-1 resize-none"
            placeholder='Enter Detail About Description'
            style={{ resize: "none", height: "auto" }}
            onChange={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          {descriptionError && <p className="text-red-500">{descriptionError}</p>}

          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Give My Review
          </button>
        </form>
        <br></br>

        <Link href={"/my-prescriptions"} className=" flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-red border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-red-800 dark:bg-red-900 hover:bg-red-100 dark:text-gray-200 dark:border-gray-700">
          <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          <span>Go back</span>
      </Link>
      </div>
    </>
  );
}

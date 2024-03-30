import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getRatingByDoctor } from "@/lib/actions/rating.actions";

interface Params {
  id: string;
  bio: string;
  image: string;
  name: string;
  speciality: string;
  isVerified: boolean;
}

interface Rating {
  _id: string;
  name: string;
  doctor_id: string;
  patient_id: string;
  rating: number;
  description: string;
  __v: number;
}

export default function DisplayDoctors({
  id,
  bio,
  image,
  name,
  speciality,
  isVerified,
}: Params) {
  if (!isVerified) {
    return null;
  }

  const [overallRating, setOverallRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await getRatingByDoctor({ doctor_id: id });

        if (response ) {
          const ratings: Rating[] = response; // Assuming response.data contains the array of ratings
          const totalRatings = ratings.length;

          if (totalRatings === 0) {
            setOverallRating(5);
          } else {
            const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
            const avgRating = sum / totalRatings;
            setOverallRating(avgRating);
          }
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    fetchRating();
  }, [id]);

  return (
    
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
    <div className="dd_cards bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
      {/* Removed margin */}
      <Link href="#">
        <img className="rounded-lg mb-4" src={image} alt="product image" />
      </Link>
      <div className="flex flex-col justify-between h-full">
        <div>
          <Link href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
              {name}
            </h5>
          </Link>
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {/* Render star icons based on overallRating */}
              {overallRating &&
                [...Array(Math.round(overallRating))].map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {overallRating ? overallRating.toFixed(1) : "N/A"}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-400 mb-4">{bio}</p>
        </div>
        <div>
          <Link
            href={`/details-doctor/${id}`}
            className="btn_booknow text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  </div>

  );
}

import { detailsfetchdoctor } from "@/lib/actions/admin.actions";
import Link from "next/link";
import { getRatingByDoctor } from "@/lib/actions/rating.actions";
import NavBars from "@/components/navbars/NavBars";

interface Rating {
  _id: string;
  name: string;
  doctor_id: string;
  patient_id: string;
  rating: number;
  description: string;
  __v: number;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const doctor = await detailsfetchdoctor(params.id);
  const response = await getRatingByDoctor({ doctor_id: params.id });
  let overallRating = 5;
  let reviews: Rating[] = [];

  if (response) {
    const ratings: Rating[] = response;
    const totalRatings = ratings.length;

    if (totalRatings === 0) {
      overallRating = 5;
    } else {
      const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
      const avgRating = sum / totalRatings;
      overallRating = avgRating;
      reviews = ratings;
    }
  }

  return (
    <>
      <NavBars />
      <div className="font-sans">
        <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center p-8 rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt="Doctor"
                  className="w-full h-auto rounded-lg object-cover transition-transform transform-gpu hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                {doctor.name}
              </h2>
              <div className="flex items-center mb-2 text-gray-600">
                <span className="mr-1 flex justify-center align-center">
                  Rating:
                </span>
                <span className="flex items-center justify-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      className={`w-6 h-6 ${
                        index < Math.round(overallRating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 1L12.24 6.77L18.18 7.83L13.46 12.17L14.59 18L10 15.4L5.41 18L6.54 12.17L1.82 7.83L7.76 6.77L10 1Z"
                      />
                    </svg>
                  ))}
                </span>
                <span className="ml-1">{overallRating.toFixed(2)}</span>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  About Myself
                </h3>
                <p className="mt-2 text-sm text-gray-600">{doctor.bio}</p>
                <h3 className="mt-4 text-lg font-bold text-gray-800">
                  Speciality: {doctor.speciality}
                </h3>
              </div>

              <div className="mt-8 flex justify-between">
                <Link
                  href={`/create-appointment/${params.id}`}
                  className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
                >
                  Book Now
                </Link>
                <Link
                  href={`/patient-dashboard`}
                  className="inline-block px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition duration-200"
                >
                  Go Back
                </Link>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Reviews</h3>
                <div className="mt-4 space-y-4">
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-white shadow-md rounded-lg p-4"
                    >
                      <img
                        src="https://readymadeui.com/team-2.webp"
                        className="w-12 h-12 rounded-full border-2 border-white"
                        alt="Profile"
                      />
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {review.name}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {review.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

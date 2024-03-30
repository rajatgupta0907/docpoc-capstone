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
            <div className="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center p-8">
              <img src={doctor.image} alt="Doctor" className="w-4/5 rounded object-cover" />
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-gray-800">{doctor.name}</h2>
              <div className="flex flex-wrap gap-4 mt-4"></div>
              <div className="flex space-x-2 mt-4">
              <h2 className="text-2xl font-extrabold text-gray-800">{overallRating}</h2>
                {[...Array(Math.round(overallRating))].map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 fill-gray-800"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                    />
                  </svg>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800">About Myself</h3>
                <p className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                  {doctor.bio}
                  <h3 className="text-lg font-bold text-gray-800 mt-5">My Speciality: {doctor.speciality}</h3>
                </p>
              </div>
              <div className="mt-8 max-w-md">
                <h3 className="text-lg font-bold text-gray-800">Reviews</h3>
                <div className="space-y-3 mt-4">
                  {reviews.map((review, index) => (
                    <div key={index} className="flex items-center mb-4">
                     <br></br>
                      <img src="https://readymadeui.com/team-2.webp" className="w-12 h-12 rounded-full border-2 border-white" />
                      <div >
                        <h4 className="font-extrabold text-gray-800">{review.name}</h4>
                        <p className="text-sm mt-1 font-bold text-gray-800">{review.description}</p>
                      </div>
                    </div>
                  ))}
                 
                </div>
                <br></br>
                <Link
                  href={`/create-appointment/${params.id}`}
                  className="w-full mt-10 px-4  py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded"
                >
                  Book Now
                </Link>
             

                 </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

import NavBar from "@/components/shared/navbar";
import { detailsfetchdoctor } from "@/lib/actions/admin.actions";
import Link from "next/link";
import { getRatingByDoctor } from "@/lib/actions/rating.actions";

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
  let descriptions: string[] = [];

  if (response) {
    const ratings: Rating[] = response;
    const totalRatings = ratings.length;

    if (totalRatings === 0) {
      overallRating = 5;
    } else {
      const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
      const avgRating = sum / totalRatings;
      overallRating = avgRating;
      // Extract all descriptions from ratings
      descriptions = ratings.map((rating) => rating.description);
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <NavBar />
                <div >
                <div >
                    <h1 >
                    {doctor.name}'s Details
                    </h1>
                    {doctor ? (
                        <div>
        <img src={doctor.image} alt="Doctor"  />
        <div >
            <h2>
            {doctor.name}
            </h2>
            <p>
            {doctor.speciality}
            </p>
            <p>
            {doctor.bio}
            </p>
            <p>
            Phone Number:{" "}
            <a href={`tel:${doctor.phonenumber}`}>
                {doctor.phonenumber}
            </a>
            </p>
            <br />
            <Link
            href={`/create-appointment/${params.id}`}
            >
            Appointment
            </Link>
        </div>
        </div>
              
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div>
                  <div>
                    <h3>
                      Overall Rating
                    </h3>
                    <div>
                      {/* Render star icons based on overallRating */}
                      {[...Array(Math.round(overallRating))].map((_, index) => (
                        <svg
                          key={index}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3.224l1.375 3.939h4.414l-3.563 2.781L14.75 17.75 10 14.875 5.25 17.75l.563-7.607L2.211 7.163H6.625L8 3.224z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ))}
                      <span className="text-gray-600 ml-2">
                        {overallRating.toFixed(1)}
                      </span>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Descriptions</h3>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {descriptions.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-sm text-gray-600">
                      Ratings and reviews provided by patients.
                    </p>
                  </div>
                </div>
      </div>
    </>
  );
};

export default Page;

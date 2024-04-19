"use client";
import { getDoctor } from "@/lib/actions/admin.actions";
import { fetchDoctors } from "@/lib/actions/doctor.actions";
import { DoctorTypes } from "@/lib/constants";
import { DoctorSearchValidation } from "@/lib/validations/doctor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";

type Inputs = z.infer<typeof DoctorSearchValidation>;

const DoctorFilter = ({ setDoctors, perPage, page }: any) => {
  useEffect(() => {
    const fetch = async () => {
      const data = await getDoctor(perPage, page);
      setDoctors(data);
    };
    fetch();
  }, [perPage, setDoctors, page]);

  const [data, setData] = useState<Inputs>();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(DoctorSearchValidation),
    defaultValues: {
      emergency: false,
    },
  });
  const fetchDoctorsFromBackend = async (
    name: string,
    specialty: string
  ): Promise<any> => {
    const response = await fetchDoctors({ name, specialty });
    console.log(response);
    return response;
  };
  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    reset();
    setData(data);
    if (data.emergency === true) {
      console.log("EMERGENCY", data.emergency);
      const ds = await fetchDoctorsFromBackend(data.name, data.specialty);
      console.log(ds);
      const emergencyDoctors = ds.items.filter((item: any) => {
        return item.emergency === "yes";
      });
      console.log("EMERGENCY_DOCTORS", emergencyDoctors);
      setDoctors({
        ...ds,
        items: emergencyDoctors,
      });
    } else {
      setDoctors(await fetchDoctorsFromBackend(data.name, data.specialty));
    }
  };
  const clickc = () => {
    console.log("first");
  };
  useEffect(() => {
    // Watch for changes in the form data and update the form state accordingly
    setValue("emergency", watch("emergency"));
  }, [setValue, watch]);

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="w-full flex flex-wrap"
    >
      <div className="text-black w-full">
        <div className="w-full mb-4">
          <input
            placeholder="Search By Name"
            className="rounded-lg  md:w-1/3  text-black w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div className="w-full mb-4">
          <select
            id=""
            {...register("specialty")}
            className="rounded-lg text-black md:w-1/3  w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Select By Specialty
            </option>
            {DoctorTypes.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.specialty?.message && (
            <p className="text-sm text-red-400">{errors.specialty.message}</p>
          )}
        </div>
        <div className="w-full mb-4">
          <Checkbox
            id="terms1"
            {...register("emergency")}
            defaultChecked={false}
            onCheckedChange={(checked) => {
              console.log(checked);
              setValue("emergency", !!checked);
            }}
          />
          <label
            htmlFor="terms1"
            className="mx-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Need Emergency?
          </label>
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
export default DoctorFilter;

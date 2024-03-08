"use client";
import { DoctorTypes } from "@/lib/constants";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Link } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { DoctorSearchValidation } from "@/lib/validations/doctor";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { getDoctor } from "@/lib/actions/admin.actions";
import { fetchDoctors } from "@/lib/actions/doctor.actions";

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
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(DoctorSearchValidation),
  });
  // const form = useForm({
  //   resolver: zodResolver(DoctorSearchValidation),
  //   defaultValues: {
  //     name: "",
  //     specialty: DoctorTypes[0],
  //   },
  // });
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
    // const name = data.name;
    // const specialty = data.specialty;
    // console.log(specialty);
    setDoctors(await fetchDoctorsFromBackend(data.name, data.specialty));
  };
  const clickc = () => {
    console.log("first");
  };
  return (
    <div className="df_form text-black">
      <form onSubmit={handleSubmit(processForm)} className="w-2/3 space-y-6">
        <div>
          <input
            placeholder="name"
            className="rounded-lg text-black"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div className="df_formContainer">
          {/* <input
            placeholder="name"
            className="rounded-lg text-black"
            {...register("specialty")}
          /> */}
          <select id="" {...register("specialty")}>
          <option value="" selected disabled>Select your specialty</option>
           
            {DoctorTypes.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.specialty?.message && (
            <p className="text-sm text-red-400">{errors.specialty.message}</p>
          )}
        
        <button type="submit" onClick={handleSubmit(processForm)}>
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};
export default DoctorFilter;

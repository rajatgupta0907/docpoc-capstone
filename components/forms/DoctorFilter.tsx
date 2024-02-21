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
import { useForm } from "react-hook-form";
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
import { useEffect } from "react";
import { getDoctor } from "@/lib/actions/admin.actions";
import { fetchDoctors } from "@/lib/actions/doctor.actions";

const DoctorFilter = ({ setDoctors, perPage, page }: any) => {
  useEffect(() => {
    const fetch = async () => {
      const data = await getDoctor(perPage, page);
      setDoctors(data);
    };
    fetch();
  }, [perPage, setDoctors, page]);
  const form = useForm({
    resolver: zodResolver(DoctorSearchValidation),
    defaultValues: {
      name: "",
      specialty: DoctorTypes[0],
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
  async function onSubmit(data: z.infer<typeof DoctorSearchValidation>) {
    const name = data.name;
    const specialty = data.specialty;
    console.log(specialty);
    setDoctors(await fetchDoctorsFromBackend(name, specialty));
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialty</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified specialty to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DoctorTypes.map((d, i) => {
                      return (
                        <SelectItem key={i} value={d}>
                          {d}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  {"Doctor's Name"}
                </FormLabel>
                <FormControl className="no-focus border-dark-4 bg-dark-3 text-light-1">
                  <Input
                    type={"text"}
                    className="account-form_input text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};
export default DoctorFilter;

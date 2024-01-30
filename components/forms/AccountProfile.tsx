"use client"

import {useForm} from 'react-hook-form';
import  {zodResolver} from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { UserValidation } from '@/lib/validations/user';
import { z } from 'zod';
interface Props{
    user:{
        id: string,
        email: string,
        objectid: string,
        username: string,
        name: string,
        age: string,
        bio: string,
        image: string

    };
    btnTitle: string;
}


const AccountProfile = ({user,btnTitle}:Props) =>{
    const form=useForm({
        resolver:zodResolver(UserValidation),
        defaultValues: {
            profile_photo: '',
            name: "",
            username: "",
            bio: ""
        }
    });

    function onSubmit(values: z.infer<typeof UserValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("values")
      }
    
    
    
    return (
        <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {
                    field.value ?
                     (
                        <Image src={field.value} alt="profile photo" width={96} height={96} priority 
                     className='rounded-full object-contain'/>) :(
                        <Image src="/assets/profile.png" alt="profile photo" width={96} height={96} priority 
                        className='rounded-full object-contain'/>
                     )
                }
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

        </div>
    )
}
export default AccountProfile;
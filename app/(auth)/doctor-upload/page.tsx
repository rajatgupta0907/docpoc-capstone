"use client";
import React, { useState, ChangeEvent } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { mystorage } from "@/services/firebase";

import DoctorNavbar from "@/components/navbars/DoctorNavbar";
import { getDownloadURL } from "firebase/storage";
import { createverificationDoctor } from "@/lib/actions/verification.actions";
import { useAuth } from "@clerk/nextjs";

const Page: React.FC = () => {
  const {userId} = useAuth();
  if(!userId){return};
  const [images, setImages] = useState<FileList | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setImages(selectedFiles);
    }
  };

  const uploadFiles = async () => {
    if (!images) return;

    const urls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageRef = ref(mystorage, `/mulitpleFiles/${image.name}`);

      try {
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        urls.push(url);
        console.log("Image uploaded to Firebase Storage:", url);
      } catch (error) {
        console.error("Error uploading image to Firebase Storage:", error);
      }
    }

    setImageUrls(urls);

    // Upload image URLs to MongoDB
    const success = await createverificationDoctor({ id: userId, url: urls });
    if(success){
      setUploadSuccess(success);
  
    }
  };

  return (
    <div className="container mx-auto">
      <DoctorNavbar />
      <h1 className="mt-20 text-black">Please Upload Documents to Get Verified</h1>
      <h3 className=" text-black">Supported Documents Government/</h3>
      <div className="mt-8 flex flex-col items-center">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="py-2 px-4 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={uploadFiles}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
      </div>
      {/* Display upload success message */}
      {uploadSuccess !== null && (
        <div className="mt-4 text-green-600">
          {uploadSuccess ? "Data uploaded successfully!" : "Failed to upload data."}
        </div>
      )}
    </div>
  );
};

export default Page;

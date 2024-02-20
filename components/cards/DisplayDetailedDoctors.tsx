
import React, { useEffect, useState } from "react";

import Link from "next/link";
 import { detailsfetchdoctor } from "@/lib/actions/admin.actions";

interface Params {
    id: string; // Adjust the type as per your data structure
    
}
  const DisplayDetailedDoctors = async ({ id}: Params) => {
    
    const doctor = await detailsfetchdoctor(id);
    console.log(doctor);
    return(
        <>
        </>               

        
        );
}

export default DisplayDetailedDoctors; 

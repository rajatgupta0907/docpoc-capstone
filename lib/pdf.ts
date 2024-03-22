import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Medicine {
  medicinename: string;
  medicinetype: string;
  medicineqty: number;
}

interface FetchDataFromDatabase {
  uniqueappointmentid: string;
  typeofdisease: string;
}
export class pdf {
    public downloadinvoice(
      patientname: string,
      doctorname: string,
      uniqueappointmentid: string,
      typeofdisease: string,
      description: string,
      medicines: Medicine[]
    ): void {
      const doc = new jsPDF();
  
      // Define footer text
      const footerText = "DOC POC";
  
      // Title
      doc.setFontSize(22);
      doc.setTextColor("#007bff"); // Blue color
      doc.text("My Prescription", 15, 20);
  
      // Patient and Doctor Details
      doc.setFontSize(14);
      doc.setTextColor("#333"); // Dark grey color
      doc.text(`Patient Name: ${patientname}`, 15, 35);
      doc.text(`Doctor Name: ${doctorname}`, 15, 45);
      doc.text(`Appointment Unique ID: ${uniqueappointmentid}`, 15, 55);
      doc.text(`Type of Disease: ${typeofdisease}`, 15, 65);
  
      // Description
      doc.setFontSize(14);
      doc.setTextColor("#333");
      doc.text("Description:", 15, 80);
      doc.setTextColor("#666");
      doc.setFont("italic"); // Set font style to italic
      doc.text(description, 15, 90);
      
      // Medicines Table
      doc.setFontSize(18);
      doc.setTextColor("#007bff"); // Blue color
      doc.text("Medicines Prescribed", 15, 115);
  
      const medicinesData = medicines.map(medicine => [medicine.medicinename, medicine.medicinetype, medicine.medicineqty]);
      autoTable(doc, {
        startY: 125,
        head: [['Medicine Name', 'Type', 'Quantity']],
        body: medicinesData,
        theme: 'striped',
        styles: { fontSize: 12 },
        headStyles: { fillColor: "#007bff", textColor: "#ffffff" },
        bodyStyles: { textColor: "#333" } 
      });
  
      let totalPages = 1;
        const { width, height } = doc.internal.pageSize;
        for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setTextColor("#666");
        doc.setFontSize(10);
        doc.text(footerText, width / 2, height - 10, { align: "center" });
        }

  
      doc.save("appointment_details.pdf");
    }
  }
  
const  {generatePdf} = require('../../MIDDLEWARES/pdf_generator');

const generateInspectionList = async (req,res) =>
            {
            const {inspectedBy,driverName,Vehicle,currentMileAge,boundTo,timeofInspection,dateOfInspection,dateOfTravel} =req.body;
        try
            {
              const inspectionList = await  generatePdf(inspectedBy,driverName,Vehicle,currentMileAge,boundTo,timeofInspection,dateOfInspection,dateOfTravel);
            
            if(!inspectionList)
                {
                    return res.status(400).json({message:'Unable to fetch pdf'})
            } 
            
            const pdfBlob = await response.blob();
            const pdfUrl = URL.createObjectURL(pdfBlob);
      
            console.log("PDF generated successfully. Redirecting to the PDF...");
      
            // Create a link element for downloading the PDF
            const link = document.createElement("a");
            link.href = pdfUrl;
            link.download = "AuthorityToTravel.pdf"; // Set the download file name
            document.body.appendChild(link); // Append the link to the document
            link.click(); // Trigger the download
            document.body.removeChild(link); // Clean up the link
            return;            
            }catch(error)
            {

            }
}
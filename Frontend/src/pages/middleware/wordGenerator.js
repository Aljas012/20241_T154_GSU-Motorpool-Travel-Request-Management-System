import { PDFDocument } from 'pdf-lib';

const PdfGenerator = async(
  name, 
  auth_travel_number, 
  date, 
  position, 
  department, 
  purpose_travel, 
  destination, 
  travel_time_period, 
  fundSource, 
  checked
) =>{
  const fontSize = 12;
  const checkedCheckBox = '☑'; // Checked checkbox symbol
  const nullCheckBox = '☐';   // Unchecked checkbox symbol

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Embed a font (you can use built-in fonts or custom ones)
  const font = await pdfDoc.embedFont('Helvetica');
  
  // Add a page to the PDF document
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  // Embed the logo (replace with the correct path to the image)
  const buksuLogoUrl = 'path_to_your_logo.png'; // You need to provide the actual path for image
  const buksuLogoBytes = await fetch(buksuLogoUrl).then(res => res.arrayBuffer());
  const buksuLogoImage = await pdfDoc.embedPng(buksuLogoBytes);

  // Draw the logo in the header
  const logoWidth = 100;
  const logoHeight = 100;
  page.drawImage(buksuLogoImage, {
    x: width / 2 - logoWidth / 2,
    y: height - logoHeight - 20,
    width: logoWidth,
    height: logoHeight
  });

  // Draw the university text (centered)
  page.drawText('BUKIDNON STATE UNIVERSITY', {
    x: width / 2 - 120,
    y: height - 150,
    size: 24,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Add contact information under the university name (centered)
  const contactInfoY = height - 180;
  page.drawText('Fortich St. Malaybalay City', { x: width / 2 - 120, y: contactInfoY, size: 12, font: font });
  page.drawText('Tel (088) 813-5681 to 5663', { x: width / 2 - 120, y: contactInfoY - 15, size: 12, font: font });
  page.drawText('www.buksu.edu.ph', { x: width / 2 - 120, y: contactInfoY - 30, size: 12, font: font });
  page.drawText('buksupreoffice@buksu.edu.ph', { x: width / 2 - 120, y: contactInfoY - 45, size: 12, font: font });

  // Title "AUTHORITY TO TRAVEL"
  page.drawText('AUTHORITY TO TRAVEL', {
    x: width / 2 - 120,
    y: contactInfoY - 80,
    size: 15,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Add travel info
  const travelInfoY = contactInfoY - 120;
  page.drawText(`Authority Travel No. ${auth_travel_number}`, { x: width - 250, y: travelInfoY, size: 12, font: font });
  page.drawText(`Date: ${date}`, { x: 50, y: travelInfoY, size: 12, font: font });
  page.drawText(`NAME: ${name}`, { x: 50, y: travelInfoY - 15, size: 12, font: font });
  page.drawText(`Position/Designation: ${position}`, { x: 50, y: travelInfoY - 30, size: 12, font: font });
  page.drawText(`Official Station: ${department}`, { x: 50, y: travelInfoY - 45, size: 12, font: font });
  page.drawText(`Purpose: ${purpose_travel}`, { x: 50, y: travelInfoY - 60, size: 12, font: font });
  page.drawText(`Destination: ${destination}`, { x: 50, y: travelInfoY - 75, size: 12, font: font });
  page.drawText(`Period Covered: ${travel_time_period}`, { x: 50, y: travelInfoY - 90, size: 12, font: font });
  page.drawText(`Fund Source: ${fundSource}`, { x: 50, y: travelInfoY - 105, size: 12, font: font });

  // Checkbox for vehicle usage
  const textContent = checked
    ? `Use of Vehicle: ${checkedCheckBox} with government vehicle  ${nullCheckBox} without government vehicle`
    : `Use of Vehicle: ${nullCheckBox} with government vehicle  ${checkedCheckBox} without government vehicle`;

  page.drawText(textContent, {
    x: 50,
    y: travelInfoY - 120,
    size: 12,
    font: font,
  });

  // Signature lines
  page.drawText('Full designation', { x: 50, y: travelInfoY - 145, size: 12, font: font });
  page.drawText('DEAN', { x: 50, y: travelInfoY - 160, size: 12, font: font });
  page.drawText('VPAA', { x: 50, y: travelInfoY - 175, size: 12, font: font });

  // Approval section
  page.drawText('APPROVED:', { x: 50, y: travelInfoY - 190, size: 12, font: font });
  page.drawText(`${nullCheckBox} Official Business`, { x: 50, y: travelInfoY - 205, size: 12, font: font });
  page.drawText(`${nullCheckBox} Official Time Only`, { x: 50, y: travelInfoY - 220, size: 12, font: font });
  page.drawText(`${nullCheckBox} Reimbursement of Actual Transportation`, { x: 50, y: travelInfoY - 235, size: 12, font: font });
  page.drawText(`${nullCheckBox} Travel expenses Maybe Allowed Subject to Availability of Funds`, { x: 50, y: travelInfoY - 250, size: 12, font: font });

  // Draw the president's name and title
  page.drawText('JOY M. MIRASOL PhD', { x: 50, y: travelInfoY - 270, size: 20, font: font });
  page.drawText('University President', { x: 50, y: travelInfoY - 285, size: 12, font: font });

  // Save the PDF to a byte array (in memory)
  const pdfBytes = await pdfDoc.save();

  // Create a Blob from the PDF byte array
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  // Create a link to trigger the download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'AuthorityToTravel.pdf'; // Specify the filename for download
  link.click(); // Programmatically trigger the download

  console.log('PDF created successfully!');
}

export default PdfGenerator;

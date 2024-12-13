const admin_request_model = require('../../MODELS/admin_request_model')
const request_model = require('../../MODELS/request_form_model')
const PDFDocument = require('pdfkit');
const innovateLogo = 'https://res.cloudinary.com/dvhfgstud/image/upload/v1733239402/467198922_588876523648635_1569889043517254517_n_nnoyav.jpg'
const buksuLogo = 'https://res.cloudinary.com/dvhfgstud/image/upload/v1733117339/buksu-logo-min-1024x1024_ye6b58.png';


    class createDTT{
        constructor() {
            this.doc = new PDFDocument({
                size: 'A4',
                margin: 50
            });
        }

        async addHeader(leftLogoUrl, rightLogoUrl) {
            try {
                const leftResponse = await fetch(leftLogoUrl);
                if (!leftResponse.ok) {
                    throw new Error(`HTTP error! status: ${leftResponse.status}`);
                }
                const leftArrayBuffer = await leftResponse.arrayBuffer();
                const leftLogoBuffer = Buffer.from(leftArrayBuffer);
                const rightResponse = await fetch(rightLogoUrl);
                if (!rightResponse.ok) {
                    throw new Error(`HTTP error! status: ${rightResponse.status}`);
                }
                const rightArrayBuffer = await rightResponse.arrayBuffer();
                const rightLogoBuffer = Buffer.from(rightArrayBuffer);
                
                const currentDate = new Date();
                const monthNames = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                const month = monthNames[currentDate.getMonth()]; // Get month name
                const day = String(currentDate.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
                const year = currentDate.getFullYear();
                const formattedDate = `${month} ${day},${year}`;

                const pageWidth = this.doc.page.width;
                const logoWidth = 80;
                const logoHeight = 80;
                const logoMargin = 30;  
    
                this.doc
                    .image(leftLogoBuffer, logoMargin, logoMargin, { width: logoWidth, height: logoHeight });
                this.doc
                    .image(rightLogoBuffer, pageWidth - logoMargin - logoWidth, logoMargin, { width: logoWidth, height: logoHeight });
                this.doc
                    .fontSize(19)
                    .moveUp(0.8)
                    .font('Helvetica-Bold')
                    .text('BUKIDNON STATE UNIVERSITY', { align: 'center' })
                    .fontSize(10)
                    .font('Helvetica')
                    .text('Malaybalay City, Bukidnon 8700, Tel (088) 813-5661 to 5663', { align: 'center' })
                    .text('TeleFax (088) 813-2717, www.buksu.edu.ph', { align: 'center' })
                    .moveDown(1.6)
                    .fontSize(11)
                    .font('Helvetica-Bold')
                    .text('GSU - TRANSPORTATION SERVICE (MOTORPOOL SECTION)', { align: 'center' })
                    .fontSize(9)
                    .moveDown(0.9)
                    .font('Helvetica')
                    .text(`Date: ${formattedDate}`, { align: 'right' });
                return this;
            } catch (error) {
                throw new Error(`Failed to add header: ${error.message}`);
            }
        }

        drawFooter() {
            const startX = 25;  // Same as table's startX
            const pageHeight = this.doc.page.height;
            const footerHeight = 20; // Adjust this value based on your footer content height
            const footerY = pageHeight - footerHeight - 20; // 10 is the margin from the bottom

            this.doc
                .fontSize(8)
                .font('Helvetica')
                .text(
                    'Document code: TS-F 002               Revision No. 0              Issue No. 001              Issue Date: May 15,2017 ' ,
                    startX,  
                    footerY, { 
                        align: 'center',
                        width: this.doc.page.width - 100  
                    }
                );
        }

        getDynamicHeight(text, width, fontSize) {
            const lineHeight = fontSize * 1.2; 
            const textWidth = this.doc.widthOfString(text, { fontSize }); // Calculate text width
            const lines = Math.ceil(textWidth / width); // Determine number of lines needed
            return lineHeight * lines + 4; // Add padding
        }

        checkPageOverflow() {
            const footerHeight = 20; // Adjust this value based on your footer content height
            const nextRowHeight = 25; // Height of the next row to be added
            // Check if there is enough space for the next row and the footer
            if (this.startY + nextRowHeight + footerHeight > this.doc.page.height) {
                this.doc.addPage(); // Add a new page
                this.startY = 40; // Reset startY for the new page
            }
        }

        addDttTable(driver_name, plate_number, vehicle_name, authorized_passenger, place_to_visit, travel_chargable,
            date_tobe_use, type_of_travel, time_of_departure, time_of_arrival,
            post_date_time_of_departure, post_arival_time, prepared_by, issued_date, purpose_of_travel
        ) {
            const startX = 20;
            this.startY = 160; // Use this.startY instead of local startY
            const colWidths = [270, 300];
            const initialRowHeight = 25;

            // Title Row
            const totalWidth = colWidths.reduce((acc, width) => acc + width, 0);
            this.drawCell(startX, this.startY, totalWidth, initialRowHeight, 'DRIVER`S TRIP TICKETS # A0R 157-11-006', { align: 'center', fontSize: 11, font: 'Helvetica-Bold' });
            this.startY += initialRowHeight;
            this.checkPageOverflow(); // Check for overflow after the title

            // Driver Name
            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, `1. Name of the driver:`);
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `                     ${driver_name}`);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            // Vehicle Information
            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, `2. Vehicle to be used:`);
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `                     ${vehicle_name} ${plate_number}`);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            // Authorized Passengers
            const passengerRowHeight = this.getDynamicHeight(authorized_passenger, colWidths[1], 12); // Calculate dynamic height
            this.drawCell(startX, this.startY, colWidths[0], passengerRowHeight, '3. Authorized passengers:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], passengerRowHeight, `        ${authorized_passenger}`);
            this.startY += passengerRowHeight;
            this.checkPageOverflow();

            // Place to Visit
            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '4. Place to be visited/inspected:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `                     ${place_to_visit}`);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            // Purpose of Travel
            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '5. Purpose:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `                     ${purpose_of_travel}`);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            // Travel Chargable
            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '6. Travel chargable to:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `                     ${travel_chargable}`);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            // Date to be Used
            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '7. Date to be used:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `                     ${date_tobe_use}`);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            // Type of Travel
            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '8. Type of Travel:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `                     ${type_of_travel}`);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            // Remarks Section
            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '9. Remarks:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, ``);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            // To be filled by the driver
            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, 'To be filled by the driver:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, ``);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            // Departure and Arrival Times
            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '1. Time of departure from official station:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ AM/PM`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '2. Time of arrival as (per line #4) Above:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ AM/PM`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '3. Date and Time of departure from (per line #4) Above:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ AM/PM`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '4. Time arrival back to official station:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ AM/PM`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '5. Approximate distance traveled to and from:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ KMs`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '6. Gasoline, purchased and used: ');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, ``);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '              a. Balance in tank');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ Liters`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '              b. Issued by office from stock');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ Liters`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '              c. Add purchased during trip:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ Liters`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '              d. Deduct used during trip');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ Liters`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '              e. balance in the tank at the end of the trip');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ Liters`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '7. Gear oil issued');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ Liters`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '8. Lubricating oil issued');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ Liters`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '9. Grease issued');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ Liters`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '10. Speedometer reading if any:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, ``);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '             At the end of the trip');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ KMs`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '             At the beginning of the trip');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ KMs`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '             Total distance traveled');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ KMs`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '11. Remarks ____________________________________________');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `       ___________ KMs`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, 'I hereby certify to the correctness of the above statement of record of travel.');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, ``);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `${driver_name}`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, 'I hereby certify that I used this vehicle on official businesss');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `DRIVER`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `Signature of the Passenger`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, '');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, `Official Designation`, { align: 'center' });
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, 'Prepared by:');
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, ``);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, `${prepared_by}`, { align: 'center' });
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, ``);
            this.startY += initialRowHeight;
            this.checkPageOverflow();
            
            this.drawCell(startX, this.startY, colWidths[0], initialRowHeight, `Administrative Assistant ||`, { align: 'center' });
            this.drawCell(startX + colWidths[0], this.startY, colWidths[1], initialRowHeight, ``);
            this.startY += initialRowHeight;
            this.checkPageOverflow();

            // Draw the footer only after all content is added
            this.drawFooter();

            return this;
        }
        drawCell(x, y, width, height, text, options = {}) {
            const { align = 'left', fontSize = 10, font = 'Helvetica' ,leftMargin = 60} = options;

            this.doc.fontSize(fontSize).font(font);

            // Calculate the height of the text
            const textHeight = fontSize * 1.2; // Adjust line height as needed

            // Calculate the vertical position to center the text
            const verticalCenterY = y + (height - textHeight) / 2;

            let horizontalX = x + leftMargin; // Default to the provided x
            if (align === 'center') {
                horizontalX = (this.doc.page.width - width) / 2; // Center horizontally
            } else if (align === 'right') {
                horizontalX = this.doc.page.width - width - 50; // Adjust for right alignment (50 is an example margin)
            }
            
            // Draw the text at the calculated position
            this.doc.text(text, x, verticalCenterY, {
                width: width,
                align: align,
                height: height,
                ellipsis: false, // Set to false to allow wrapping
                lineBreak: true // Ensure line breaks are respected
            });

            // Draw the cell border (optional)

        }
    }







const generatePdf = async (req,res) =>{
    const {requestId} = req.body;
    console.log('Dtt reached')
        try{
                const findData  = await admin_request_model.findOne({reference_id: requestId})
                console.log('The reference id is ',requestId)
                if(!findData) {
                    return res.status(404).json({message: 'Cannot find driver trip ticker'})
                }
                const findRequest = await request_model.findOne({_id: requestId})
                if(!findRequest){
                    return res.status(404).json({message: 'Cannot find request from data that belong to the user'})
                }
                const driver_name = findData.driver_name
                const vehicle_name = findData.assigned_vehicle
                const plate_number = findData.plate_number
                const travel_chargable = findData.travel_expense
                const date_tobe_use = findData.date_of_travel
                const type_of_travel = findData.travel_type
                const time_of_departure = findData.pre_departure_time
                const time_of_arrival = findData.pre_arrival_time
                const post_date_time_of_departure = findData.post_departure_date_time
                const post_arival_time = findData.post_arrival_time
                const prepared_by = findData.verified_by
                const issued_date = findData.verified_date
                const authorized_passenger = findRequest.travel_details.passenger_names.join(', ');
                const place_to_visit = findRequest.travel_details.destination
                const purpose_of_travel = findRequest.travel_purpose

              
                const pdf = new createDTT();
                await pdf.addHeader(buksuLogo, innovateLogo);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=Approved_dtt.pdf');
                pdf.doc.pipe(res);
                pdf.addDttTable(driver_name, plate_number, vehicle_name, authorized_passenger,place_to_visit,travel_chargable,
                    date_tobe_use,type_of_travel,time_of_departure,time_of_arrival,
                    post_date_time_of_departure,post_arival_time,prepared_by,issued_date,purpose_of_travel);
                pdf.drawFooter();
                pdf.doc.end();
                console.log('Successful generating pdf');
               

        }catch(error){
            console.error('Error generating PDF:', error);
            return res.status(500).json({message: 'Something went wrong in the backend',error})
        }
}


module.exports = {generatePdf}


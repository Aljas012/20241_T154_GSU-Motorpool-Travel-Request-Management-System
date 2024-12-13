const PDFDocument = require('pdfkit');
const innovateLogo = 'https://res.cloudinary.com/dvhfgstud/image/upload/v1733239402/467198922_588876523648635_1569889043517254517_n_nnoyav.jpg'
const buksuLogo = 'https://res.cloudinary.com/dvhfgstud/image/upload/v1733117339/buksu-logo-min-1024x1024_ye6b58.png';
class InspectionPDF {
    constructor() {
        
        this.doc = new PDFDocument({
            size: 'A4',
            margin: 50
        });
    }

    drawCell(x, y, width, height, text = '', options = {}) {
        const {
            align = 'left',
            fontSize = 10,
            font = 'Helvetica',
            padding = 5
        } = options;

        this.doc
            .rect(x, y, width, height)
            .stroke();

        if (text) {
            this.doc
                .font(font)
                .fontSize(fontSize)
                .text(text, 
                    x + padding, 
                    y + padding, 
                    {
                        width: width - (padding * 2),
                        align: align,
                        lineGap: 2,
                    },
                    
                );
        }
    }


    drawBelowCell(x, y, width, height, texts = [], options = {}) {
        const {
            align = 'left',
            fontSize = 10,
            font = 'Helvetica',
            padding = 2,
            paddingLeft = 10
        } = options;
     
        this.doc.rect(x, y, width, height).stroke();
        const columnWidth = width / 2;
        this.doc
            .moveTo(x + columnWidth, y)
            .lineTo(x + columnWidth, y + height)
            .stroke();
    
        const verticalCenter = y + (height / 2) - (fontSize / 2);

        if (texts[0]) {
            this.doc
                .font(font)
                .fontSize(fontSize)
                .text(texts[0], 
                    x + paddingLeft, 
                    verticalCenter, 
                    {
                        width: columnWidth - (paddingLeft + padding),
                        align: align,
                        lineGap: 2
                    }); 
        }
        
        if (texts[1]) {
            this.doc
                .font(font)
                .fontSize(fontSize)
                .text(texts[1], 
                    x + columnWidth + paddingLeft, 
                    verticalCenter, 
                    {
                        width: columnWidth - (paddingLeft + padding),
                        align: align,
                        lineGap: 2
                    }); 
        }
    }
  
    drawSplitCell(x, y, width, height, texts = [], options = {}) {
        const halfHeight = height / 2;
        
        this.doc.rect(x, y, width, height).stroke();
        
        if (texts[0]) {
            this.drawCell(x, y, width, halfHeight, texts[0], {
                ...options,
                align: 'center'
            });
        }
        

        if (texts[1] && texts[2]) {
            const halfWidth = width / 2;
            this.drawCell(x, y + halfHeight, halfWidth, halfHeight, texts[1], {
                ...options,
                align: 'center'
            });
            this.drawCell(x + halfWidth, y + halfHeight, halfWidth, halfHeight, texts[2], {
                ...options,
                align: 'center'
            });
        }
    }

 
    drawSplitCellTwo(x, y, width, height, texts = [], options = {}) {
        const halfHeight = height / 2;
        const {
            topAlign = 'left',    
            bottomAlign = 'left',
            padding = 5
        } = options;


        this.doc.rect(x, y, width, height).stroke();
        
        if (texts[0]) {
            this.drawCell(x, y, width, halfHeight, texts[0], {
                ...options,
                align: topAlign,
                padding: padding
            });
        }

        if (texts[1]) {
            this.drawCell(x, y + halfHeight, width, halfHeight, texts[1], {
                ...options,
                align: bottomAlign,
                padding: padding
            });
        }
    }



    drawSplitColumnTwo(x, y, width, height, texts = [], options = {}) {
        const halfWidth = width / 2;  
        const { leftAlign = 'left',  rightAlign = 'left',   fontSize = 10, padding = 5} = options;
        this.doc.rect(x, y, width, height).stroke();
        
        if (texts[0]) {
            this.drawCell(x, y, halfWidth, height, texts[0], {  
                ...options, align: leftAlign, padding: padding });
        }
    
        if (texts[1]) {
            this.drawCell(x + halfWidth, y, halfWidth, height, texts[1], { 
                ...options, align: rightAlign,padding: padding });
        }
    }

    footer() {
        const startX = 25;  // Same as table's startX
        const pageHeight = this.doc.page.height;
        
        this.doc
            .fontSize(8)
            .font('Helvetica')
            .text(
                'Document code: MPS-F-001               Revision No. 02              Issue No. 01              Issue Date: July 19, 2023              Page 1 of 1',
                startX,  
                pageHeight - 60,  
                { 
                    align: 'center',
                    width: this.doc.page.width - (startX * 2)  // Adjust text width
                }
            );
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
                .fontSize(12)
                .font('Helvetica-Bold')
                .text('PPMU-MOTORPOOL SECTION', { align: 'center' })
                .fontSize(9)
                .moveDown(0.8)
                .font('Helvetica')
                .text('CONTROL NO. A0R 157-11-006', { align: 'right' });
            return this;
        } catch (error) {
            throw new Error(`Failed to add header: ${error.message}`);
        }
    }

    addInspectionTable(data) {
        const startX = 20;
        let startY = 130;
        const colWidths = [210, 170, 180];
        const initialRowHeight = 30;
        const adjustedRowHeight = 17; 
        this.drawCell(startX, startY, sum(colWidths), initialRowHeight,  'PRE & POST-TRIP INSPECTION CHECKLIST', { align: 'center', fontSize: 11, font: 'Helvetica-Bold' } );
        startY += initialRowHeight;
        this.drawCell(startX, startY, colWidths[0], initialRowHeight,`Inspected by: ${data.verified_by || ''}` );
        this.drawCell(startX + colWidths[0], startY, colWidths[1], initialRowHeight, `Date: ${formatDate(data.inspectionDate)}`);
        this.drawSplitCellTwo(startX + colWidths[0] + colWidths[1], startY, colWidths[2], initialRowHeight, [`Time of Inspection: ${data.inspectionTime}`, `Current mileage: ${data.mileAge}`] );
        startY += initialRowHeight;
        this.drawCell(startX, startY, colWidths[0], initialRowHeight,`Driver: ${data.driverName || ''}\nVehicle: ${data.vehicle || ''}`);
        this.drawCell(startX + colWidths[0], startY, colWidths[1], initialRowHeight,`Bound To: ${data.boundTo || ''}`);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], initialRowHeight,`Date of Travel: ${formatDate(data.dateOfTravel)}`);
        startY += initialRowHeight;
        this.drawCell(startX, startY, colWidths[0], initialRowHeight, 'THINGS TO CHECK');
        this.drawSplitCell(startX + colWidths[0], startY, colWidths[1], initialRowHeight, ['SATISFACTORY', 'Yes', 'No']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], initialRowHeight, 'Comments');
        startY += initialRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `Documents`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight,[' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `1. Duly signed Trip Ticket`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `2. Driver's License`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `3. Photocopy of Vehicle OR/CR`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `Vehicle Items`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `4. Brake`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `5. Head Light`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `6. Tail and Signal Light`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `7. Brake Light`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `8. Horn`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `9. Fluid Level (Oil,Water, Transmission fluid)`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `10. Windshield including wiper`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `11. Side Mirrors`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `12. Drum bolts`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `13. Tire thickness`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `14. Spare Tire`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `15. Seats (Safety belt)`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `16. Tools (jack, wrench, screwdriver, pliers)`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `Emergency Equipment`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `17. Fire Extinguisher`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `18. First Aid Kit`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `19. Reflectorized Vests`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `20. Early warning device`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `Cleanliness`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `21. Have a place for Stuff`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `22. Clean it on Schedule`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += adjustedRowHeight;
        this.drawCell(startX, startY, colWidths[0], adjustedRowHeight, `23. Wash the outside`);
        this.drawSplitColumnTwo(startX + colWidths[0], startY, colWidths[1], adjustedRowHeight, [' ', '']);
        this.drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], adjustedRowHeight, '');
        startY += 15;
        startY += adjustedRowHeight;
        this.drawBelowCell(startX, startY, sum(colWidths), adjustedRowHeight, [`Evaluated by: ${data.verified_by}`, `Verified by: ${data.verified_by}`],  { align: 'left' });
        startY += adjustedRowHeight;
        this.drawBelowCell(startX, startY, sum(colWidths), adjustedRowHeight, [`Comments: `, `Comments: `],  { align: 'left' });
        startY += adjustedRowHeight;
        this.drawBelowCell(startX, startY, sum(colWidths), adjustedRowHeight, [`Date/Signature ${formatDate(data.inspectionDate)}`, `Date/Signature ${formatDate(data.inspectionDate)}`],  { align: 'left' });
        return this;
    }
}


const sum = arr => arr.reduce((a, b) => a + b, 0);
const formatDate = (date) => {
    if (!date) return '';

    if (typeof date === 'string') {
        return date;
    }
      // If date is an object with month, day, year properties
    if (date.month && date.day && date.year) {
        return `${date.month} ${date.day}, ${date.year}`;
    }
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

async function generatePostInspectionPdf(req, res) {
    try {
        const pdf = new InspectionPDF();
        await pdf.addHeader(buksuLogo, innovateLogo);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=post_inspection_report.pdf');
        pdf.doc.pipe(res);
        pdf.addInspectionTable(req.body);
        pdf.footer();
        pdf.doc.end();
    } catch (error) {
        console.error('PDF Generation Error:', error);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: 'Error generating PDF',
                error: error.message
            });
        }}}

module.exports = {
    generatePostInspectionPdf
};
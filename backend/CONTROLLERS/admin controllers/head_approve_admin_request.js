const approved_events_data = require ('../../MODELS/approved_events_model');
const admin_request_data = require('../../MODELS/admin_request_model');
const request_data = require ('../../MODELS/request_form_model');
const user_data = require('../../MODELS/user_model')
const {approvedAdminRTT} = require('../../MIDDLEWARES/email messages');
const nodemailer = require('nodemailer');
require('dotenv').config();

const gsu_email = process.env.EMAIL_NODE;
const gsu_password =process.env.PASSWORD_NODE;


        async function createEvent(request_date, reference_id, departure_time) {
            try {
                console.log(reference_id, request_date, departure_time);
                console.log('approved_events_data:', approved_events_data); 

                if (typeof approved_events_data.create !== 'function') {
                    throw new TypeError('approved_events_data.create is not a function. Check if the model is properly defined.');
                }

                const creatingEvent = await approved_events_data.create({
                    reference_id: reference_id,
                    event_name: "APPROVED GSU MOTORPOOL TRAVEL REQUEST",
                    event_date: request_date,
                    event_time: departure_time,
                    event_details: "NOTE: Please be on time during the assigned date",
                });

                if (!creatingEvent) {
                    console.error('Error creating event: ', error);
                }
                console.log('successful creating events')
                return creatingEvent;
            } catch (error) {
                console.error('Error in creating events: ', error);
                throw new Error(`Event creation failed for reference ID: ${reference_id}`);
            }
        }

        async function updateRequestStatus(userId) {   
            try {
                const updateStatus = await admin_request_data.findOneAndUpdate(
                    { reference_id: userId },
                    { $set: { status: "Approved", updatedAt: new Date() } }
                );

                if (!updateStatus) {
                    console.error('Failed to update status for userId:', userId);
                    throw new Error('Update request status failed');
                }
                console.log('successful updating request status')
                return updateStatus;
            } catch (error) {
                console.error('Error updating admin request status:', error);
                throw error;
            }
        }


        async function sendEmail (user_email,requestor_name,request_date,departure_time,passenger_names)
                       {
                        const emailTemplate = approvedAdminRTT(requestor_name,request_date,departure_time,passenger_names);

                         const transporter = nodemailer.createTransport({ 
                               host: 'smtp.gmail.com',  port: 465, secure: true,
                               auth: {  user: gsu_email, pass: gsu_password,},}
                                );

                         const mailOptions = {
                               from: process.env.GSU_EMAIL,
                               to: user_email, subject: 'Approved Travel Request',
                               html: emailTemplate,
                               };

                               try{
                                         await transporter.sendMail(mailOptions);
                                         console.log('successful sending email to ', user_email)
                               }catch(error)
                                    {
                                        console.error('Error sending email:', error);
                                        throw error;
                               }
                }   


const approvedRequestData = async (req, res) => {
    try {
        const { requestId } = req.body;
        console.log('Id received ', requestId);

        const requestData = await request_data.findOne({ _id: requestId });
        if (!requestData) {
            return res.status(404).json({ message: `Request with ID ${requestId} not found` });
        }
        const request_date = requestData.travel_details.date_travel;
        const reference_id = requestData.reference_id;
        const departure_time = requestData.travel_details.departure_time;
        const requestor_name = requestData.requestor_name;
        const passenger_names = requestData.travel_details.passenger_names;

        const findUser = await user_data.findOne({_id:reference_id})
        if(!findUser)
              {
                return res.status(404).json({ message: `Cannot find user ${reference_id}` });
        }
        const user_email = findUser.email;

        const newEvent = await createEvent(request_date, reference_id, departure_time);
        await updateRequestStatus(requestId); 
        await sendEmail(user_email,requestor_name,request_date,departure_time,passenger_names)
        
        return res.status(200).json({ message: 'Request approved successfully', event: newEvent });
    } catch (error) {
        console.error('Error in approving request:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            error: error.message 
        });
    }
};

module.exports = { approvedRequestData };

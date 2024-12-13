const user_data = require('../../MODELS/user_model')
const travel_request_data = require("../../MODELS/request_form_model");

const requestToTravelForm = async (req,res) =>
{
    console.log('data received already in the backend!')
        const  {userId,organization_name, requestor_name, contact_number, request_date,request_time, passenger_names,
            date_travel,destination, departure_time,return_date ,return_arrival_time,travel_purpose,return_departure_arrival_time,imageUrl} = req.body
           console.log(userId)
        try{
            const user = await user_data.findOne({_id: userId});
            if(!user)
               {
                console.log('user not found!')
                 return res.status(404).json({ error: "User not found." });
            }
                console.log('user is valid and can be found in the database!')

                const name = requestor_name.toUpperCase();
                const collegeName = user?.college_name || 'Default College Name';
                const officeCode = user?.office_code || 'Default Office Code';
                const chairPersonName = user.authority_to_travel.length > 0 
                    ? user.authority_to_travel[0]?.chair_person_name 
                    : 'Default Chair Person';
            

                    const travelRequestForm = await travel_request_data.create({
                        status: "Submitted",
                        reference_id: userId,   
                        collegeName: collegeName,
                        officeCode: officeCode,
                        organization_name: organization_name,
                        requestor_name: requestor_name,
                        contact_number: contact_number,
                        request_date: request_date,
                        request_time: request_time,
                        travel_details: {
                            passenger_names: passenger_names,
                            date_travel: date_travel,
                            chair_person_name: chairPersonName,
                            destination: destination,
                            departure_time: departure_time,
                            arrival_time: return_departure_arrival_time,
                            return_date: return_date,
                            return_arrival_time: return_arrival_time
                        },
                        travel_purpose: travel_purpose,
                        imgUrl: {
                            file_name: imageUrl
                        }
                    });

         console.log('Travel Request Form saved successfully:', travelRequestForm);
         return  res.status(200).json(travelRequestForm);
        }catch(error)
                    {
                        console.log(error)
                      return  res.status(500).json('unable to run the try statement!')
                }

}

module.exports = {requestToTravelForm}
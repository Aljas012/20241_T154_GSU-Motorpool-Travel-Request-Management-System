const user_data = require('../../MODELS/user_model')
const travel_request_data = require("../../MODELS/request_form_model");

const requestToTravelForm = async (req,res) =>
{
    console.log('data received already in the backend!')
        const  {userId,organization_name, requestor_name, contact_number, request_date,request_time, passenger_names,
            date_travel,destination, departure_time,return_date ,return_arrival_time,travel_purpose,return_departure_arrival_time,imageUrl} = req.body
           
        try{
            const user = await user_data.findById(userId);
            



            if(!user)
               {
                console.log('user not found!')
                 return res.status(404).json({ error: "User not found." });
            }
                console.log('user is valid and can be founud in the database!')
                const name = requestor_name.toUpperCase()
             const travelRequestForm = await travel_request_data.create({
                status: "Pending",
                reference_id:userId,
                collegeName: user.college_name,
                officeCode: user.office_code,
                organization_name:organization_name,
                 requestor_name: name,
                 contact_number: contact_number,
                request_date: request_date,
                request_time: request_time,
                 travel_details: {
                     passenger_names: passenger_names,
                     date_travel: date_travel,
                     destination:destination,
                     departure_time: departure_time,
                    arrival_time: return_departure_arrival_time,
                     return_date: return_date,
                     return_arrival_time: return_arrival_time
                 },
                 travel_purpose:travel_purpose
                 ,
            imgUrl: {
                    file_name: imageUrl
                 }
                 }
                )

            res.status(200).json(travelRequestForm);
        }catch(error)
                    {
                        res.status(500).json('unable to run the try statement!')
                }

}

module.exports = {requestToTravelForm}
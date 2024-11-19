const Schema = mongoose.Schema;

const requestToTravelForm = async (req,res) =>
{

        const  {userId,organization_name, requestor_name, contact_number, request_date,request_time, passenger_names,
            date_travel,destination, departure_time,return_date ,return_arrival_time,travel_purpose,return_departure_arrival_time,imageUrl} = req.body

        try{
            const user = await user_data.findById(userId);

            if(!user)
               {
                console.log('user not found!')
                 return res.status(404).json({ error: "User not found." });
            }

            const travelRequestForm = await travel_request_data.create({
                organization_name:organization_name,
                requestor_name: requestor_name,
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
                    file_name: { type: String, required: true },
                    file_size: { type: Number, required: true },
                    file_url: { type: String, required: true }
                }
                }
               )

            res.status(200).json(travelRequestForm);
        }catch(error)
                    {
                        res.status(500).json('unable to run the try statement!')
                }

}
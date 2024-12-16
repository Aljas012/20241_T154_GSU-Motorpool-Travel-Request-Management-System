const user_data = require("../../MODELS/user_model");

const updateProfile = async (req, res) => {
    const { inputName, inputOffice, newCode,userId,inputEmail } = req.body;
    console.log('The id is ',userId);
    try {
      const user = await user_data.findByIdAndUpdate(
        userId,
        {
          name: inputName,
          college_name: inputOffice,
          office_code: newCode
        },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({success: false,message: "User not found."});
      }
      console.log('successfully updated');
      return res.status(200).json({success: true,message: "User information updated successfully!",user: { name: user.name,college_name: user.college_name,office_code: user.office_code }
      });
    } catch (error) {
      console.error("Error updating user:", error);
          return res.status(500).json({ success: false, message: "An error occurred while updating user information.", error: error.message  });
    }
  };
  
  module.exports = {updateProfile};

const User = require("../models/userModel");
const Admin = require("../models/adminModel");




function roleChecker(requiredRole) {
    return async (req, res, next) => {
        try {
            if (requiredRole === "Admin") { //i check if the role is admin
                console.log("admin");
            }
            else {  //automatically login as user
                console.log("user");
            }
        } catch (error) {

        }
    }


}
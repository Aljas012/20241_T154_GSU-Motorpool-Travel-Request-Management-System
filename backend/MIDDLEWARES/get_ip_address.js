const ipinfo = require('ipinfo');

// Function to get the IP address
const getIpAddress = (req, res, next) => {
  try {
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const formattedIp = ip === "::1" ? "127.0.0.1" : ip;
    
    // Pass the IP address to the next function (currentLocation)
    req.ipAddress = formattedIp; // Storing the IP address in the request object
    
    // Continue to the next function (currentLocation)
    next();
  } catch (error) {
    res.status(500).send("Error fetching IP address");
  }
};

// Function to fetch the current location based on IP address
const currentLocation = (req, res) => {
  const ip = req.ipAddress; // Get the IP address from the request object

  ipinfo(ip, (err, response) => {
    if (err) {
      return res.status(500).send("Error fetching location information.");
    }

    console.log("IP Info Response:", response);

    // Check if 'loc' exists in the response
    if (!response || !response.loc) {
      return res.status(500).send("Location information not available.");
    }


    // Split the 'loc' field into latitude and longitude
    const [latitude, longitude] = response.loc.split(',');

    // Send back only latitude and longitude
    console.log('latitude is ',latitude )
    console.log('longitude is ',longitude )
    res.json({
      latitude: parseFloat(latitude),  // Convert latitude to float
      longitude: parseFloat(longitude), // Convert longitude to float
    });
  }); // <- This is where the closing parenthesis should be

}

// Export both functions
module.exports = { getIpAddress, currentLocation };

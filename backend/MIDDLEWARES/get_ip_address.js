const ipinfo = require('ipinfo');

const getIpAddress = (req, res, next) => {
  try {
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const formattedIp = ip === "::1" ? "127.0.0.1" : ip;
    
    req.ipAddress = formattedIp;

    next();
  } catch (error) {
    res.status(500).send("Error fetching IP address");
  }
};

const currentLocation = (req, res) => {
  const ip = req.ipAddress; 

  ipinfo(ip, (err, response) => {
    if (err) {
      return res.status(500).send("Error fetching location information.");
    }

    console.log("IP Info Response:", response);

    if (!response || !response.loc) {
      return res.status(500).send("Location information not available.");
    }
    const [latitude, longitude] = response.loc.split(',');
    res.json({
      latitude: parseFloat(latitude),  
      longitude: parseFloat(longitude), 
    });
  }); 

}

module.exports = { getIpAddress, currentLocation };

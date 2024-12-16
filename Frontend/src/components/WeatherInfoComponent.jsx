import { data } from 'framer-motion/client';
import React, { useState,useEffect } from 'react';

const WeatherInfo = ({ city, temperature, description, humidity, windSpeed }) => {
  const [image,setImage] = useState()
  useEffect(() => {
    let weatherIcon = '';
    
    switch (description?.toUpperCase?.()) {
      case 'CLEAR SKY':
        weatherIcon = "https://res.cloudinary.com/dvhfgstud/image/upload/v1734151317/cloudy_2_g2gy9c.png";
        break;
      case 'FEW CLOUDS':
        weatherIcon = "https://res.cloudinary.com/dvhfgstud/image/upload/v1734150763/cloudy_qsjzaq.png";
        break;
      case 'SCATTERED CLOUDS':
        weatherIcon = "https://res.cloudinary.com/dvhfgstud/image/upload/v1734150762/clear-sky_ypecgj.png";
        break;
      case 'SHOWER RAIN':
        weatherIcon = "https://res.cloudinary.com/dvhfgstud/image/upload/v1734150946/rainy-day_km9l1f.png";
        break;
      default:
        weatherIcon = 'https://res.cloudinary.com/dvhfgstud/image/upload/v1734151317/cloudy_2_g2gy9c.png'; 
        break;
    }
    setImage(weatherIcon);
  }, [description]);



  return (
    <div>
      <h6 style={{ fontFamily: "Helvetica", marginTop: "1rem" }}>
        Results for{" "}
        <span style={{ fontWeight: "700" }}>
          {city}
        </span>
      </h6>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      > 
    {image && (
          <img src={image} alt="weatherIcon" style={{ width: "55px", height: "auto" }} />
        )}
        
    
        <h6
          style={{
            fontFamily: "Helvetica",
            fontWeight: "500",
            marginLeft: "0.8rem",
            marginTop: "5px",
            fontSize: "50px",
          }}
        >
          {temperature}
        </h6>

        <div style={{ marginBottom: "1.1rem" }}>
          <span
            style={{
              fontFamily: "Helvetica",
              fontWeight: "400",
              marginLeft: "0.8rem",
              fontSize: "16px",
            }}
          >
            °C
          </span>
        
        </div>

        <div style={{ marginLeft: "1rem" }}>
          <p
            style={{
              fontFamily: "Helvetica",
              margin: "0",
              padding: "0",
              lineHeight: "1.2",
              fontSize: "14px",
            }}
          >
            Description: {description}
          </p>
          <p
            style={{
              fontFamily: "Helvetica",
              margin: "0",
              padding: "0",
              lineHeight: "1.2",
              fontSize: "14px",
            }}
          >
            Humidity: {humidity} %
          </p>
          <p
            style={{
              fontFamily: "Helvetica",
              margin: "0",
              padding: "0",
              lineHeight: "1.2",
              fontSize: "14px",
            }}
          >
            Wind: {windSpeed} 
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;

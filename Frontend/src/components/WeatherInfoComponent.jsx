import React from 'react';

const WeatherInfo = ({ city, temperature, precipitation, humidity, windSpeed }) => {
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
        <img
          src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732112644/GSU/i21lpp2sussdyequ0gob.svg"
          alt="weatherIcon"
          style={{ width: "55px", height: "auto" }}
        />

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

        <div style={{ marginBottom: "1.2rem" }}>
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
          <span
            style={{
              fontFamily: "Helvetica",
              fontWeight: "400",
              marginLeft: "2px",
              fontSize: "16px",
            }}
          >
            |°F
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
            Precipitation: {precipitation}%
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
            Humidity: {humidity}%
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
            Wind: {windSpeed} km/h
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;

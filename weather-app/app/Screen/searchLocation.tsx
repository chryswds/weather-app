import React from "react";

 const APIUrl = `http://api.openweathermap.org/geo/1.0/direct?`;

 const location = "dublin"
 const limit = 1
const APIKey = `127ec3a0b8768a330c3b0f8c3ef48420`;


export const searchLocation = async () => {

    const results = await fetch(
    `${APIUrl}q=${location}&limit=${limit}&appid=${APIKey}`
);
const data = await results.json();

const lat = data.lat;
const lon = data.lon;

}


const fetch = require("node-fetch");

exports.handler = async (event) => {
  const API_ENPOINT = "https://www.metaweather.com/api";
  try {
    const latitude = event.queryStringParameters.latitude;
    const longitude = event.queryStringParameters.longitude;

    const response = await fetch(
      `${API_ENPOINT}/location/search/?lattlong=${latitude},${longitude}`
    );
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
};

const request = require("request");
const geoLocRequest = require("../../weather-app/services/geoLoc");
const weatherRequest = require("../../weather-app/services/weather");

const forecast = (address, res, callback) => {
	geoLocRequest(address, (error, { latitude, longitude } = {}) => {
		if (error) return res.send({ error });

		weatherRequest(latitude, longitude, address, (error, data) => {
			if (error) return res.send({ error });
			callback(data);
		});
	});
};

module.exports = forecast;

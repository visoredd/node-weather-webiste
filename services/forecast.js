const request = require("request");
const geoLocRequest = require("./geoLoc");
const weatherRequest = require("./weather");

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

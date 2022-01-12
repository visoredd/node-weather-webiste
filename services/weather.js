const baseModule = require("hbs");
const request = require("request");

const weatherRequest = (lat, long, address, callback) => {
	const url =
		"http://api.weatherstack.com/current?access_key=c8c03b378ffe69cf754d2efb846ac60d&query=" +
		`${lat},${long}`;

	request({ url, json: true }, (err, { body } = {}) => {
		if (err) {
			callback("Unable to connect to Weather services", undefined);
		} else if (body.error) {
			callback(body.error.info, undefined);
		} else {
			callback(
				undefined,
				body.current.weather_descriptions[0] +
					". It is currently " +
					body.current.temperature +
					" degrees out. It feels like " +
					body.current.feelslike +
					" degrees out. The humidity is " +
					body.current.humidity
			);
		}
	});
};

module.exports = weatherRequest;

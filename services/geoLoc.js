const request = require("request");

const geoLocRequest = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?access_token=pk.eyJ1Ijoidmlzb3JlZGQiLCJhIjoiY2t5OGZjandyMHpudTJvcGZrbDJkcXFobiJ9.E9w8KnT3t00rihnaAgfQAg&limit=1";

	request({ url, json: true }, (err, { body } = {}) => {
		if (err) {
			callback("Unable to connect to Weather services", undefined);
		} else if (body.message) {
			callback(body.message, undefined);
		} else if (body.features.length == 0) {
			callback("Unable to find specified location", undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitute: body.features[0].center[0],
			});
		}
	});
};

module.exports = geoLocRequest;

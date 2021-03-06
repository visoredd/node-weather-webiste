const express = require("express");
const forecast = require("../services/forecast");
const hbs = require("hbs");
const path = require("path");
const { hasSubscribers } = require("diagnostics_channel");

const app = express();

app.set("view engine", "hbs");

const port = process.env.PORT || 3000;

const htmlDir = path.join(__dirname, "../public");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.use(express.static(htmlDir));

app.get("", (req, res) => {
	if (!req.query.search) {
		return res.render("index", {
			title: "Weather app",
			name: "Aayush",
			para: "Use this site to get Weather!",
			msg: "",
		});
	}
	forecast(req.query.search, res, (data) => {
		res.render("index", {
			title: "Weather app",
			name: "Aayush",
			para: "Use this site to get Weather!",
			msg: data,
		});
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "Please use search query",
		});
	}
	forecast(req.query.search, res, (data) => {
		res.send({
			msg: data,
		});
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		name: "Aayush",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		name: "Aayush",
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404 Page",
		name: "Aayush",
		errorMessage: "Help page not found",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404 Page",
		name: "Aayush",
		errorMessage: "Page not found",
	});
});

app.listen(port, () => {
	console.log("Server is on port : " + port);
});

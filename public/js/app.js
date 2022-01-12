console.log("Client side");

fetch("http://puzzle.mead.io/puzzle").then((res) => {
	res.json().then((data) => {
		console.log(data);
	});
});

const weatherForm = document.querySelector("form");
let location1 = document.querySelector("input");
let message = document.querySelector("#msg");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	message.textContent = "...Loading";
	const search = location1.value;
	fetch("/weather?search=" + search).then((res) => {
		res.json().then((data) => {
			if (data.error) {
				message.textContent = data.error;
			} else {
				message.textContent = data.msg;
			}
		});
	});
});

var hitcount;
var user;
var choice;
var http = new XMLHttpRequest();
var url = "data.json";
console.log(url)
http.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		var myArr = JSON.parse(this.responseText);
		post(myArr);
	}
};
http.open("GET", url, true);
http.send();

function post(array) {
	if (localStorage.getItem("options") != null) {
		choice = JSON.parse(localStorage.getItem("options"));
		var name = JSON.parse(localStorage.getItem("name"));
		var hits = JSON.parse(localStorage.getItem("hits"))
		for (i = 0; i < name.length; i++) {
			if (name[i] == localStorage.getItem("temp")) {
				hitcount = parseInt(hits[i]);
				user = name[i];
			}
			console.log(hitcount);
			console.log(user);
		};
	}
	else if (GetCookie("options") != null) {
		choice = JSON.parse(GetCookie("options"));
		var name = JSON.parse(GetCookie("name"));
		var hits = JSON.parse(GetCookie("hits"));
		for (i = 0; i < name.length; i++) {
			if (name == GetCookie("temp")) {
				hitcount = parseInt(hits[i]);
				user = name[i];
			}
		}
	}
	gendata(array, choice);
}

function gendata(array, choice) {
	console.log(hitcount);
	console.log(user);
	console.log(choice);
	var myDiv = document.getElementById("choice");
	var div1 = document.createElement("div")
	div1.setAttribute("id", "mydiv")
	div1.setAttribute("class", "cards")
	var para = document.createElement("p");
	var node = document.createTextNode("Welcome " + user + ".This is your " + hitcount + " time visting our website.You require "+choice[0]+" computer of subclass "+choice[1]+" .The model you have chosen is "+choice[2]+".");
	para.appendChild(node);
	div1.appendChild(para);
	myDiv.appendChild(div1);
	for (i = 0; i < choice.length; i++) {
		var myDiv = document.getElementById("imagels");
		var pic = document.createElement("img");
		pic.setAttribute("id", "pic");
		pic.setAttribute("alt", "picture");
		console.log(array[choice[i]]["image"]);
		pic.setAttribute("src", array[choice[i]]["image"]);
		myDiv.appendChild(pic);
	}
}
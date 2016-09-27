var data;
var count = 1;
var choice = new Array(3);
var http = new XMLHttpRequest();
var url = "data.json";
console.log(url)
http.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		var myArr = JSON.parse(this.responseText);
		start(myArr);
	}
};
http.open("GET", url, true);
http.send();

function start(array) {
	console.log(array);
	data = array;
	createImage(data["partpicker"]);
	console.log(data["partpicker"]);
	createSelect(data["partpicker"]);
}

function saveSelection(name, text) {
	if (typeof (Storage) !== "undefined") {
		localStorage.setItem("options", JSON.stringify(choice));
		if (!localStorage.getItem("name")) {
			localStorage.setItem("name", JSON.stringify(name));
			localStorage.setItem("comment", JSON.stringify(text));
			localStorage.setItem("hits", JSON.stringify([1]));
		}
		else {
			var flag = 0;
			var old = JSON.parse(localStorage.getItem("name"));
			var comment = JSON.parse(localStorage.getItem("comment"));
			var hits = JSON.parse(localStorage.getItem("hits"));
			for (i = 0; i < old.length; i++) {
				if (old[i] == name) {
					flag = 1;
					hits[i] = parseInt(hits[i]) + 1;
					comment[i] = text[0];
					localStorage.setItem("hits", JSON.stringify(hits));
					localStorage.setItem("comment", JSON.stringify(comment));
				}
			}
			if (flag == 0) {
				old.unshift(name[0]);
				comment.unshift(text[0]);
				hits.unshift(1);
				localStorage.setItem("name", JSON.stringify(old));
				localStorage.setItem("comment", JSON.stringify(comment));
				localStorage.setItem("hits", JSON.stringify(hits));
			}
		}
	}
	else { //use cookies
		SetCookie("options", JSON.stringify(choice));
		if (!GetCookie("name")) {
			SetCookie("name", JSON.stringify(name));
			SetCookie("comment", JSON.stringify(text));
			SetCookie("hits", JSON.stringify([1]));
		}
		else {
			var flag = 0;
			var old = JSON.parse(GetCookie("name"));
			var comment = JSON.parse(GetCookie("comment"));
			var hits = JSON.parse(GetCookie("hits"));
			for (i = 0; i < old.length; i++) {
				if (old[i] == name) {
					flag = 1;
					hits[i] = parseInt(hits[i]) + 1;
					comment[i] = text[0];
					SetCookie("hits", JSON.stringify(hits));
					SetCookie("comment", JSON.stringify(comment));
				}
			}
			if (flag == 0) {
				old.unshift(name[0]);
				comment.unshift(text[0]);
				hits.unshift(1);
				SetCookie("name", JSON.stringify(old));
				SetCookie("comment", JSON.stringify(comment));
				SetCookie("hits", JSON.stringify(hits));
			}
		}
	}
}

function createImage(array) {
	var myDiv = document.getElementById("imagels");
	var pic = document.createElement("img");
	pic.setAttribute("id", "pic");
	pic.setAttribute("alt", "picture");
	console.log(array["image"]);
	pic.setAttribute("src", array["image"]);
	myDiv.appendChild(pic);
}

function createSelect(array) {
	var myDiv = document.getElementById("question");
	var div1 = document.createElement("div")
	div1.setAttribute("id", "mydiv" + count)
	div1.setAttribute("class", "cards")
	var para = document.createElement("p");
	var node = document.createTextNode(array.Qpart);
	para.appendChild(node);
	div1.appendChild(para);
	var sel = document.createElement("select");
	sel.setAttribute("id", "mysel" + count);
	sel.setAttribute("onchange", "listen(this)");
	var option = document.createElement("option");
	option.value = "";
	option.text = "Select an option";
	sel.appendChild(option);
	for (var i = 0; i < array.choose.length; i++) {
		var option = document.createElement("option");
		option.id = i;
		option.value = array.choose[i];
		option.text = array.choose[i];
		sel.appendChild(option);
	}
	div1.appendChild(sel);
	myDiv.appendChild(div1);
}

function listen(that) {
	var sel = document.getElementById(that.id);
	var img = document.getElementsByTagName("img");
	while (sel.parentNode != sel.parentNode.parentNode.lastChild) {
		sel.parentNode.parentNode.removeChild(sel.parentNode.parentNode.lastChild);
		count = count - 1;
	}
	console.log("count" + count);
	console.log(that.id)
	var op = sel.options;
	var id = op[op.selectedIndex].id;
	var val = that.value
	console.log(id);
	console.log(val);
	console.log(data[val])
	choice[count - 1] = val;
	count++;
	img[0].setAttribute("src", data[val]["image"]);
	if (!data[val].choose) createform();
	else createSelect(data[val]);
}

function createform() {
	console.log("reached the end");
	var myDiv = document.getElementById("question");
	var div1 = document.createElement("div");
	var id = "mydiv" + count;
	div1.setAttribute("id", id);
	div1.setAttribute("class", "cards")
	var form = document.createElement("form");
	form.setAttribute("id", "fillForm");
	form.setAttribute("autocomplete", "on");
	div1.appendChild(form);
	myDiv.appendChild(div1);
	createInput("First Name");
	createInput("Last Name");
	var para = document.createElement("p");
	var node = document.createTextNode("Comment");
	para.appendChild(node);
	form.appendChild(para);
	var text = document.createElement("textarea");
	text.setAttribute("name", "commet");
	text.setAttribute("form", "fillForm");
	form.appendChild(text);
	var b = document.createElement("input");
	b.setAttribute("type", "submit");
	b.setAttribute("onclick", "buttonClicked()");
	form.appendChild(b);
	div1.appendChild(form);
	myDiv.appendChild(div1);
}

function createInput(name) {
	var myDiv = document.getElementById("mydiv" + count);
	var form = document.getElementsByTagName("form");
	var para = document.createElement("p");
	var node = document.createTextNode(name);
	para.appendChild(node);
	form[0].appendChild(para);
	var inp = document.createElement("input");
	inp.setAttribute("name", name);
	form[0].appendChild(inp);
	myDiv.appendChild(form[0])
}

function buttonClicked() {
	var inp = document.getElementsByTagName("input");
	var text = document.getElementsByTagName("textarea");
	var fname = inp[0].value;
	var lname = inp[1].value;
	var temp = fname + " " + lname
	var name = [temp];
	console.log(name);
	var comment = [text[0].value];
	saveSelection(name, comment);
}
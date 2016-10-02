/*
------------------------------------------------------------------------------------------------------------------
"question.js" contains the main functionality that is required to generate and store questions,choices and user details
Author-Balaji Jagadeesan
------------------------------------------------------------------------------------------------------------------
*/
var data; //To store the json object dynamically
var count = 1; //used to name the div and sel uniquely
var choice = new Array(3); //To store the user choice
/*
--------------------------------------------------------
The following contains the AJAX code to retrieve the JSON 
data from the file "data.json" and store it in the variable
"data".
After storing the JSON object it invokes 2 functions
1.createImage(array)- Creates an image 
2.createSelection(array)-Create the first select statement
--------------------------------------------------------
*/
var http = new XMLHttpRequest();
var url = "data.json";
//console.log(url)
http.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		var myArr = JSON.parse(this.responseText);
		data = myArr;
		createImage(data["partpicker"]);
		//console.log(data["partpicker"]);
		createSelect(data["partpicker"]);
	}
};
http.open("GET", url, true);
http.send();
/*
-----------------------------------------------------------
The following function is used to save the choice and 
user details in localStorage(if available) or in cookies.

localStorage or cookies contains the following info 
name:stores the name of the user(firstName+lastName)
hits:No of times the user visited the site
comment:the comment given by the user

The function is written in such a way to store only 5 recent
elements.Others are deleted
-----------------------------------------------------------
*/
function saveSelection(name, text) {
	//localStorage logic
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
		var temp = localStorage.setItem("temp", JSON.stringify(name[0]));
	}
	//Cookie logic
	else {
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
		var temp = SetCookie("temp", JSON.stringify(name[0]));
	}
}
/*
--------------------------------------------------------------
The following function is used to access the imagels div and 
create an image by accessing the source from the json data
--------------------------------------------------------------
*/
function createImage(array) {
	var myDiv = document.getElementById("imagels");
	var pic = document.createElement("img");
	pic.setAttribute("id", "pic");
	pic.setAttribute("alt", "picture");
	//console.log(array["image"]);
	pic.setAttribute("src", array["image"]);
	myDiv.appendChild(pic);
}
/*
--------------------------------------------------------------
The following function is used to create a div inside question 
div contains question and its corresponding choices.

The animation of div is done using move(id) function 
--------------------------------------------------------------
*/
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
	move(div1.id);
}
/*
--------------------------------------------------------------
The following function triggers whenever there is a change in the 
select statement.

The createSelect() is called recursively until there is a choice
in the json data otherwise form is created using createform().
--------------------------------------------------------------
*/
function listen(that) {
	sel = document.getElementById(that.id);
	var img = document.getElementsByTagName("img");
	while (sel.parentNode != sel.parentNode.parentNode.lastChild) {
		sel.parentNode.parentNode.removeChild(sel.parentNode.parentNode.lastChild);
		count = count - 1;
	}
	//console.log("count" + count);
	//console.log(that.id)
	var op = sel.options;
	var id = op[op.selectedIndex].id;
	var val = that.value
	//console.log(id);
	//console.log(val);
	//console.log(data[val])
	choice[count - 1] = val;
	count++;
	img[0].setAttribute("src", data[val]["image"]);
	if (!data[val].choose) createform();
	else createSelect(data[val]);
}
/*
--------------------------------------------------------------
The following function is used to create a form with input like
firstName,lastName,comment.
--------------------------------------------------------------
*/
function createform() {
	//console.log("reached the end");
	var myDiv = document.getElementById("question");
	var div1 = document.createElement("div");
	var id = "mydiv" + count;
	div1.setAttribute("id", id);
	div1.setAttribute("class", "cards")
	var form = document.createElement("form");
	form.setAttribute("id", "fillForm");
	form.setAttribute("action", "post.html")
	form.setAttribute("autocomplete", "on");
	form.setAttribute("onsubmit", "return validateForm()")
	div1.appendChild(form);
	myDiv.appendChild(div1);
	createInput("First Name");
	createInput("Last Name");
	var para = document.createElement("p");
	var node = document.createTextNode("Comment");
	para.appendChild(node);
	form.appendChild(para);
	var text = document.createElement("textarea");
	text.setAttribute("name", "comment");
	text.setAttribute("form", "fillForm");
	form.appendChild(text);
	var b = document.createElement("input");
	b.setAttribute("type", "submit");
	b.setAttribute("value", "Submit");
	b.setAttribute("onclick", "buttonClicked()");
	form.appendChild(b);
	div1.appendChild(form);
	myDiv.appendChild(div1);
	move(div1.id)
}
/*
--------------------------------------------------------------
The following function is used to create the input for the form
firstName,lastName,comment
--------------------------------------------------------------
*/
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
/*
--------------------------------------------------------------
The following function is triggered whenever the submit button 
is clicked .The function calls saveSelection() function to 
save all user info in localStorage or cookies for later use.
--------------------------------------------------------------
*/
function buttonClicked() {
	var inp = document.getElementsByTagName("input");
	var text = document.getElementsByTagName("textarea");
	var fname = inp[0].value;
	var lname = inp[1].value;
	var temp = fname + " " + lname
	var name = [temp];
	//console.log(name);
	var comment = [text[0].value];
	saveSelection(name, comment);
}
/*
--------------------------------------------------------------
The following function is used to animate the div tag.
The div tag slides in from left and stops at 100px.
--------------------------------------------------------------
*/
function move(elem) {
	var elem = document.getElementById(elem);
	var left = 0;
	var id = setInterval(frame, 4);

	function frame() {
		if (left == 100) {
			clearInterval(id);
		}
		else {
			left = left + 10;
			elem.style.left = left + 'px';
		}
	}
}
/*
--------------------------------------------------------------
The following function is used to validate the form 

firstName,lastName,comment-cannot be null
firstName,lastName should contain only alphabets
--------------------------------------------------------------
*/
function validateForm() {
	var inp = document.getElementsByTagName("input");
	var text = document.getElementsByTagName("textarea")
	var regex = /^[A-Za-z]+$/;
	if (inp[0].value == "" || inp[1].value == "" || text[0].value == "") {
		alert("Some fields are missing");
		return false;
	}
	if (inp[0].value.match(regex)) {
		return true;
	}
	else {
		alert("Name must contain only alphabets");
		return false;
	}
	return true;
}
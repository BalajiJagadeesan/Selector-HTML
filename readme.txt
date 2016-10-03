Interactive Form Elements using Dynamic HTML:

A small application to help the user to buy the right set of computer for their personal use.The application is created with the help of DOM elements to dynamically generate and display objects on the screen.
	
Folder structure and content:
C:.
│   about.html - Contains a brief description about the application and other sources
│   browser.html - Contains the landing page if the browser is not compatible
│   data.json - Original .json file that is need for the application
│   datasample.json - Sample .json file to portray that the createSelect() constructor is generic
│   index.html - The main "HOME" page of the application
│   post.html - The output page of the application
│
├───css
│       partpicker.css - The main css file that contains the styling for the application
│       reset.css - The default css to reset the style elements in a page to avoid cross browser issues
│
├───images -contains all the images used by the application
│
└───js
        browsercheck.js - Contains the logics to check whether the browser is compatible or not
        cookies.js - Contains logic to store and retrieve cookies 
        post.js - Contains the logic to post the output to the HTML page dynamically
        question.js -The main js file that is used to generate elements on to the page dynamically.
		
Features and how they are implemented:

Works in IE 7 and up and other popular browser:
	The browser.js is responsible for checking browser compatible and if the browser is not up to date,it invokes browser.html which suggests the user to download new browser. 

Accessing JSON file :
	The .json file are accessed using "AJAX code" which gets triggered whenever the status of the page changes.If the page is loaded corrected .json file is read and stored in "data" variable for easy access.

Creation of Image:
	Image is created dynamically for the first time using createImage() function and the source is changed dynamically whenever the options in the select element changes.

Creation of select:
	The select statement is created using createSelect() function which is generic constructor and generates options based on input data extracted from the .json file.
	To check the generic nature of createSelect() change the url name to "datasample.json" in both "question.js" and "post.js" file
	
Creation of Form:
	The form is created dynamically when there is no choice property in the .json file.The createform() function is used to create the form which invokes createInput() function to create inputs like "firstName" and "lastName".
	
Animation:
	move() function is responsible for animation on the page.It is used to move the div's containing the select statement and form.It gets triggered whenever a new div containing the select element or form is created.

Storage:
	There are 2 storage options available for the user- localStorage and cookies, but only one can be used at a time.If the browser allows localStorage,localStorage is used otherwise cookies is used.
	It stores the following
		name:stores the name of the user(firstName+lastName)
		hits:No of times the user visited the site.
		comment:the comment given by the user.
Use of storage:
	The storage is used to check whether the user is a regular customer or a new customer.This is done by using "hits" variable which keeps track of the number of times a user visits the page.

Display of output:
	The output is displayed dynamically using DOM elements with the use of stored variable in localStorage(if available) or cookies.
	
Styling:
	The styling is done is css which follows material design and used of card view to have a visual impact 
	
Validation:
	The form is validated using validate() function.It checks for null fields and whether the firstName and lastName field contains only alphabet.

<<SideNote>>
	->For good performance of the system use it in Google Chrome.IE works but the animation will not be fluid because of the slow load time of IE.
	->Since AJAX code is used, trying to run index.html without hosting,may or may not work properly,so please use brackets to emulate locally or host it on a server.
	-> The back button of browser returning from post.html to index.html "sometimes" returns typeerror:appendchild of null in createImage().Try going forward and coming back or refresh the page.It happens rarely and I don't seem to understand the root of the cause.

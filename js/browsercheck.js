/*
------------------------------------------------------------------------------------------------------------------
"question.js" contains the main functionality that is required to generate and store questions,choices and user details
Author-Balaji Jagadeesan
------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------------------
Derived from the code written by "Hermann Ingjaldsson" to get the details of the browser.
Visit the page "https://synodins.com/shared/modules/js/browser/6.js" for the full module for browsercheck 
------------------------------------------------------------------------------------------------------------------
*/
function get_browser() {
	var ua = navigator.userAgent
		, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return {
			name: 'IE'
			, version: (tem[1] || '')
		};
	}
	if (M[1] === 'Chrome') {
		tem = ua.match(/\bOPR\/(\d+)/)
		if (tem != null) {
			return {
				name: 'Opera'
				, version: tem[1]
			};
		}
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) {
		M.splice(1, 1, tem[1]);
	}
	return {
		name: M[0]
		, version: M[1]
	};
}
/*
------------------------------------------------------------------------------------------------------------------
The function is triggered whenever a page is loaded 
If the browser uses IE and the version is less than 7,browser.html will be triggered.
------------------------------------------------------------------------------------------------------------------
*/

function browserCheck() {
	var browser = get_browser();
	if (browser.name == "MSIE" && browser.version < 7) {
		window.location.href = "browser.html";
	}
	console.log(browser.name);
	console.log(browser.version);
}
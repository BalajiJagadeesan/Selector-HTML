//Derived from the code written by Hermann Ingjaldsson to get the details of the browser 
// Visit the page for the full module for browsercheck https://synodins.com/shared/modules/js/browser/6.js
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
//function to be trigerred on onload of page to check browser
function browserCheck() {
	var browser = get_browser();
	if (browser.name == "MSIE" && browser.version < 7) {
		window.location.href = "browser.html";
	}
	console.log(browser.name);
	console.log(browser.version);
}
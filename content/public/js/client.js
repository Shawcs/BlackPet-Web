
/*global Mustache */
'use strict';

function myFunction() {
	var result;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  if (xhttp.readyState == 4 && xhttp.status == 200) {
	    result = JSON.parse(xhttp.responseText);
	    console.log(result.item[0].prix);
	    document.querySelector('#results').innerHTML = result.html;
	  }
	};
	xhttp.open("GET", 'http://localhost:8080/api/items', true);
	xhttp.send();
}

myFunction();
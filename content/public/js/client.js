
/*global Mustache */
'use strict';

var items;

function myFunction() {
	var result;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  if (xhttp.readyState == 4 && xhttp.status == 200) {
	    result = JSON.parse(xhttp.responseText);	
	    document.querySelector('#results').innerHTML = result.html;
	    items = result.item;
	  }
	};
	xhttp.open("GET", 'http://localhost:8080/api/items', true);
	xhttp.send();
}

myFunction();
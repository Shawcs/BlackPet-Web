
/*global Mustache */
'use strict';

function myFunction() {
	var result;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  if (xhttp.readyState == 4 && xhttp.status == 200) {
	     result = xhttp.responseText;
	    document.querySelector('#results').innerHTML =result ;
	  }
	};
	xhttp.open("GET", '//localhost:8080/process_get?urlLeBonCoin='+document.getElementById("urlLeBonCoin").value, true);
	xhttp.send();
}
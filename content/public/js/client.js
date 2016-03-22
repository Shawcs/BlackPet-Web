
/*global Mustache */
'use strict';

var items;
var shopCart= [];

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

function doItemClick(item){
	var id = item.id;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  	if (xhttp.readyState == 4 && xhttp.status == 200) {
		    var result = xhttp.response;	
		    console.log("Result : " + result);
	    	document.querySelector('#shopList').innerHTML += result;
	  	}
	};

	var item = getItem(id);
	shopCart.push({id : id, count : i})
	console.log("http://localhost:8080/api/shopitem?item="+JSON.stringify(item));	
	xhttp.open("GET", "http://localhost:8080/api/shopitem?item="+ JSON.stringify(item), true);
	xhttp.send();
}

function getItem(id){
	console.log(items);
	for (var i = items.length - 1; i >= 0; i--) {
		if(items[i]._id == id)
			return items[i];
	};
}

function shopCartContain(id){
	for (var i = shopCart.length - 1; i >= 0; i--) {
		if(shopCart[i].id == id)
			return true;
	};
	return false;
}

function addShopCartItem(id){
	if(shopCartContain(id))
		shopCart.where({id : id})[0].count++;
}


Array.prototype.where = function (filter) {

    var collection = this;

    switch(typeof filter) { 

        case 'function': 
            return $.grep(collection, filter); 

        case 'object':
            for(var property in filter) {
              if(!filter.hasOwnProperty(prop)) 
                  continue; // ignore inherited properties

              collection = $.grep(collection, function (item) {
                  return item[property] === filter[property];
              });
            }
            return collection.slice(0); // copy the array 
                                      // (in case of empty object filter)

        default: 
            throw new TypeError('func must be either a' +
                'function or an object of properties and values to filter by'); 
    }
};


/*global Mustache */
'use strict';

var items;
var shopCart = [];

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
	addShopCartItem(item.id);
}

var a=0;
function unzoom(item){
if(a==0){
$("#"+item.id).animate({

                      
                      height: '+=500px',
                      width: '+=500px'
});
a=1;
}
else{
	$("#"+item.id).animate({
                      
                      height: '-=500px',
                      width: '-=500px'
      },"swing"

      );
	a=0;
}
//console.log("appelé oui");
}


function getItem(id){
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
	if(shopCartContain(id)){
		shopCart.where({id : id})[0].count++;
		var item = getItem(id);
		console.log(item.name + " : " + shopCart.where({id : id})[0].count);
		updateCountShopItem(getItem(id));
	}
	else{
		shopCart.push({id: id, count : 1});
		var item = getItem(id);
		getHtmlShopItem(item);
	}
}

function getHtmlShopItem(item){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  	if (xhttp.readyState == 4 && xhttp.status == 200) {
		    var result = xhttp.response;	
		    console.log("Result : " + result);
	    	document.querySelector('#shopList').innerHTML += result;
	  	}
	};
	console.log("http://localhost:8080/api/shopitem?item="+JSON.stringify(item));	
	xhttp.open("GET", "http://localhost:8080/api/shopitem?item="+ JSON.stringify(item), true);
	xhttp.send();
}

function updateCountShopItem(item){
	var shopItemListHtml = document.getElementById("shopList");
	var child = shopItemListHtml.childNodes;
	console.log("nb enfant : " + child.length);
	for (var i = child.length - 1; i >= 0; i--) {
		var id = child[i];
		var children = id.children[2].children[1];
		console.log(id)
		console.log("child : " + children);
		child[i].getElementsByTagName("h6")[0].innerHTML = getShopCartItem(id).count;
	};
}

function getShopCartItem(id){
	for (var i = shopCart.length - 1; i >= 0; i--) {
		if (shopCart[i].id == id)
			return shopCart[i];
	};
	return null;
}

Array.prototype.where = function (filter) {

    var collection = this;

    switch(typeof filter) { 

        case 'function': 
            return $.grep(collection, filter); 

        case 'object':
            for(var property in filter) {
              if(!filter.hasOwnProperty(property)) 
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
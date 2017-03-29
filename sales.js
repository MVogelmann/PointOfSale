var runningTotal = 0.0;

function addItem()
{
  var newItem;
  newItem = document.getElementById("price").value;

  if (isNaN(newItem))                     //IF newItem is not a number
  {
    alert("Enter price as a number");     //THEN show an alert
  }
  else                                    //OTHERWISE,
  {
    newItem = Number(newItem);                                // update newItem to its value cast as a number
    runningTotal += newItem;                                  // update runningTotal to be its value plus newItem
    var dollars;                                              // create a variable called dollars
    dollars = asCurrency(runningTotal);                       // call asCurrency() by with the value of runningTotal and assign the return value to dollars
    document.getElementById("subtotal").innerHTML = dollars;  // update the innerHTML of the span with the id "subtotal" to be dollars
    document.getElementById("price").value = "";              // update the value of the input with the id "price" to be an empty string
    setCookie("preTax", runningTotal, 10);                    // update a cookie called "preTax" with the value of runningTotal
  }
}

//takes a number and gives a string with the number displayed as USD currency
function asCurrency(val)
{
  return "$" + val.toFixed(2);
}

//produce a receipt including subtotal, tax and total
function calculateReceipt()
{
  var receiptSubtotal;
  var receiptTax;
  var receiptTotal;

  receiptSubtotal = Number(getCookie("preTax"));
  receiptTax = receiptSubtotal * 0.075;
  receiptTotal = receiptSubtotal + receiptTax;

  document.getElementById("sub").innerHTML = "$" + receiptSubtotal.toFixed(2);
  document.getElementById("tax").innerHTML = "$" + receiptTax.toFixed(2);
  document.getElementById("tot").innerHTML = "$" + receiptTotal.toFixed(2);
}

//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

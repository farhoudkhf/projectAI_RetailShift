var hrsPattern = [7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5];

var arrayOfShift1 = [];
var arrayOfShiftAll = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
/* arrayOfShiftAll[0][0] = 0; 
var sh01 = [8, 12];
var s01 = (sh01[0]-7)*2; 
//convert to arrayShiftPattern
var e01 = (sh01[1]-7)*2;
var sh01_ES = e01 - s01;*/


function testFunction01() {

    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    document.body.appendChild(x);

    /* hard coded for view of the shift pattern */
	var y0 = document.createElement("TR");
    y0.setAttribute("id", "myTr" + "x");
    document.getElementById("myTable").appendChild(y0);
    for (i = 0; i < hrsPattern.length; i++) {
		var z = document.createElement("TH");
		var t = document.createTextNode(hrsPattern[i]);
		z.appendChild(t);
		document.getElementById("myTr" + "x").appendChild(z);
	}
	
    /* hard coded for view of the index numbers of 30min interval */
	var y1 = document.createElement("TR");
    y1.setAttribute("id", "myTr" + "xx");
    document.getElementById("myTable").appendChild(y1);
    for (i = 0; i < hrsPattern.length; i++) {
		var z = document.createElement("TD");
		var t = document.createTextNode(i);
		z.appendChild(t);
		document.getElementById("myTr" + "xx").appendChild(z);
	}
	
    /* all zero, to be deleted */
	var y1 = document.createElement("TR");
    y1.setAttribute("id", "myTr" + "xxx");
    document.getElementById("myTable").appendChild(y1);
    for (i = 0; i < hrsPattern.length; i++) {
		var z = document.createElement("TD");
		var t = document.createTextNode(0);
		z.appendChild(t);
		document.getElementById("myTr" + "xxx").appendChild(z);
	}
	
	var shiftNum = 0;
	makeShiftPattern(9, 15, shiftNum);
	shiftNum++;
	makeShiftPattern(10, 14, shiftNum);
	shiftNum++;
	makeShiftPattern(11, 20, shiftNum);
	/*  */
}

function makeShiftPattern(startShift, endShift, shiftNumber){
	var y1 = document.createElement("TR");
    y1.setAttribute("id", "myTr" + shiftNumber);
    document.getElementById("myTable").appendChild(y1);
    for (i = 0; i < hrsPattern.length; i++) {
		var z = document.createElement("TD");
		if(startShift <= hrsPattern[i] && endShift > hrsPattern[i]) {
			var t = document.createTextNode(1);
			arrayOfShiftAll[shiftNumber].push(1);
		} else {
			var t = document.createTextNode(0);
			arrayOfShiftAll[shiftNumber].push(0);
		}
		z.appendChild(t);
		document.getElementById("myTr" + shiftNumber).appendChild(z);
	}
	document.getElementById("demo").innerHTML = arrayOfShiftAll; 
}


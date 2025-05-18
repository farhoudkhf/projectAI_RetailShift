/* Global Variables */
var hrsPattern = [7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5];
var arrayOfShiftAll = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var sumColArrayOfShiftAll = [];

function testFunction01() {

    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    document.body.appendChild(x);

    /* hard coded for view of the shift pattern */
	var y0 = document.createElement("TR");
    y0.setAttribute("id", "myTr" + "x");
    document.getElementById("myTable").appendChild(y0);
	var z = document.createElement("TH");
	var t = document.createTextNode("hrs");
	z.appendChild(t);
	document.getElementById("myTr" + "x").appendChild(z);
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
	var z = document.createElement("TD");
	var t = document.createTextNode("indx");
	z.appendChild(t);
	document.getElementById("myTr" + "xx").appendChild(z);
    for (i = 0; i < hrsPattern.length; i++) {
		var z = document.createElement("TD");
		var t = document.createTextNode(i);
		z.appendChild(t);
		document.getElementById("myTr" + "xx").appendChild(z);
	}
	
	/* hard coded shifts */
	var shiftNum = 0;
	makeShiftPattern(9, 15, shiftNum);
	shiftNum++;
	makeShiftPattern(9.5, 14.5, shiftNum);
	shiftNum++;
	makeShiftPattern(10, 14, shiftNum);
	shiftNum++;
	makeShiftPattern(11, 20, shiftNum);
	shiftNum++;
	makeShiftPattern(11, 19, shiftNum);
	shiftNum++;
	makeShiftPattern(12, 18, shiftNum);
	shiftNum++;
	makeShiftPattern(12, 20, shiftNum);
	shiftNum++;
	makeShiftPattern(13, 17, shiftNum);
	shiftNum++;
	makeShiftPattern(13, 20, shiftNum);
	shiftNum++;
	makeShiftPattern(14, 18, shiftNum);
	shiftNum++;
	makeShiftPattern(14, 20, shiftNum);
	shiftNum++;
	makeShiftPattern(15, 20, shiftNum);
	shiftNum++;
	makeShiftPattern(15, 20, shiftNum);
	shiftNum++;
	makeShiftPattern(11, 20, shiftNum);
	shiftNum++;
	makeShiftPattern(11, 20, shiftNum);
	/*  */
	
	/* for view to be deleted 
	document.getElementById("demo").innerHTML = arrayOfShiftAll; 
	*/
	/* this is to make the array of sum of the each column without breaks */
	totalShiftPerHour(shiftNum);
	addBreakToShift(shiftNum);
}

/*
	make shift arrays by adding 1 to the pattern
*/
function makeShiftPattern(startShift, endShift, shiftNumber){
	var shiftLength = endShift-startShift;
	if (shiftLength <= 4) {
		var breakValue = 0;
		var breakText = "-";
	} else if (shiftLength <= 6) {
		var breakValue = 0.5;
		var breakText = "B";
	} else if (shiftLength <= 8) {
		var breakValue = 1;
		var breakText = "LL";
	} else {
		var breakValue = 1.5;
		var breakText = "LL-B";
	}
	
	var y1 = document.createElement("TR");
    y1.setAttribute("id", "myTr" + shiftNumber);
    document.getElementById("myTable").appendChild(y1);
	var z = document.createElement("TD");
	var t = document.createTextNode("s#"+shiftNumber);
	z.appendChild(t);
	document.getElementById("myTr" + shiftNumber).appendChild(z);    
	for (i = 0; i < hrsPattern.length; i++) {
		var z = document.createElement("TD");
		if(startShift <= hrsPattern[i] && endShift > hrsPattern[i]) {	
			var t = document.createTextNode(1);
			arrayOfShiftAll[shiftNumber].push(1);
		} else {
			var t = document.createTextNode("");
			arrayOfShiftAll[shiftNumber].push(0);
		}
		z.appendChild(t);
		document.getElementById("myTr" + shiftNumber).appendChild(z);
	}
	
	var z = document.createElement("TD");
	var t = document.createTextNode(startShift +"-"+ endShift);
	arrayOfShiftAll[shiftNumber].push(startShift +"-"+ endShift); //index 34
	z.appendChild(t);
	document.getElementById("myTr" + shiftNumber).appendChild(z);
	
	var z = document.createElement("TD");
	var t = document.createTextNode(breakText);
	arrayOfShiftAll[shiftNumber].push(breakText); //index 35
	z.appendChild(t);
	document.getElementById("myTr" + shiftNumber).appendChild(z);
	
	var z = document.createElement("TD");
	var t = document.createTextNode(shiftLength-breakValue);
	arrayOfShiftAll[shiftNumber].push(shiftLength-breakValue); //index 36
	z.appendChild(t);
	document.getElementById("myTr" + shiftNumber).appendChild(z);
	
	var z = document.createElement("TD");
	var t = document.createTextNode(breakValue);
	//arrayOfShiftAll[shiftNumber].push(breakValue); //index 39
	z.appendChild(t);
	document.getElementById("myTr" + shiftNumber).appendChild(z);
	
	arrayOfShiftAll[shiftNumber].push(startShift); //index 37
	arrayOfShiftAll[shiftNumber].push(endShift); //index 38
	arrayOfShiftAll[shiftNumber].push(breakValue); //index 39
}

/**
	make the array for the shift coverage 
*/
function totalShiftPerHour(shiftNumber){
	/* hard coded for view of the index numbers of 30min interval */
	var y1 = document.createElement("TR");
    y1.setAttribute("id", "myTr" + shiftNumber+1);
    document.getElementById("myTable").appendChild(y1);
	var z = document.createElement("TD");
	var t = document.createTextNode("sum");
	z.appendChild(t);
	document.getElementById("myTr" + shiftNumber+1).appendChild(z);
	for (i = 0; i < hrsPattern.length; i++) {
		var sumOfAllShiftCol = 0;
		for(j = 0; j <= shiftNumber; j++) {
			sumOfAllShiftCol += arrayOfShiftAll[j][i];
		}
		sumColArrayOfShiftAll.push(sumOfAllShiftCol);
		var z = document.createElement("TD");
		var t = document.createTextNode(sumOfAllShiftCol);
		z.appendChild(t);
		document.getElementById("myTr" + shiftNumber+1).appendChild(z);
	}
}

/**
	startShift +"-"+ endShift //index 34
	breakText //index 35
	shiftLength-breakValue //index 36
	startShift //index 37
	endShift //index 38
	breakValue //index 39	
*/
function addBreakToShift(numberOfShifts){
	
}
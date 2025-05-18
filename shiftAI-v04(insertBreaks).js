/* Global Variables */
var hrsPattern = [7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5];
var arrayOfShiftAll = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var sumColArrayOfShiftAll = [];
var firstInitialisedBreakSumVector = [];
var errorBeforeAndAfrterBreak = [];

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
	make shift arrays by adding 1 to the pattern (no display here)
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
	
	for (i = 0; i < hrsPattern.length; i++) {
		if(startShift <= hrsPattern[i] && endShift > hrsPattern[i]) {	
			arrayOfShiftAll[shiftNumber].push(1);
		} else {
			arrayOfShiftAll[shiftNumber].push(0);
		}
	}
	
	arrayOfShiftAll[shiftNumber].push(startShift +"-"+ endShift); //index 34
	arrayOfShiftAll[shiftNumber].push(breakText); //index 35
	arrayOfShiftAll[shiftNumber].push(shiftLength-breakValue); //index 36
	arrayOfShiftAll[shiftNumber].push(startShift); //index 37
	arrayOfShiftAll[shiftNumber].push(endShift); //index 38
	arrayOfShiftAll[shiftNumber].push(breakValue); //index 39
}

/**
	make the array for the shift coverage 
*/
function totalShiftPerHour(shiftNumber){
	/* hard coded for view of the index numbers of 30min interval */
	for (i = 0; i < hrsPattern.length; i++) {
		var sumOfAllShiftCol = 0;
		for(j = 0; j <= shiftNumber; j++) {
			sumOfAllShiftCol += arrayOfShiftAll[j][i];
		}
		sumColArrayOfShiftAll.push(sumOfAllShiftCol);
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
	//arrayOfShiftAll
	for (i = 0; i <= numberOfShifts; i++) {
		var y1 = document.createElement("TR");
		y1.setAttribute("id", "myTr" + i);
		document.getElementById("myTable").appendChild(y1);
		var z = document.createElement("TD");
		var t = document.createTextNode("s#" + i);
		z.appendChild(t);
		document.getElementById("myTr" + i).appendChild(z);
		if (arrayOfShiftAll[i][39] == 0) { 
			for (j = 0; j < 34; j++) {
				var z = document.createElement("TD");
				if(arrayOfShiftAll[i][37] <= hrsPattern[j] && arrayOfShiftAll[i][38] > hrsPattern[j]) {	
					var t = document.createTextNode(1);
				} else {
					var t = document.createTextNode("");
				}
			z.appendChild(t);
			document.getElementById("myTr" + i).appendChild(z);
			}
		} else if (arrayOfShiftAll[i][39] <= 0.5) {
			for (j = 0; j < 34; j++) {
				var z = document.createElement("TD");
				if(arrayOfShiftAll[i][37] <= hrsPattern[j] && arrayOfShiftAll[i][38] > hrsPattern[j]) {	
				// only middle of the shift change to "B" (((endShift-startShift)/2)+shiftStart)
				var findMidForBreak = (((arrayOfShiftAll[i][38]-arrayOfShiftAll[i][37])/2)+arrayOfShiftAll[i][37]);
					if (findMidForBreak == hrsPattern[j]) {
						arrayOfShiftAll[i][j] = "B";
						var t = document.createTextNode("B");
					} else {
						var t = document.createTextNode(1);
					}
				} else {
					var t = document.createTextNode("");
				}
			z.appendChild(t);
			document.getElementById("myTr" + i).appendChild(z);
			}
		} else if (arrayOfShiftAll[i][39] <= 1) {
			for (j = 0; j < 34; j++) {
				var z = document.createElement("TD");
				if(arrayOfShiftAll[i][37] <= hrsPattern[j] && arrayOfShiftAll[i][38] > hrsPattern[j]) {	
				// only middle of the shift change to "L""L" (((endShift-startShift)/2)+shiftStart)
				var findMidForBreak = (((arrayOfShiftAll[i][38]-arrayOfShiftAll[i][37])/2)+arrayOfShiftAll[i][37]);
					if (findMidForBreak == hrsPattern[j]-0.5 || (findMidForBreak == hrsPattern[j])) {
						arrayOfShiftAll[i][j] = "L";
						var t = document.createTextNode("L");
					} else {
						var t = document.createTextNode(1);
					}
				} else {
					var t = document.createTextNode("");
				}
			z.appendChild(t);
			document.getElementById("myTr" + i).appendChild(z);
			}
		} else if (arrayOfShiftAll[i][39] <= 1.5){
			for (j = 0; j < 34; j++) {
				var z = document.createElement("TD");
				if(arrayOfShiftAll[i][37] <= hrsPattern[j] && arrayOfShiftAll[i][38] > hrsPattern[j]) {	
				// first 1/3  to "L""L" last 2/3rd to "B"(((endShift-startShift)/3)+shiftStart-1) 
				// and ((((endShift-startShift)/3)*2)+shiftStart+1)
				var findFirst3rdForBreak = (((arrayOfShiftAll[i][38]-arrayOfShiftAll[i][37])/3)+arrayOfShiftAll[i][37]-1);
				var findSecond3rdMidForBreak = ((((arrayOfShiftAll[i][38]-arrayOfShiftAll[i][37])/3)*2)+arrayOfShiftAll[i][37]+1);
					if (findFirst3rdForBreak == hrsPattern[j]-0.5 || (findFirst3rdForBreak == hrsPattern[j])) {
						arrayOfShiftAll[i][j] = "L";
						var t = document.createTextNode("L");
					} else if (findSecond3rdMidForBreak == hrsPattern[j]) {
						arrayOfShiftAll[i][j] = "B";
						var t = document.createTextNode("B");
					} else {
						var t = document.createTextNode(1);
					}
				} else {
					var t = document.createTextNode("");
				}
			z.appendChild(t);
			document.getElementById("myTr" + i).appendChild(z);
			}
		}
	}	
	
	//total coverage before breaks
	var y1 = document.createElement("TR");
    y1.setAttribute("id", "myTr" + numberOfShifts + 1);
    document.getElementById("myTable").appendChild(y1);
	var z = document.createElement("TD");
	var t = document.createTextNode("sumBeforB");
	z.appendChild(t);
	document.getElementById("myTr" + numberOfShifts + 1).appendChild(z);
	for (i = 0; i < hrsPattern.length; i++) {
		var z = document.createElement("TD");
		var t = document.createTextNode(sumColArrayOfShiftAll[i]);
		z.appendChild(t);
		document.getElementById("myTr" + numberOfShifts + 1).appendChild(z);
	}
	
	//total coverage after breaks
	var y1 = document.createElement("TR");
    y1.setAttribute("id", "myTr" + numberOfShifts + 2);
    document.getElementById("myTable").appendChild(y1);
	var z = document.createElement("TD");
	var t = document.createTextNode("sumAfterB");
	z.appendChild(t);
	document.getElementById("myTr" + numberOfShifts + 2).appendChild(z);
	for (i = 0; i < hrsPattern.length; i++) {
		var sumOfAllShiftColDeducted= 0;
		for(j = 0; j <= numberOfShifts; j++) {
			if(arrayOfShiftAll[j][i] == 1) {
				sumOfAllShiftColDeducted += arrayOfShiftAll[j][i];
			}
		}
		firstInitialisedBreakSumVector.push(sumOfAllShiftColDeducted);
		var z = document.createElement("TD");
		var t = document.createTextNode(sumOfAllShiftColDeducted);
		z.appendChild(t);
		document.getElementById("myTr" + numberOfShifts + 2).appendChild(z);
	}
	
	// total coverage variance before and after breaks
	var y1 = document.createElement("TR");
    y1.setAttribute("id", "myTr" + numberOfShifts + 3);
    document.getElementById("myTable").appendChild(y1);
	var z = document.createElement("TD");
	var t = document.createTextNode("error");
	z.appendChild(t);
	document.getElementById("myTr" + numberOfShifts + 3).appendChild(z);
	for (i = 0; i < hrsPattern.length; i++) {
		errorBeforeAndAfrterBreak.push(sumColArrayOfShiftAll[i] - firstInitialisedBreakSumVector[i]);
		var z = document.createElement("TD");
		var t = document.createTextNode(sumColArrayOfShiftAll[i] - firstInitialisedBreakSumVector[i]);
		z.appendChild(t);
		document.getElementById("myTr" + numberOfShifts + 3).appendChild(z);
	}
}
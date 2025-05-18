var hrsPattern = [7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5];


function myFunction() {

    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    document.body.appendChild(x);

    var y0 = document.createElement("TR");
    y0.setAttribute("id", "myTr0");
    document.getElementById("myTable").appendChild(y0);
    var z = document.createElement("TH");
    var t = document.createTextNode(hrsPattern[0]);
	z.appendChild(t);
    document.getElementById("myTr0").appendChild(z);
	var z = document.createElement("TH");
    var t = document.createTextNode(hrsPattern[2]);
	z.appendChild(t);
    document.getElementById("myTr0").appendChild(z);
	
	
	var y1 = document.createElement("TR");
    y1.setAttribute("id", "myTr1");
    document.getElementById("myTable").appendChild(y1);
    var z = document.createElement("TD");
    var t = document.createTextNode(hrsPattern[1]);
	z.appendChild(t);
    document.getElementById("myTr1").appendChild(z);
	var z = document.createElement("TD");
    var t = document.createTextNode(hrsPattern[3]);
	z.appendChild(t);
    document.getElementById("myTr1").appendChild(z);
}
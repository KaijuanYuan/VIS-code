var connection =  [[],[],[],[],[],[],[],[],[],[]];
				 /* [[0, 1, 1], 
				 [1, 0, 1], 
				 [1, 1, 0]];*/
				
				 /* = [[0, 1, 0, 1, 1, 0, 0, 0], 
				 [1, 0, 1, 0, 0, 1, 0, 0], 
				 [0, 1, 0, 1, 0, 0, 1, 0], 
				 [1, 0, 1, 0, 0, 0, 0, 1],
				 [1, 0, 0, 0, 0, 1, 0, 1],
				 [0, 1, 0, 0, 1, 0, 1, 0],
				 [0, 0, 1, 0, 0, 1, 0, 1],
				 [0, 0, 0, 1, 1, 0, 1, 0]];*/
				  /*=  [[0, 1, 1], 
				 [1, 0, 1], 
				 [1, 1, 0]];*/
				 /*[[0, 1, 0, 1], 
				 [1, 0, 1, 0], 
				 [0, 1, 0, 1],
				 [1, 0, 1, 0]];*/
				 /*[[0, 1, 0, 1, 1, 0, 0, 0], 
				 [1, 0, 1, 0, 0, 1, 0, 0], 
				 [0, 1, 0, 1, 0, 0, 1, 0], 
				 [1, 0, 1, 0, 0, 0, 0, 1],
				 [1, 0, 0, 0, 0, 1, 0, 1],
				 [0, 1, 0, 0, 1, 0, 1, 0],
				 [0, 0, 1, 0, 0, 1, 0, 1],
				 [0, 0, 0, 1, 1, 0, 1, 0]];*/
				/* [[0, 1, 1], 
				 [1, 0, 1], 
				 [1, 1, 0]];*/



var origin = {x:0, y:0};
var node1 = {x:0, y:0};
var node2 = {x:100, y:0};
var node3 = {x:50, y:86};
var node4 = {x:30, y:-30};
var vectorC = {magnitude:0, direction:0};
//var diagram = [node1, node2, node3];
var diagram = [];
var next = [];
var REPULSION_CONSTANT = 10000;
var ATTRACTION_CONSTANT = 0.1;//0.1
var SPRING_LENGTH = 80;
var ITERATION = 500;//500 threshold<10
var DAMPLING = 0.5;//0.5
var N = 0;

function calDistance(nodeX, nodeY) {
	return Math.sqrt(Math.pow((nodeX.x - nodeY.x ), 2) + Math.pow((nodeX.y - nodeY.y), 2 ));
}

function getBearingAngle(nodeX, nodeY) {
	var difX = nodeY.x - nodeX.x;
	var difY = nodeY.y - nodeX.y;
	var angle = 0;
	if(difX == 0) difX = 0.001;
	if(difY == 0) difY = 0.001;
	if(Math.abs(difX)>Math.abs(difY)){
		angle = Math.atan(difY / difX) * (180.0 / Math.PI);
		if(((difX < 0) && (difY > 0)) || ((difX < 0) && (difY < 0))) angle += 180;
	}
	else {
		angle = Math.atan(difX / difY) * (180.0 / Math.PI);
		if(((difY < 0) && (difX > 0)) || ((difY < 0) && (difX < 0))) angle += 180;
		angle = (180 - (angle + 90));
	}
	return angle;
}

function calRepulsionForce(nodeX, nodeY) {
	var proximity = Math.max(calDistance(nodeX, nodeY), 1);
	var force = -(REPULSION_CONSTANT / Math.pow(proximity,2));
	var angle = getBearingAngle(nodeX, nodeY);
	var vector = {magnitude:force, direction:angle};
    return vector;
}

function calAttractionForce(nodeX, nodeY) {
	var proximity = Math.max(calDistance(nodeX, nodeY), 1);
	var force = ATTRACTION_CONSTANT * Math.max((proximity - SPRING_LENGTH), 0);
	var angle = getBearingAngle(nodeX, nodeY);
	var vector = {magnitude:force, direction:angle};
    return vector;
}

function fAdd(vectorX, vectorY){
	var vectorF = {magnitude:0, direction:0};
	var aX = vectorX.magnitude * Math.cos((Math.PI / 180.0) * vectorX.direction);
	var aY = vectorX.magnitude * Math.sin((Math.PI / 180.0) * vectorX.direction);
	var bX = vectorY.magnitude * Math.cos((Math.PI / 180.0) * vectorY.direction);
	var bY = vectorY.magnitude * Math.sin((Math.PI / 180.0) * vectorY.direction);
	aX += bX;
	aY += bY;
	var nodeM = {x:aX, y:aY};
	vectorF.magnitude = Math.sqrt(Math.pow(aX,2) + Math.pow(aY,2));
	if(vectorF.magnitude ==0)
		vectorF.direction = 0;
	else
		vectorF.direction = (180.0 / Math.PI) * Math.atan(aY/aX);
		

	return vectorF;

}


function generatePosition(){
	for(var i = 0; i<N; i++) {
		var nodeN = {x:0, y:0};
		//nodeN.x = Math.floor(Math.random() * 100);
		//nodeN.y = Math.floor(Math.random() * 50);

		nodeN.x = Math.round(Math.random() * 500);
		nodeN.y = Math.round(Math.random() * 250);
		diagram.push(nodeN);

	}

	var initialPosition = "";
	for(var i = 0; i < N; i++) {
		//document.write(diagram[i].x + " " + diagram[i].y + "</br>");
		initialPosition += diagram[i].x + " " + diagram[i].y + "<br>";
		
	}

	//document.getElementById("initialPos").innerHTML = initialPosition;
	
	
}


function forceDirected(){
	diagram = [];
	N = connection.length;
	generatePosition();

	for(var loop = 0; loop < ITERATION; loop++) { //2In the loop of iterations
		//document.write("</br></br> loop " + loop + "</br></br>");

		var totalDisplacement = 0; //2.1 Initialize the totalDisplacement
		for(var i=0; i<N; i++) { //2.2 For each node
			var netForce = {magnitude:0, direction:0}; //2.2.1 Initialize the netForce
			vectorC.magnitude = calDistance(origin, diagram[i]);
			vectorC.direction = getBearingAngle(origin, diagram[i]);
			for(var j=0; j<N; j++) { 
				if(j!=i) //2.2.2 CalRepulsionForce()
				{
					var ve1 = calRepulsionForce(diagram[i], diagram[j]);
					netForce = fAdd(netForce, ve1);
				}
				if(connection[i][j]!=0) //2.2.3 CalAttractionForce()
				{
					var ve2 = calAttractionForce(diagram[i], diagram[j]);
					netForce = fAdd(netForce, ve2);
				}
			}
			netForce.magnitude = netForce.magnitude * DAMPLING; //2.2.4 Add netForce to velocity vector
			vectorC = fAdd(vectorC, netForce);

			next[i] = {x:0, y:0};
			next[i].x = vectorC.magnitude * Math.cos((Math.PI / 180.0) * vectorC.direction); //2.2.5 apply new position
			next[i].y = vectorC.magnitude * Math.sin((Math.PI / 180.0) * vectorC.direction);
			
			//document.write(next[i].x + " " + next[i].y + "</br>");
		}
		
		for(var i=0; i<N; i++) {
			totalDisplacement += calDistance(next[i], diagram[i]);
			//document.write("Old position: " + diagram[i].x + " " + diagram[i].y + "</br>");
			diagram[i].x = next[i].x;
			diagram[i].y = next[i].y;
			//document.write("New position: " + diagram[i].x + " " + diagram[i].y + "</br>" + "</br>");
		}
		if(totalDisplacement < 5)
		{
			//document.write(loop);
			break;
		}
		

	}

	/*for(var i = 0; i < diagram.length; i++) {
		document.write(diagram[i].x + " " + diagram[i].y + "</br>");
	}*/

	//var st = diagram[1].x + "" + diagram[1].y + "" + diagram[2].x + "" + diagram[2].y + "" + diagram[3].x + "" + diagram[3].y + "" + diagram[4].x + "" + diagram[4].y;
	return 0;
}







function boundary() {
	var miniX = 0;
	var miniY = 0;
	var maxiX = 1000;
	var maxiY = 500;
	for(var i=0; i<N; i++) {
		if(diagram[i].x < miniX)
			miniX = diagram[i].x;
		if(diagram[i].y < miniY)
			miniY = diagram[i].y;
		if(diagram[i].x > maxiX)
			maxiX = diagram[i].x;
		if(diagram[i].y > maxiY)
			maxiY = diagram[i].y;
	}

	//document.write(miniX + " " + miniY + "</br>");
	if(miniX<0)
		for(var i=0; i<N; i++) 
			diagram[i].x = diagram[i].x + Math.abs(miniX);


	if(miniY<0)
		for(var i=0; i<N; i++) 
			diagram[i].y = diagram[i].y + Math.abs(miniY);
		

	if(maxiX>1000)
		for(var i=0; i<N; i++) 
			diagram[i].x = diagram[i].x - (maxiX-1000);
			

	if(maxiY>500)
		for(var i=0; i<N; i++) 
			diagram[i].y = diagram[i].y - (maxiY-500);
		

	/*for(var i=0; i<N; i++) {
		for(var j=0; j<N; j++) {
			document.write(diagram[i].x + "  " + diagram[i].y + "<br>");
		}
		
	}*/

	return;
}


function nRead(nr) {
	var con = [];
	var wp = nr.value;

	wp = wp.split(";");
	N = wp.length;
	for(var i=0; i<10; i++) 
		for(var j=0; j<10; j++)
			connection[i][j] = 0;

	

	for(var i=0; i<N; i++) {
		con= wp[i].split(" ");
		for(var j=0; j<N; j++) {
			connection[i][j] = parseInt(con[j]);
		}
	}

	document.getElementById("initialPos").innerHTML = N;
	return;
}



function draw(nr, canId){

//document.write((180.0 / Math.PI) * Math.atan2(-1000, -1000));
	nRead(nr);
	forceDirected();

	var c = document.getElementById(canId);
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, 1000, 500); 

	boundary();

	

	//document.getElementById("finalPos").innerHTML = finalPosition;

	for(var i=0; i<N; i++) {
		ctx.beginPath();
		ctx.strokeStyle = "blue";
		ctx.arc(diagram[i].x,diagram[i].y,5,0,2*Math.PI);
		ctx.stroke(); 
		ctx.closePath();

	}

	for(var i=0; i<N; i++) {
		for(var j=i+1; j<N; j++) {
			if(connection[i][j]!=0) {
				ctx.strokeStyle = "blue";
				ctx.moveTo(diagram[i].x, diagram[i].y);
				ctx.lineTo(diagram[j].x, diagram[j].y);
				ctx.stroke();
			}
		}
	}

		
}



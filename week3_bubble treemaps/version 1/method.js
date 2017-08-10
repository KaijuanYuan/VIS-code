var E = []; //envelope
var circleOrigin = [];
var circleEnlarge = [];

var circleIntersect;//intersection point of two circles

var m = 5; //contour-structure
var w = 3; //distance of adjacent objects
var p = 5; //width of contour
var d = m + w + p; //d_1 = m_i + w_i + p_i
var s = 10; //smoothness parameter--the radius for tagent arc



//develop the object of circle
function circle(xV, yV, radiusV) {
	this.x = xV;
	this.y = yV;
	this.radius = radiusV;
}



//Initialize the Original circle dataset
function initial() {
	var c;
	c = new circle(100.0,100.0,30.0);
	circleOrigin.push(c);
	c = new circle(125.0,100.0,10.0);
	circleOrigin.push(c);
	c = new circle(150.0,100.0,30.0);
	circleOrigin.push(c);

	return 0;
}


//Enlarge the original circle with d+s
function enlarge(circleList){
	var cEn;
	for(var i=0; i<circleList.length; i++)
	{
		cEn = new circle(circleList[i].x, circleList[i].y, circleList[i].radius + d + s);

		circleEnlarge.push(cEn);
	}
	return 0;
}


//find the circle with the leftmost extent
function leftmostExtent(circleList) {
	circleList.sort(function(a,b){return (a.x-a.radius) - (b.x-b.radius)});
	return 0;
}



//detect the intersection point of two circles
function intersection(circle1, circle2, loopDirection)
{
	
	var x1,x2,y1,y2;
	var D1 = -2*circle1.x;
	var E1 = -2*circle1.y;
	var F1 = Math.pow(circle1.x, 2) + Math.pow(circle1.y, 2) - Math.pow(circle1.radius, 2);
	var D2 = -2*circle2.x;
	var E2 = -2*circle2.y;
	var F2 = Math.pow(circle2.x, 2) + Math.pow(circle2.y, 2) - Math.pow(circle2.radius, 2);

	var a,b,cF,delta;


	if(D1 == D2)//两交点y坐标同
	{
		y1 = (F2-F1)/(E1-E2);
		y2 = (F2-F1)/(E1-E2);
		a = 1;
		b = D1;
		cF = y1 * y1 + E1 * y1 + F1;
		delta = b * b - 4 * a * cF;

		x1 = (-b + Math.sqrt(delta))/(2*a);
		x2 = (-b - Math.sqrt(delta))/(2*a);

	}
	else if(E1 == E2)//两交点x坐标同
	{
		x1 = (F2-F1)/(D1-D2);
		x2 = (F2-F1)/(D1-D2);
		a = 1;
		b = E1;
		cF = x1 * x1 + D1 * x1 + F1;
		delta = b * b - 4 * a * cF;

		y1 = (-b + Math.sqrt(delta))/(2*a);
		y2 = (-b - Math.sqrt(delta))/(2*a);
	}
	else
	{
		a = 1 + (Math.pow((D2-D1), 2) / Math.pow((E1-E2), 2));
		var b1 = D1;
		var b2 = 2*(D2-D1)*(F2-F1)/(Math.pow((E1-E2),2));
		var b3 = E1*(D2-D1)/(E1-E2);
		b = b1 + b2 + b3;
		var c1 = Math.pow((F2-F1),2) / Math.pow((E1-E2),2);
		var c2 = E1*(F2-F1)/(E1-E2);
		var c3 = F1;
		cF = c1 + c2 + c3;
		delta = b * b - 4 * a * cF;

		x1 = (-b + Math.sqrt(delta))/(2*a);
		x2 = (-b - Math.sqrt(delta))/(2*a);
		y1 = ((D2-D1)*x1 + (F2-F1))/(E1-E2);
		y2 = ((D2-D1)*x2 + (F2-F1))/(E1-E2);
	}

	

	circleIntersect.x = -1;
	circleIntersect.y = -1;

	/*
	document.getElementById("textar").innerHTML += "D1: " + D1 + "\n";
	document.getElementById("textar").innerHTML += "E1: " + E1 + "\n";
	document.getElementById("textar").innerHTML += "F1: " + F1 + "\n";
	document.getElementById("textar").innerHTML += "D2: " + D2 + "\n";
	document.getElementById("textar").innerHTML += "E2: " + E2 + "\n";
	document.getElementById("textar").innerHTML += "F2: " + F2 + "\n";
	document.getElementById("textar").innerHTML += "a: " + a + "\n";
	document.getElementById("textar").innerHTML += "b: " + b + "\n";
	document.getElementById("textar").innerHTML += "c: " + cF + "\n";
	document.getElementById("textar").innerHTML += "delta: " + delta + "\n";
	*/
		

	if(delta>=0)
	{
		//y1 is the intersection point above 
		if(y1 > y2){
			var mp = y1;
			y1 = y2;
			y2 = mp;
			mp = x1;
			x1 = x2;
			x2 = mp;
		}

		/*
		document.getElementById("textar").innerHTML += "x1: " + x1 + "\n";
		document.getElementById("textar").innerHTML += "y1: " + y1 + "\n";
		document.getElementById("textar").innerHTML += "x2: " + x2 + "\n";
		document.getElementById("textar").innerHTML += "y2: " + y2 + "\n";
		*/

		//上边界
		if(loopDirection == 0)
		{
			circleIntersect.x = x1;
			circleIntersect.y = y1;
			circleIntersect.radius = 0;
		}
		//下边界
		else if(loopDirection == 1)
		{
			circleIntersect.x = x2;
			circleIntersect.y = y2;
			circleIntersect.radius = 0;
		}
		return 1;

	}

	else	
		return 0;

	
}



//find the leftmost intersection of one circle cLeft
function leftmostIntersection(cLeft, circleList)
{
	var angleMax = 0;
	var angleCur = 0;
	var flag = 0;
	var pointIntersect = new circle(0,0,0);

	for(var i=cLeft+1; i<circleList.length; i++)
	{

		intersection(circleList[cLeft], circleList[i], 0);
		if(circleList.x == -1)
			break;

		angleCur = Math.atan(Math.abs(circleIntersect.y - circleList[cLeft].y) / Math.abs(circleIntersect.x - circleList[cLeft].x));
		
		if(angleCur > angleMax)
		{
			flag = i;
			pointIntersect.x = circleIntersect.x;
			pointIntersect.y = circleIntersect.y;
		}	
	}

	if(flag != 0)
	{
		var circleNext = new circle(circleList[flag].x, circleList[flag].y, circleList[flag].radius);
		E.push(pointIntersect);
		E.push(circleNext);
		return flag;
	}
	
	return 0;
}






//calculate the final contour of all envelopes
function contour()
{
	circleIntersect = new circle(-1, -1, 0);
	var curLeft = 0;//the index of current point
	initial();
	enlarge(circleOrigin);
	leftmostExtent(circleEnlarge);

	E.push(circleEnlarge[0]);
	var eLength;
	do{
		eLength = E.length;
		curLeft= leftmostIntersection(curLeft, circleEnlarge);
		document.getElementById("textar").innerHTML +="THe current leftmost point is : " + curLeft + "\n";
	}while(eLength < E.length && curLeft != 0 )

}





//draw the final circle 
function draw(canId){

	contour();

	var context = document.getElementById(canId);
	var ctx = context.getContext("2d");
	ctx.clearRect(0, 0, 1000, 500); 


	for(var i = 0; i<circleOrigin.length; i++){
		ctx.beginPath();
		ctx.arc(circleOrigin[i].x, circleOrigin[i].y, circleOrigin[i].radius, 0, 2*Math.PI);
		ctx.stroke();

	}

	for(var i = 0; i<circleEnlarge.length; i++){
		ctx.beginPath();
		ctx.strokeStyle = "#0000FF";
		ctx.arc(circleEnlarge[i].x, circleEnlarge[i].y, circleEnlarge[i].radius, 0, 2*Math.PI);
		ctx.stroke();

	}

	for(var i = 0; i<E.length; i++){
		if(E[i].radius == 0)
		{
			ctx.beginPath();
			ctx.strokeStyle = "#000000";
			ctx.arc(E[i].x, E[i].y, 2, 0, 2*Math.PI);
			ctx.stroke();
		}
		else if(E[i].radius >0)
		{
			ctx.beginPath();
			ctx.strokeStyle = "#FF0000";
			ctx.arc(E[i].x, E[i].y, E[i].radius, 0, 2*Math.PI);
			ctx.stroke();
		}
		

	}



	
	/*if(circleIntersect.x!=-1 && circleIntersect.y!=-1)
		document.getElementById("textar").innerHTML =  "x: " + circleIntersect.x + "\n" + "y: " + circleIntersect.y + "\n";
	else
	{
		document.getElementById("textar").innerHTML = "The smoothness is too small";

	}	
*/

	
	return 0;
		
}



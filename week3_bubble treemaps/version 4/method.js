var E = []; //envelope
//var R = []; //contour
var circleOrigin = [];
var circleEnlarge = [];

var circleIntersect;//intersection point of two circles


var turn = 0;//the point index after the last circle in one direction
var m = 5; //contour-structure
var w = 3; //width of contour
var p = 5; //distance of adjacent objects
var d = m + w + p; //d_1 = m_i + w_i + p_i
var s = 20; //smoothness parameter--the radius for tagent arc



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
	c = new circle(190.0,90.0,20.0);
	circleOrigin.push(c);
	c = new circle(220.0,120.0,30.0);
	circleOrigin.push(c);
	c = new circle(250.0,110.0,30.0);
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

//find the circle with the rightmost extent
function rightmostExtent(circleList) {
	circleList.sort(function(a,b){return (b.x+b.radius) - (a.x+a.radius)});
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


	circleIntersect.x = -1;
	circleIntersect.y = -1;


	//排除无交点情况
	/*if(loopDirection == 0 && (circle1.x + circle1.radius < circle2.x - circle2.radius))
		return 0;
	else if(loopDirection == 1 && (circle1.x - circle1.radius > circle2.x + circle2.radius))
		return 0;
	else */

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

		if(circleIntersect.x == -1 || circleIntersect.y ==-1)
			break;
		
		angleCur = 180 / Math.PI * Math.atan((circleIntersect.y - circleList[cLeft].y) / (circleIntersect.x - circleList[cLeft].x));
		
		if(angleCur <= 0)
		{
			//第一象限
			if(circleIntersect.y - circleList[cLeft].y < 0)
			{
				angleCur = Math.abs(angleCur);
			}
						
		}
		else if(angleCur >0)
		{
			//第二象限
			if((circleIntersect.y - circleList[cLeft].y < 0) && (circleIntersect.x - circleList[cLeft].x < 0))
			{
				angleCur = 180 - Math.abs(angleCur);
			}

			//第四象限
			if((circleIntersect.y - circleList[cLeft].y > 0) && (circleIntersect.x - circleList[cLeft].x > 0))
			{
				angleCur = Math.abs(angleCur);
			}

		}
		
		
		if(angleCur > angleMax)
		{
			flag = i;
			pointIntersect.x = circleIntersect.x;
			pointIntersect.y = circleIntersect.y;
			angleMax = angleCur;
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



//find the rightmost intersection of one circle cLeft
function rightmostIntersection(cLeft, circleList)
{
	var angleMax = 0;
	var angleCur = 0;
	var flag = 0;
	var pointIntersect = new circle(0,0,0);

	for(var i=cLeft+1; i<circleList.length; i++)
	{

		intersection(circleList[cLeft], circleList[i], 1);
		if(circleIntersect.x == -1 || circleIntersect.y == -1)
			break;

		angleCur = 180 / Math.PI * Math.atan((circleIntersect.y - circleList[cLeft].y) / (circleIntersect.x - circleList[cLeft].x));

		if(angleCur <= 0)
		{
			//第三象限
			if(circleIntersect.x - circleList[cLeft].x < 0)
			{
				angleCur = Math.abs(angleCur);
			}
			
		}
		else if(angleCur >0)
		{
			//第二象限
			if((circleIntersect.y - circleList[cLeft].y < 0) && (circleIntersect.x - circleList[cLeft].x < 0))
			{
				angleCur = Math.abs(angleCur);
			}

			//第四象限
			if((circleIntersect.y - circleList[cLeft].y > 0) && (circleIntersect.x - circleList[cLeft].x > 0))
			{
				angleCur = 180 - Math.abs(angleCur);
			}

		}

		if(angleCur > angleMax)
		{
			flag = i;
			pointIntersect.x = circleIntersect.x;
			pointIntersect.y = circleIntersect.y;
			angleMax = angleCur;
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


//calculate all envelopes of circles and intersection points
function envelope()
{

	circleIntersect = new circle(-1, -1, 0);
	var eLength;
	enlarge(circleOrigin);

	var curLeft = 0;//the index of current point
	leftmostExtent(circleEnlarge);
	E.push(circleEnlarge[0]);
	do{
		eLength = E.length;
		curLeft= leftmostIntersection(curLeft, circleEnlarge);
	}while(eLength < E.length && curLeft != 0 )

	turn = E.length;


	var curRight = 0;//the index of current point
	rightmostExtent(circleEnlarge);
	//E.push(circleEnlarge[0]);
	do{
		eLength = E.length;
		curRight= rightmostIntersection(curRight, circleEnlarge);
	}while(eLength < E.length && curRight != 0 )

	return 0;
}



//calculate all contours of circle and smoothness
function contour()
{
	//将交点坐标替换成smoothness圆
	var a1,b1,r1;
	var a2,b2,r2;
	var t,k,delta;
	var a,b,c;
	var x1,x2,y1,y2;
	for(var i=1; i<E.length-1; i=i+2)
	{
		
		a1 = E[i-1].x;
		b1 = E[i-1].y;
		r1 = E[i-1].radius;
		a2 = E[i+1].x;
		b2 = E[i+1].y;
		r2 = E[i+1].radius;
		t = (b2 - b1) / (a1 - a2);
		k = (Math.pow(r2+s,2) - Math.pow(r1+s,2)-Math.pow(a2,2)+Math.pow(a1,2)-Math.pow(b2,2)+Math.pow(b1,2))/(2*(a1-a2));
		a = t*t + 1;
		b = 2*t*k - 2*t*a1 - 2*b1;
		c = Math.pow((k-a1),2) + Math.pow(b1,2) - Math.pow((r1+s),2);
		delta = b*b - 4*a*c;

		y1 = (-b + Math.sqrt(delta))/(2*a);
		y2 = (-b - Math.sqrt(delta))/(2*a);
		x1 = t*y1 + k;
		x2 = t*y2 + k;

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

			if(i<turn)
			{
				E[i].x = x1;
				E[i].y = y1;
				E[i].radius = s;
			}
			else
			{
				E[i].x = x2;
				E[i].y = y2;
				E[i].radius = s;
			}
			
		}

	}


	/*
	//计算所有外轮廓圆的切点，并将所有元素加入到R list中
	var cMid = new circle(E[0].x, E[0].y, E[0].radius);
	R.push(cMid);
	for(var i=1; i<E.length; i++)
	{
		if(i<turn)
			intersection(E[i-1], E[i], 0);
		else
			intersection(E[i], E[i-1], 1);
		cMid = new circle(circleIntersect.x, circleIntersect.y, 0);
		R.push(cMid);
		cMid = new circle(E[i].x, E[i].y, E[i].radius);
		R.push(cMid);

	}
    */

	return 0;

}





//从网页中加载参数项
function loadFromForm()
{
	var sMin = 0;//当前s最大值
	var sCur = 0;//当前s值
	var pD = 0;//两圆的圆心距
	var a1,b1,r1;
	var a2,b2,r2;

	var ip = document.getElementById("m");
	m = parseInt(ip.value);
	document.getElementById("textar").innerHTML += "m is: " + m + "\n";

	var ip = document.getElementById("w");
	w = parseInt(ip.value);
	document.getElementById("textar").innerHTML += "w is: " + w + "\n";

	var ip = document.getElementById("p");
	p = parseInt(ip.value);
	document.getElementById("textar").innerHTML += "p is: " + p + "\n";

	var ip = document.getElementById("s");
	sMin = parseInt(ip.value);
	document.getElementById("textar").innerHTML += "s is: " + sMin + "\n";

	d = m + w+ p;
	document.getElementById("textar").innerHTML += "d is: " + d + "\n";

	/*s = 0;
	circleIntersect = new circle(-1, -1, 0);
	
	leftmostExtent(circleOrigin);
	for(var i=0; i<circleOrigin.length-1; i++)
	{
		document.getElementById("textar").innerHTML += "Now is in i: " + i + "\n";
		for(var j=i+1; j<circleOrigin.length; j++)
			{
				document.getElementById("textar").innerHTML += "Now is in j: " + j + "\n";
				intersection(circleOrigin[i],circleOrigin[j],0);
				if(circleIntersect.x == -1 || circleIntersect.y == -1)
					break;
				else
				{
					a1 = circleOrigin[i].x;
					b1 = circleOrigin[i].y;
					r1 = circleOrigin[i].radius;
					a2 = circleOrigin[j].x;
					b2 = circleOrigin[j].y;
					r2 = circleOrigin[j].radius;

					pD = Math.pow(a2-a1,2) + Math.pow(b2-b1,2);
					sCur = Math.pow(r1,2) - Math.pow((r1*r1-r2*r2+pD),2)/(4*pD);

					document.getElementById("textar").innerHTML += "sCur is " + sCur + "\n";

					if(sCur > sMin)
						sMin = sCur;
				}

			}
	}*/

	s = sMin;
	//document.getElementById("textar").innerHTML += "s is " + s + "\n";

	return 0;
}







//draw the final circle 
function draw(canId){

	E = []; //envelope

	circleOrigin = [];
	circleEnlarge = [];

	

	turn = 0;
	initial();
	loadFromForm();
	envelope();
	contour();

	var context = document.getElementById(canId);
	var ctx = context.getContext("2d");
	ctx.clearRect(0, 0, 1000, 500); 

	ctx.setLineDash([]);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000000";

	for(var i = 0; i<circleOrigin.length; i++){
		ctx.beginPath();
		
		ctx.arc(circleOrigin[i].x, circleOrigin[i].y, circleOrigin[i].radius, 0, 2*Math.PI);
		ctx.stroke();

	}


	ctx.lineWidth = w;


/*
	//画出所有的圆
	for(var i=1; i<R.length; i++)
	{

		//var startPoint, endPoint;
		ctx.setLineDash([10,5]);
		//画点
		if(R[i].radius == 0)
		{
			ctx.beginPath();
			ctx.fillStyle = "#FF0000";
			ctx.arc(R[i].x, R[i].y, 3, 0, 2*Math.PI);
			ctx.fill();
		}
		//画弧
		else if(R[i].radius >0)
		{
			
				ctx.beginPath();
				ctx.strokeStyle = "#FF0000";
				ctx.arc(R[i].x, R[i].y, R[i].radius, 0, 2*Math.PI);
				ctx.stroke();
			
			

			
		}

	}

*/




	/*for(var i = 0; i<circleEnlarge.length; i++){
		//ctx.setLineDash([]);
		ctx.setLineDash([10,5]);
		ctx.beginPath();
		ctx.strokeStyle = "#0000FF";
		ctx.arc(circleEnlarge[i].x, circleEnlarge[i].y, circleEnlarge[i].radius, 0, 2*Math.PI);
		ctx.stroke();

	}*/



	/*//前半圈为红色虚线
	for(var i = 0; i<turn; i++){
		ctx.setLineDash([10,5]);
		if(E[i].radius == 0)
		{
			ctx.beginPath();
			ctx.fillStyle = "#FF0000";
			ctx.arc(E[i].x, E[i].y, 3, 0, 2*Math.PI);
			ctx.fill();
		}
		else if(E[i].radius >0)
		{
			ctx.beginPath();
			ctx.strokeStyle = "#FF0000";
			ctx.arc(E[i].x, E[i].y, E[i].radius, 0, 2*Math.PI);
			ctx.stroke();
		}
	}


	//后半圈为蓝色虚线
	for(var i = turn; i<E.length; i++){
		ctx.setLineDash([5,5]);
		if(E[i].radius == 0)
		{
			ctx.beginPath();
			ctx.fillStyle = "#0000FF";
			ctx.arc(E[i].x, E[i].y, 3, 0, 2*Math.PI);
			ctx.fill();
		}
		else if(E[i].radius >0)
		{
			ctx.beginPath();
			ctx.strokeStyle = "#0000FF";
			ctx.arc(E[i].x, E[i].y, E[i].radius, 0, 2*Math.PI);
			ctx.stroke();
		}
		

	}*/



	//只画轮廓和交点
	for(var i=1; i<E.length-1; i++)
	{

		var startPoint, endPoint;
		ctx.setLineDash([10,5]);
		
		startPoint = Math.atan( (E[i-1].y - E[i].y) / (E[i-1].x - E[i].x) );
		if(startPoint < 0)
		{
			//第一象限
			if((E[i-1].y - E[i].y)<0)
			{
				startPoint = 2 * Math.PI - Math.abs(startPoint);
			}
			//第三象限
			else if((E[i-1].x - E[i].x)<0)
			{
				startPoint = Math.PI - Math.abs(startPoint);
			}
			
		}
		else
		{
			//第二象限
			if((E[i-1].x - E[i].x)<0 && (E[i-1].y - E[i].y)<0)
			{
				startPoint = Math.PI + Math.abs(startPoint);
			}
			//第四象限
			else
			{
				startPoint = Math.abs(startPoint);
			}
		}

		endPoint = Math.atan( (E[i+1].y - E[i].y) / (E[i+1].x - E[i].x) );
		if(endPoint < 0)
		{
			//第一象限
			if((E[i+1].y - E[i].y)<0)
			{
				endPoint = 2 * Math.PI - Math.abs(endPoint);
			}
			//第三象限
			else if((E[i+1].x - E[i].x)<0)
			{
				endPoint = Math.PI - Math.abs(endPoint);
			}

		}
		else
		{
			//第二象限
			if((E[i+1].x - E[i].x)<0 && (E[i+1].y - E[i].y)<0)
			{
				endPoint = Math.PI + Math.abs(endPoint);
			}
			//第四象限
			else
			{
				endPoint = Math.abs(endPoint);
			}
		}


		if(i%2 ==0)
		{
			ctx.beginPath();
			ctx.strokeStyle = "#FF0000";
			ctx.arc(E[i].x, E[i].y, E[i].radius, startPoint, endPoint);
			ctx.stroke();
		}
		else
		{
			ctx.beginPath();
			ctx.strokeStyle = "#FF0000";
			ctx.arc(E[i].x, E[i].y, E[i].radius, endPoint, startPoint);
			ctx.stroke();
		}
						
	}



	//画出第一个点的弧
	var startPoint = Math.atan( (E[E.length-2].y - E[0].y) / (E[E.length-2].x - E[0].x) );
	if(startPoint < 0)
	{
		//第一象限
		if((E[E.length-2].y - E[0].y)<0)
		{
			startPoint = 2 * Math.PI - Math.abs(startPoint);
		}
		//第三象限
		else if((E[E.length-2].x - E[0].x)<0)
		{
			startPoint = Math.PI - Math.abs(startPoint);
		}
		
	}
	else
	{
		//第二象限
		if((E[E.length-2].x - E[0].x)<0 && (E[E.length-2].y - E[0].y)<0)
		{
			startPoint = Math.PI + Math.abs(startPoint);
		}
		//第四象限
		else
		{
			startPoint = Math.abs(startPoint);
		}
	}

	var endPoint = Math.atan( (E[1].y - E[0].y) / (E[1].x - E[0].x) );
	if(endPoint < 0)
	{
		//第一象限
		if((E[1].y - E[0].y)<0)
		{
			endPoint = 2 * Math.PI - Math.abs(endPoint);
		}
		//第三象限
		else if((E[1].x - E[0].x)<0)
		{
			endPoint = Math.PI - Math.abs(endPoint);
		}

	}
	else
	{
		//第二象限
		if((E[1].x - E[0].x)<0 && (E[1].y - E[0].y)<0)
		{
			endPoint = Math.PI + Math.abs(endPoint);
		}
		//第四象限
		else
		{
			endPoint = Math.abs(endPoint);
		}
	}

	ctx.beginPath();
	ctx.strokeStyle = "#FF0000";
	ctx.arc(E[0].x, E[0].y, E[0].radius, startPoint, endPoint);
	ctx.stroke();


	
	return 0;
		
}







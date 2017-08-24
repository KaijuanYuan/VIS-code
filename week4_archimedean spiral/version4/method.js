var Attribute = []; //属性类别
var T = []; //属性面积
var AttriNo = 3; //属性个数

var a = 0.0;//parameter in spiral
var b = 1.0;//parameter in spiral
var k = 11;//螺线边斥力系数

var centerR = 300;//大圆半径
var centerX = 400;//大圆圆心
var centerY = 400;//大圆圆心
var threshold = 0.001;//最小移动量
var repulsParam = 2;//相互作用力斥力系数




//develop the object of circle
function circle(xV, yV, radiusV) 
{
	this.x = xV;
	this.y = yV;
	this.radius = radiusV;
}


//develop the object of vector
function vector(ang, forc)
{
	this.angle = ang;
	this.force = forc;
}


function initial()
{
	//初始化螺线函数
	for(var i=0;i<=AttriNo;i++)
	{
		var ti = -i*360.0 / AttriNo;
		T.push(ti);
	}

	//初始化属性值体
	for(var i=0;i<AttriNo;i++)
	{
		var AI = [];
		var ri = 10;
		var xita = (ri-a)/b-1/2*(T[i]+T[i+1]);
		
		for(var j=0;j<20;j++)
		{
			if(ri>centerR)
				ri = centerR-5;
			var x0 = ri * Math.cos(Math.abs(xita*Math.PI/180));
			var y0 = ri * Math.sin(Math.abs(xita*Math.PI/180));
			var attriValue = new circle(x0,y0,2+j*2);
			AI.push(attriValue);

			xita = xita+10;
			ri = a+b*(xita+1/2*(T[i]+T[i+1]));
		}
		Attribute.push(AI);
	}
	return 0;
}


//求两点距离
function calDistance(nodeX, nodeY) 
{
	return Math.sqrt(Math.pow((nodeX.x - nodeY.x ), 2) + Math.pow((nodeX.y - nodeY.y), 2 ));
}


//求两节点相对水平线角度(顺时针)
function getBearingAngle(nodeX, nodeY) 
{
	var difX = nodeY.x - nodeX.x;
	var difY = nodeY.y - nodeX.y;
	var angle = 0;
	if(difX == 0)
	{
		if(difY <0)
			return 270.0;
		else
			return 90.0;
	}
	if(difY == 0)
	{
		if(difX <0)
			return 180.0;
		else
			return 0.0;
	}

	angle = Math.atan(difY / difX) * (180.0 / Math.PI);

	if(angle<0)
	{
		if(difY<0 || difX>0)
			return (360 - Math.abs(angle));
		else
			return (180 - Math.abs(angle));
	}
	else
	{
		if(difX<0 || difY<0)
			return (180 + angle);
		else
			return angle;
	}
	return angle;
}


//求螺线边对点斥力
function calBoundForce(nodeX, tNo, direction) 
{
	var cx,cy;
	var Fx,Fy;
	var rp,rs,ru;
	var xita,point;
	var angl,forc;
	var cenPoint = new circle(0,0,0);

	cx = nodeX.x;
	cy = nodeX.y;	
	xita = getBearingAngle(cenPoint, nodeX);
	
	while(tNo < 0)
		tNo = tNo + AttriNo;
	//tNo = tNo % AttriNo;

	
 	if(direction == 0)
 	{
 		rp = calDistance(cenPoint,nodeX);
		rs = a+b*(xita+T[tNo]);
		ru = a+b*(xita+T[tNo+1]);
		if(rs<0)
		{
			xita = xita + 360;
			rs = a+b*(xita+T[tNo]);
			ru = a+b*(xita+T[tNo+1]);
		}
	 
	 	if(rp>(rs-nodeX.radius))
	 	{
	 		Fx = (rs-nodeX.radius) * Math.cos(xita*Math.PI/180);
			Fy = (rs-nodeX.radius) * Math.sin(xita*Math.PI/180);
			point = new circle(Fx,Fy,0);
	 		angl = getBearingAngle(nodeX, point);
			forc = rp+nodeX.radius-rs +k;
			//document.getElementById('textar').innerHTML += "1ru " + angl + " " + forc + "\n";

	 	}
	 	else if(rp<(ru+nodeX.radius) && centerR>(ru+2*nodeX.radius) || rp<(rs-nodeX.radius) && xita<((rp-a)/b-T[tNo+1]) )
	 	{
	 		angl = 0;
	 		forc = 0;
	 		//document.getElementById('textar').innerHTML += "2ru " + angl + " " + forc + "\n";
	 		
	 	}
	 	else
	 	{
	 		xitaS = xita+180;
	 		rs = a+b*(xita+T[tNo]);
			ru = a+b*(xita+T[tNo+1]);
			Fx = rs * Math.cos(xita*Math.PI/180);
			Fy = rs * Math.sin(xita*Math.PI/180);
			point = new circle(Fx,Fy,0);
			angl = getBearingAngle(nodeX, point);
			forc = rp + 1/2*(ru+rs) +k;
			//document.getElementById('textar').innerHTML += "3ru " + angl + " " + forc + "\n";

	 	}
	 	
 	}
	else
	{
		rp = calDistance(cenPoint,nodeX);
		rs = a+b*(xita+T[tNo-1]);
		ru = a+b*(xita+T[tNo]);
		if(rs<0)
		{
			xita = xita + 360;
			rs = a+b*(xita+T[tNo-1]);
			ru = a+b*(xita+T[tNo]);
		}
		
	 
	 	if(rp<(ru+nodeX.radius) && centerR>(ru+2*nodeX.radius))
	 	{
	 		Fx = (ru+nodeX.radius) * Math.cos(xita*Math.PI/180);
			Fy = (ru+nodeX.radius) * Math.sin(xita*Math.PI/180);
			point = new circle(Fx,Fy,0);
	 		angl = getBearingAngle(nodeX, point);
			forc = ru+nodeX.radius-rp +k;
			
	 	}
	 	else if(rp>(rs-nodeX.radius))
	 	{
	 		angl = 0;
	 		forc = 0;
	 	}
	 	else
	 	{
	 		angl = 0;
	 		forc = 0;
	 	}
	}

	var vectorCur = new vector(angl, forc);
    return vectorCur;
}


//求圆边对点斥力
function calCircleForce(nodeX) 
{
	var cx,cy;
	var d;
	var angl;
	var forc;
	var vectorCur;

	cx = nodeX.x;
	cy = nodeX.y;

	var point = new circle(0,0,0);
	d = calDistance(nodeX,point);
	
	if(d>(centerR-nodeX.radius))
	{
		angl = getBearingAngle(nodeX,point);
		forc = d-centerR+nodeX.radius;
	}
	else
	{
		angl = 0;
		forc = 0;

	}
	vectorCur = new vector(angl, forc);
	
	return vectorCur;
	
}


//求两点相互作用力Y给X的力
function calRepulsionForce(nodeX, nodeY) 
{
	var angl;
	var d;
	var forc;
	var vectorCur;
	
	d = calDistance(nodeX,nodeY);
	if(d>=0 && d<(nodeX.radius + nodeY.radius))
	{
		angl = getBearingAngle(nodeY,nodeX);
		forc = (nodeX.radius + nodeY.radius - d)/repulsParam;
	}
	/*else if(d>(nodeX.radius + nodeY.radius) && d<scope)
	{
		angl = getBearingAngle(nodeX,nodeY);
		forc = (d - nodeX.radius - nodeY.radius)/attractParam;
	}*/
	else
	{
		angl = 0;
		forc = 0;
	}
	vectorCur = new vector(angl, forc);
	
    return vectorCur;
}


//求两力之和
function fAdd(vectorX, vectorY)
{
	var vectorF = new vector(0,0);
	var aX = vectorX.force * Math.cos((Math.PI / 180.0) * vectorX.angle);
	var aY = vectorX.force * Math.sin((Math.PI / 180.0) * vectorX.angle);
	var bX = vectorY.force * Math.cos((Math.PI / 180.0) * vectorY.angle);
	var bY = vectorY.force * Math.sin((Math.PI / 180.0) * vectorY.angle);
	aX = aX + bX;
	aY = aY + bY;
	var nodeStart = new circle(0,0,0);
	var nodeEnd = new circle(aX,aY,0);
	vectorF.angle = getBearingAngle(nodeStart, nodeEnd);
	vectorF.force = calDistance(nodeStart, nodeEnd);
	
	return vectorF;
}


function moveTo(nodeX,vectorX)
{
	var nodeY = new circle(0,0,nodeX.radius);
	nodeY.x = nodeX.x + vectorX.force * Math.cos(vectorX.angle *Math.PI/180);
	nodeY.y = nodeX.y + vectorX.force * Math.sin(vectorX.angle *Math.PI/180);
	return nodeY;
}


//更新位置
function updatePos(canId,valueList,biases,i)
{
	
	var totalDisplacement = 0;
	var nextPos = [];//节点的下一移动位置
	for(var j=0;j<valueList[i].length;j++)
	{

		var curForce = new vector(0,0);		
		var upForce = calBoundForce(valueList[i][j],i+1,1);
		var downForce = calBoundForce(valueList[i][j],i,0);
		var circleForce = calCircleForce(valueList[i][j]);
		curForce = fAdd(curForce,upForce);
		curForce = fAdd(curForce,downForce);
		curForce = fAdd(curForce,circleForce);

		for(var g=0;g<valueList[i].length;g++)
		{
			if(g==j)
				continue;
			var repulsionForce = calRepulsionForce(valueList[i][j],valueList[i][g]);
			curForce = fAdd(curForce,repulsionForce);

		}

		var nextPoint = moveTo(valueList[i][j],curForce);

		nextPos.push(nextPoint);
		
	}

	for(var j=0;j<valueList[i].length;j++)
	{
		totalDisplacement += calDistance(valueList[i][j],nextPos[j]);
		valueList[i][j].x = nextPos[j].x;
		valueList[i][j].y = nextPos[j].y;
	}

	drawCircles(canId, valueList);
	drawSpirals(canId,biases);

	if(totalDisplacement>threshold)
		requestAnimationFrame(function(){updatePos(canId,valueList,biases,i);});
	

	return 0;

}


//Draw List circles in canId
function drawCircles(canId, circles)
{
	var context = document.getElementById(canId);
	var ctx = context.getContext("2d");
	ctx.clearRect(0, 0, 1000, 800); 
	for(var i=2; i<3; i++)
	{		
		for(var j=0;j<circles[i].length;j++)
		{
			ctx.beginPath();
			ctx.strokeStyle="#3200FF";
			ctx.arc(circles[i][j].x+centerX,circles[i][j].y+centerY,circles[i][j].radius,0,2*Math.PI);
			ctx.stroke();
		}
	}

	return 0;

}


//Draw spirals with biases in canId
function drawSpirals(canId,biases)
{
	var context = document.getElementById(canId);
	var ctx = context.getContext("2d");
	//ctx.clearRect(0, 0, 1000, 800); 

	var angle = 0;//当前螺线段角度
	var currentR = 0;//当前螺线段半径
	var currentX = 0;//当前螺线点的x坐标
	var currentY = 0;//当前螺线点的y坐标
	var delta = 7;//螺线段每次增加的角度
		
	//画出大圆
	ctx.beginPath();
	ctx.strokeStyle="rgb(50,0,255)";
	ctx.arc(centerX, centerY, centerR, 0, 2*Math.PI);
	ctx.stroke();

	//画出螺线
	for(var i=0; i<AttriNo; i++)
	{
		//document.getElementById('textar').innerHTML += "Now is drawing spiral " + i + "\n";
		var spiralElements = [];
		var point;
		angle = -a/b -biases[i];
		currentR = a + b*(angle + biases[i]);
		while(currentR<=centerR)
		{	
			currentX = currentR * Math.cos(angle*Math.PI/180) + centerX;
			currentY = currentR * Math.sin(angle*Math.PI/180) + centerY;
			point = new circle(currentX, currentY, 0);
			spiralElements.push(point);
			angle = angle + delta;
			currentR = a + b*(angle + biases[i]);
			
		}

		if(i==0)
			ctx.strokeStyle="#FF0000";
		else
			ctx.strokeStyle="#0000FF";
		for(var j=0;j<spiralElements.length-1;j++)
		{
			ctx.beginPath();			
			ctx.moveTo(spiralElements[j].x, spiralElements[j].y);
			ctx.lineTo(spiralElements[j+1].x,spiralElements[j+1].y);
			ctx.stroke();
		}
	}

}


//draw the final circle 
function draw(canId){
	Attribute = []; //属性类别
	T = []; //属性面积

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	var context = document.getElementById(canId);
	var ctx = context.getContext("2d");
	ctx.clearRect(0, 0, 1000, 800); 
	
	initial();	

	/*drawCircles(canId, Attribute);
	drawSpirals(canId, T);
*/
	for(var i=0;i<Attribute.length;i++)
	{
		updatePos(canId,Attribute,T,i);
	}

	return 0;
		
}

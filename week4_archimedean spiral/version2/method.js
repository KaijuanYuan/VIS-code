var A = []; //属性类别
var T = []; //属性面积
var AttriNo = 3; //属性个数

var a = 0.0;//parameter in spiral
var b = 1.0;//parameter in spiral
var k = 8;//斥力系数
var kRepuls = 10;//两点间斥力//
var kAttract = 90;//两点间引力

var R = 300;//大圆半径
var centerX = 400;//大圆圆心
var centerY = 400;//大圆圆心
var threshold = 0.1;//最小移动量
var forceVector = new vector(0,0);


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
		var ti = i*360.0 / AttriNo;
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
			if(ri>R)
				ri = R-5;
			var x0 = ri * Math.cos(xita*Math.PI/180);
			var y0 = ri * Math.sin(xita*Math.PI/180);
			var attriValue = new circle(x0,y0,2+j*2);
			AI.push(attriValue);

			xita = xita+10;
			ri = a+b*(xita+1/2*(T[i]+T[i+1]));
		}
		A.push(AI);
	}
	return 0;
}


//求两点距离
function calDistance(nodeX, nodeY) 
{
	return Math.sqrt(Math.pow((nodeX.x - nodeY.x ), 2) + Math.pow((nodeX.y - nodeY.y), 2 ));
}


//求两节点相对水平线角度
function getBearingAngle(nodeX, nodeY) 
{
	var difX = nodeY.x - nodeX.x;
	var difY = nodeY.y - nodeX.y;
	var angle = 0;
	if(difX == 0)
	{
		if(difY <0)
			return 90.0;
		else
			return 270.0;
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
		if(difY<0)
			return (180 - Math.abs(angle));
		else
			return (360 - Math.abs(angle));
	}
	else
	{
		if(difX<0)
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
	var xita,rs;
	var angl;
	var d,ri,ru;
	var forc;
	var vectorCur;

	cx = nodeX.x;
	cy = nodeX.y;
	var cenPoint = new circle(0,0,0);
	xita = getBearingAngle(cenPoint, nodeX);
	ri = calDistance(cenPoint,nodeX);//nodeX与圆心的距离
	tNo = tNo % AttriNo;
	rs = a + b * (xita + T[tNo]);//螺线点与圆心的距离
	Fx = rs * Math.cos(xita*Math.PI/180);
	Fy = rs * Math.sin(xita*Math.PI/180);
	var point = new circle(Fx,Fy,0);//螺线点坐标

	if(rs > (R-nodeX.radius))
	{
		angl = 0;
		forc = 0;
	}	
	//下边界的施力情况
	else if(direction == 0)
	{
		ru = a + b * (xita + T[(tNo+1)%AttriNo]);//上螺线点与圆心的距离
		//外侧引力
		if(ri<(rs+nodeX.radius+3))
		{
			angl = getBearingAngle(nodeX, point);
			forc = rs+nodeX.radius+3-ri;
		}
		//内测引力
		else if(ri>(ru-nodeX.radius-3))
		{
			angl = getBearingAngle(nodeX, point);
			forc = ri - ru + nodeX.radius + 3;
		}
		else
		{
			angl = 0;
			forc = 0;
		}
	}
	//上边界的施力情况
	else
	{
		ru = a + b * (xita + T[(tNo-1)%AttriNo]);//下螺线点与圆心的距离
		//外侧引力
		if(ri>(rs-nodeX.radius-3))
		{
			angl = getBearingAngle(nodeX, point);
			forc = ri-rs+nodeX.radius+3;
		}
		//内测引力
		else if(ri<(ru+nodeX.radius+3))
		{
			angl = getBearingAngle(nodeX, point);
			forc = ru+nodeX.radius+3-ri;
		}
		else
		{
			angl = 0;
			forc = 0;
		}
	}

	

	vectorCur = new vector(angl, forc);

    return vectorCur;
}


//求圆边对点斥力
function calCircleForce(nodeX) 
{
	var cx,cy;
	var angl;
	var d;
	var forc;
	var vectorCur;
	
	cx = nodeX.x;
	cy = nodeX.y;

	var point = new circle(0,0,0);
	
	d = calDistance(nodeX,point);
	
	/*
	if(d<=10)
	{
		if(d<1)
			d = 1;
		angl = getBearingAngle(point, nodeX);
		forc = kRepuls/d;
	}
		
	else 
	*/

	if(d>=(R-nodeX.radius-3))
	{
		angl = getBearingAngle(nodeX, point);
		
		forc = d - R + nodeX.radius + 3;
		
	}
	else
	{
		angl = 0;
		
		forc = 0;
		
	}

	

	
	vectorCur = new vector(angl, forc);

    return vectorCur;
}


//求两点斥力Y给X的力
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
		forc = (nodeX.radius + nodeY.radius - d);
	}
		
	/*else if(d>=(nodeX.radius + nodeY.radius) && d<kAttract)
	{
		angl = getBearingAngle(nodeX,nodeY);
		//forc = (d - nodeX.radius - nodeY.radius)*Math.max(nodeX.radius,nodeY.radius)/R;
		forc = (d - nodeX.radius - nodeY.radius)*d/R;
	}*/
	else
	{
		angl = 0;
		forc = 0;
	}
		

	/*if(d<nodeX.radius+ nodeY.radius)
		forc = forc + nodeX.radius+ nodeY.radius - d +15;*/
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
	aX += bX;
	aY += bY;
	var nodeStart = new circle(0,0,0);
	var nodeEnd = new circle(aX,aY,0);
	vectorF.angle = getBearingAngle(nodeStart, nodeEnd);
	vectorF.force = Math.sqrt(Math.pow(aX,2) + Math.pow(aY,2));
	
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
function updatePos(valueList)
{
	var totalDisplacement;


	//for(var i=0;i<valueList.length;i++)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	for(var i=0;i<1;i++)
	{
		var nextPos = [];//节点的下一移动位置
		var count = 0;
		var maxCount = 30;
		do{
			
			totalDisplacement = 0;
			nextPos = [];
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
						break;

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

			miniDraw();

		}while(totalDisplacement > threshold)
		
	}
	
	return 0;

}


function miniDraw()
{
	var context = document.getElementById("myCanvas");
	var ctx = context.getContext("2d");
	ctx.clearRect(0, 0, 1000, 800); 

	var angle = 0;//当前螺线段角度
	var currentR = 0;//当前螺线段半径
	var currentX = 0;//当前螺线点的x坐标
	var currentY = 0;//当前螺线点的y坐标
	var delta = 7;//螺线段每次增加的角度
	
	
	
	//画出大圆
	ctx.beginPath();
	ctx.strokeStyle="#FF0000";
	ctx.arc(centerX, centerY, R, 0, 2*Math.PI);
	ctx.stroke();




	//画出螺线
	for(var i=0; i<=AttriNo; i++)
	{
		//document.getElementById("textar").innerHTML += "In loop " + i + "\n";
		var E = [];
		var point;
		angle = -a/b -T[i];
		currentR = a + b*(angle + T[i]);
		while(currentR<=R)
		{	
			currentX = currentR * Math.cos(angle*Math.PI/180) + centerX;
			currentY = currentR * Math.sin(angle*Math.PI/180) + centerY;
			point = new circle(currentX, currentY, 0);
			E.push(point);
			angle = angle + delta;
			currentR = a + b*(angle + T[i]);
			
		}
		for(var j=0;j<E.length-1;j++)
		{
			ctx.beginPath();
			if(i==1)
				ctx.strokeStyle="#FF0000";
			else
				ctx.strokeStyle="#0000FF";
			ctx.moveTo(E[j].x, E[j].y);
			ctx.lineTo(E[j+1].x,E[j+1].y);
			ctx.stroke();
		}

	}


	for(var i=0; i<1; i++)
	{
		
		for(var j=0;j<A[i].length;j++)
		{
			ctx.beginPath();
			ctx.strokeStyle="#FF0000";
			ctx.arc(A[i][j].x+centerX, A[i][j].y+centerY, A[i][j].radius,0,2*Math.PI);
			ctx.stroke();
		}

	}

}


//draw the final circle 
function draw(canId){

	var context = document.getElementById(canId);
	var ctx = context.getContext("2d");
	ctx.clearRect(0, 0, 1000, 800); 

	initial();
	

	
	/*for(var i=0; i<A.length; i++)
	{
		
		for(var j=0;j<A[i].length;j++)
		{
			//document.getElementById("textar").innerHTML += j + " ";
			//document.getElementById("textar").innerHTML += A[i][j].x + " " + A[i][j].y + " " + A[i][j].radius + " \n";
			ctx.beginPath();
			ctx.strokeStyle="#00FF00";
			ctx.arc(A[i][j].x+centerX,A[i][j].y+centerY,A[i][j].radius,0,2*Math.PI);
			ctx.stroke();
		}

	}
	*/


	updatePos(A);

	//setTimeout("alert('Wait a minute')",3000);

	var angle = 0;//当前螺线段角度
	var currentR = 0;//当前螺线段半径
	var currentX = 0;//当前螺线点的x坐标
	var currentY = 0;//当前螺线点的y坐标
	var delta = 7;//螺线段每次增加的角度
	
	
	
	//画出大圆
	ctx.beginPath();
	//ctx.strokeStyle="#FF0000";
	ctx.strokeStyle="rgb(0,255,255)";
	ctx.arc(centerX, centerY, R, 0, 2*Math.PI);
	ctx.stroke();




	//画出螺线
	for(var i=0; i<=AttriNo; i++)
	{
		//document.getElementById("textar").innerHTML += "In loop " + i + "\n";
		var E = [];
		var point;
		angle = -a/b -T[i];
		currentR = a + b*(angle + T[i]);
		while(currentR<=R)
		{	
			currentX = currentR * Math.cos(angle*Math.PI/180) + centerX;
			currentY = currentR * Math.sin(angle*Math.PI/180) + centerY;
			point = new circle(currentX, currentY, 0);
			E.push(point);
			angle = angle + delta;
			currentR = a + b*(angle + T[i]);
			
		}
		for(var j=0;j<E.length-1;j++)
		{
			ctx.beginPath();
			if(i==1)
				ctx.strokeStyle="#FF0000";
			else
				ctx.strokeStyle="#0000FF";
			ctx.moveTo(E[j].x, E[j].y);
			ctx.lineTo(E[j+1].x,E[j+1].y);
			ctx.stroke();
		}

	}


	//for(var i=0; i<A.length; i++)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	/*for(var i=0; i<1; i++)
	{
		
		for(var j=0;j<A[i].length;j++)
		{
			document.getElementById("textar").innerHTML += j + " ";
			document.getElementById("textar").innerHTML += A[i][j].x + " " + A[i][j].y + " " + A[i][j].radius + " \n";
			ctx.beginPath();
			ctx.strokeStyle="#FF0000";
			ctx.arc(A[i][j].x+centerX, A[i][j].y+centerY, A[i][j].radius,0,2*Math.PI);
			ctx.stroke();
		}

	}
*/
	

	return 0;
		
}

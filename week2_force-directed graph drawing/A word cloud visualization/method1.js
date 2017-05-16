
var origin = {spell:"",weight:0,fontSize:0,x:0,y:0,direction:0};
var node1 = {spell:"Hi",weight:10,fontSize:20,x:20,y:100,direction:0};
var node2 = {spell:"Bye",weight:4,fontSize:20,x:15,y:15,direction:0};
var node3 = {spell:"World",weight:7,fontSize:20,x:10,y:10,direction:0};
var node4 = {spell:"Hello",weight:4,fontSize:20,x:10,y:10,direction:0};

var diagram = [node1,node2,node3,node4];
var overlap = [];

var N = 4;

//var c = document.getElementById("myCanvas");
//var ctx = c.getContext("2d");



function makeInitialFont() {
	diagram[0].fontSize = 100;
	var ratio = 100/diagram[0].weight;
	for(var i = 1; i<N; i++) {
		diagram[i].fontSize = Math.round(ratio * diagram[i].weight);
	}
	
	return 0;
}




function intersection(nodePosition) {
	var c2 = document.getElementById("myCanvas");
	var ctx2 = c2.getContext("2d");
	var posA = {x:0,y:0};
	var posB = {x:0,y:0};
	var posC = {x:0,y:0};
	var posD = {x:0,y:0};
	

	if(nodePosition.direction == 0) {
		//document.write("direction" + nodePosition.direction + "\n");
		//ctx.fillStyle = "#333333";
		//ctx.strokeStyle = "blue";

		ctx2.font = nodePosition.fontSize + "px Arial";
		
		if((nodePosition.x + ctx2.measureText(nodePosition.spell).width) > 400) {
			//document.write("boundary 1 \n");
			return 1;
		}
		else if((nodePosition.y - 3/4*nodePosition.fontSize) < 0) {
			//document.write("boundary 2 \n");
			return 1;
		}
		else if(overlap.length > 0) {
			//document.write("test for intersection\n");
			posA.x = nodePosition.x;
			posA.y = nodePosition.y - 3/4*nodePosition.fontSize;
			posB.x = nodePosition.x + ctx2.measureText(nodePosition.spell).width;
			posB.y = nodePosition.y;
			

			for(var i=0; i<overlap.length; i++) {
				document.write("test intersection with node " + i + "</br>");
				posC.x = overlap[i].x;
				posC.y = overlap[i].y;
				posD.x = overlap[i].x + overlap[i].width;
				posD.y = overlap[i].y + overlap[i].height;

				if((posA.x>posC.x)&&(posA.x<posD.x)&&(posA.y>posC.y)&&(posA.y<posD.y))
					return 1;
				else if ((posB.x>posC.x)&&(posB.x<posD.x)&&(posB.y>posC.y)&&(posB.y<posD.y))
					return 1;
			}
			
			return 0;
		}
		else {
			document.write("no intersection\n");
			return 0;
		}
	
	}
	/*else if(nodePosition.direction == 1) {
		//ctx.fillStyle = "#333333";
		//ctx.strokeStyle = "red";
		ctx.font = nodePosition.fontSize + "px Arial";
		if((nodePosition.x + 3/4*nodePosition.fontSize) > 400)
			return 1;
		else if((nodePosition.y + ctx2.measureText(nodePosition.spell).width) > 400) 
			return 1;
		else if(overlap.length!=0) {
			posA.x = nodePosition.x;
			posA.y = nodePosition.y;
			posB.x = nodePosition.x + 3/4*nodePosition.fontSize;
			posB.y = nodePosition.y + ctx2.measureText(nodePosition.spell).width;
			

			for(var i=0; i<overlap.length; i++) {
				posC.x = overlap[i].x;
				posC.y = overlap[i].y;
				posD.x = overlap[i].x + overlap[i].width;
				posD.y = overlap[i].y + overlap[i].height;

				if((posA.x>posC.x)&&(posA.x<posD.x)&&(posA.y>posC.y)&&(posA.y<posD.y))
					return 1;
				else if ((posB.x>posC.x)&&(posB.x<posD.x)&&(posB.y>posC.y)&&(posB.y<posD.y))
					return 1;
			}
		}
		else 
			return 0;
	}*/
	else
		return 0;


}



function makeInitialPosition() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	for(var i = 0; i<1; i++) {
		
		document.write("word" + i + ": " + diagram[i].spell + "</br>");
		
		do{
			diagram[i].x = Math.round(Math.random() * 400);
			diagram[i].y = Math.round(Math.random() * 400);
			document.write("test" + i + ": " + diagram[i].x +" " + diagram[i].y + "\n");

		}while(intersection(diagram[i]));

		document.write(intersection(diagram[i]) + "</br>");

		//horizon word's boundary square:
		ctx.font = diagram[i].fontSize + "px Arial";
		diagram[i].direction = 0;
		var squ = {x:0,y:0,width:0,height:0};
		squ.x = diagram[i].x;
		squ.y = diagram[i].y - 3/4*diagram[i].fontSize;
		squ.width =  ctx.measureText(diagram[i].spell).width;
		squ.height = 3/4*diagram[i].fontSize;
		overlap.push(squ);

		document.write("Position" + diagram[i].x + " " + (diagram[i].y- 3/4*diagram[i].fontSize) + "</br>");
		
	}


	return 0;
} 





function compWeight(a,b) {
	if(a.weight < b.weight)
		return 1;
	else if(a.weight > b.weight)
		return -1;
	else 
		return 0;
}

function compAlphabetic(a,b) {
	if(a.spell < b.spell)
		return 1;
	else if(a.spell > b.spell)
		return -1;
	else 
		return 0;
}



function draw() {

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	//var c2 = document.getElementById("myCanvas2");
	//var ctx2 = c2.getContext("2d");

	ctx.clearRect(0,0,c.width,c.height);
	ctx.clearRect(0,0,c.height,-c.width);

	ctx.fillStyle = "blue";
	ctx.strokeStyle = "blue";
	
	
	//ctx2.clearRect(0,0,c.width,c.height);

	for(var i=0; i<N; i++) {
		if(diagram[i].direction == 0) {
			ctx.fillStyle = "#333333";
			ctx.strokeStyle = "blue";
			ctx.font = diagram[i].fontSize + "px Arial";
			
			ctx.strokeRect(diagram[i].x, diagram[i].y - 3/4*diagram[i].fontSize, ctx.measureText(diagram[i].spell).width, 3/4*diagram[i].fontSize);
			//ctx.strokeRect(diagram[i].x, diagram[i].y, ctx.measureText(diagram[0].spell), diagram[i].fontSize);
			ctx.fillText(diagram[i].spell, diagram[i].x, diagram[i].y);
			//ctx.fillText(ctx.measureText(diagram[0].spell).width, diagram[0].x, diagram[0].y+diagram[0].fontSize);
		
		}

		else if (diagram[i].direction == 1) {
			ctx.save();
			ctx.rotate(90*Math.PI/180);

			ctx.fillStyle = "#333333";
			ctx.strokeStyle = "red";
			ctx.font = diagram[i].fontSize + "px Arial";
			
			ctx.strokeRect(diagram[i].y, -diagram[i].x-3/4*diagram[i].fontSize, ctx.measureText(diagram[i].spell).width, 3/4*diagram[i].fontSize);
			//ctx.strokeRect(diagram[i].x, diagram[i].y, ctx.measureText(diagram[0].spell), diagram[i].fontSize);
			ctx.fillText(diagram[i].spell,diagram[i].y, -diagram[i].x);
			//ctx.fillText(ctx.measureText(diagram[0].spell).width, diagram[0].x, diagram[0].y+diagram[0].fontSize);
			
			ctx.restore();
		}
	}
	

	ctx.strokeRect(10, 20, 20, 10);
	return 0;
}



function layout() {
	
	var position = {x:0, y:10};
	var word = {position:{x:0,y:10}, spell:"Hello", weight:8};
	document.write("position:" + word.position.x + " " + word.position.y + "</br>" + word.spell);
	//diagram.sort(compWeight, compAlphabetic);
	//makeInitialFont();
	//makeInitialPosition();
	//document.write(overlap.length);
	//draw();
	/*diagram.sort(compWeight, compAlphabetic);
	makeInitialFont();

	//document.write(diagram[0].direction + "</br>");
	//document.write(intersection(diagram[0]));
	intersection(diagram[0]);*/
	
	return 0;
}




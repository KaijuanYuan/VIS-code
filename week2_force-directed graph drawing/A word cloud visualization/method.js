
var origin = {spell:"",weight:0,fontSize:0,x:0,y:0,direction:0};
var node1 = {spell:"Hi",weight:10,fontSize:100,x:0,y:0,direction:0};
var node2 = {spell:"Bye",weight:4,fontSize:0,x:0,y:0,direction:0};
var node3 = {spell:"World",weight:7,fontSize:0,x:0,y:0,direction:0};
var node4 = {spell:"Hello",weight:4,fontSize:0,x:0,y:0,direction:0};

var diagram = [node1,node2,node3,node4];
var overlap = [];
var next = [];
var N = 4;




function makeInitialFont() {
	diagram[0].fontSize = 100;
	var ratio = 100/diagram[0].weight;
	for(var i = 1; i<N; i++) {
		diagram[i].fontSize = Math.round(ratio * diagram[i].weight);
	}

	return 0;
}




function makeInitialPositionH() {
	for(var i = 0; i<N; i++) {
		

		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");

		

		ctx.fillStyle = "#333333";
		ctx.strokeStyle = "red";
		ctx.font = diagram[i].fontSize + "px Arial";
		
		
		do{
			diagram[i].x = Math.round(Math.random() * 400);
		}while((diagram[i].x + ctx.measureText(diagram[i].spell).width) > 400);
		do{
			diagram[i].y = Math.round(Math.random() * 400);
		}while((diagram[i].y - 3/4*diagram[i].fontSize) < 0);
		diagram[i].direction = 0;
		
	}


	return 0;
}


function makeInitialPositionV() {
	for(var i = 0; i<N; i++) {
		
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");

		ctx.fillStyle = "#333333";
		ctx.strokeStyle = "red";
		ctx.font = diagram[i].fontSize + "px Arial";
		
		do{
			diagram[i].x = Math.round(Math.random() * 400);
		}while((diagram[i].x + 3/4*diagram[i].fontSize) > 400);
		do{
			diagram[i].y = Math.round(Math.random() * 400);
		}while((diagram[i].y + ctx.measureText(diagram[i].spell).width) > 400);
		diagram[i].direction = 1;
		
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

function layout() {
	
	diagram.sort(compWeight, compAlphabetic);
	makeInitialPosition();
	makeInitialFont();
	/*for(var i = 0; i<N; i++) {
		document.write(innerHTML = i + ": " + diagram[i].spell + " " + diagram[i].x + " " + diagram[i].y + " " + diagram[i].weight + "</br>");
	}*/
	return 0;
}

function draw() {
	diagram.sort(compWeight, compAlphabetic);
	makeInitialPosition();
	makeInitialFont();

	ctx.clearRect(0,0,c.width,c.height);
	
	for(var i=0; i<N; i++) {
		ctx.fillStyle = "#333333";
		ctx.strokeStyle = "blue";
		ctx.font = diagram[i].fontSize + "px Arial";
		
		ctx.strokeRect(diagram[i].x, diagram[i].y - 3/4*diagram[i].fontSize, ctx.measureText(diagram[i].spell).width, 3/4*diagram[i].fontSize);
		//ctx.strokeRect(diagram[i].x, diagram[i].y, ctx.measureText(diagram[0].spell), diagram[i].fontSize);
		ctx.fillText(diagram[i].spell, diagram[i].x, diagram[i].y);
		//ctx.fillText(ctx.measureText(diagram[0].spell).width, diagram[0].x, diagram[0].y+diagram[0].fontSize);
	}
		

	return 0;
}



function drawVertical() {

	diagram.sort(compWeight, compAlphabetic);


	
	makeInitialFont();
	makeInitialPositionH();
	


	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	var c2 = document.getElementById("myCanvas2");
	var ctx2 = c2.getContext("2d");

	ctx.clearRect(0,0,c.width,c.height);
	ctx.clearRect(0,0,c.height,-c.width);

	ctx.fillStyle = "blue";
	ctx.strokeStyle = "blue";
	ctx.font = "100px Arial";
	
	ctx2.clearRect(0,0,c.width,c.height);

	for(var i=0; i<N; i++) {
		ctx2.fillStyle = "#333333";
		ctx2.strokeStyle = "blue";
		ctx2.font = diagram[i].fontSize + "px Arial";
		
		ctx2.strokeRect(diagram[i].x, diagram[i].y - 3/4*diagram[i].fontSize, ctx2.measureText(diagram[i].spell).width, 3/4*diagram[i].fontSize);
		//ctx.strokeRect(diagram[i].x, diagram[i].y, ctx.measureText(diagram[0].spell), diagram[i].fontSize);
		ctx2.fillText(diagram[i].spell, diagram[i].x, diagram[i].y);
		//ctx.fillText(ctx.measureText(diagram[0].spell).width, diagram[0].x, diagram[0].y+diagram[0].fontSize);
	}
	
	makeInitialPositionV();
	ctx.save();
	ctx.rotate(90*Math.PI/180);

	for(var i=0; i<N; i++) {
		ctx.fillStyle = "#333333";
		ctx.strokeStyle = "red";
		ctx.font = diagram[i].fontSize + "px Arial";
		
		ctx.strokeRect(diagram[i].y, -diagram[i].x-3/4*diagram[i].fontSize, ctx.measureText(diagram[i].spell).width, 3/4*diagram[i].fontSize);
		//ctx.strokeRect(diagram[i].x, diagram[i].y, ctx.measureText(diagram[0].spell), diagram[i].fontSize);
		ctx.fillText(diagram[i].spell,diagram[i].y, -diagram[i].x);
		//ctx.fillText(ctx.measureText(diagram[0].spell).width, diagram[0].x, diagram[0].y+diagram[0].fontSize);
	}


	ctx.restore();

	for(var i=0;i<N;i++) {
		var squ = {x:0,y:0,wid:0,hei:0};
		if(diagram[i].direction == 0) {
			squ.x = diagram[i].x;
			squ.y = diagram[i].y - 3/4*diagram[i].fontSize;
			ctx.font = diagram[i].fontSize + "px Arial";
			squ.wid = ctx.measureText(diagram[i].spell).width;
			squ.hei = 3/4*diagram[i].fontSize;
			overlap.push(squ);
		}
		else if(diagram[i].direction == 1) {
			squ.x = diagram[i].x + 3/4*diagram[i].fontSize;
			squ.y = diagram[i].y;
			ctx.font = diagram[i].fontSize + "px Arial";
			squ.wid = ctx.measureText(diagram[i].spell).width;
			squ.hei = 3/4*diagram[i].fontSize;
			overlap.push(squ);
		}
		
	}
	

	ctx.strokeRect(10, 20, 20, 10);
	return 0;
}






/*

function test() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	
	var c2 = document.getElementById("myCanvas2");
	var ctx2 = c2.getContext("2d");

	ctx.clearRect(0,0,c.width,c.height);
	ctx.clearRect(0,0,c.height,-c.width);

	ctx.fillStyle = "blue";
	ctx.strokeStyle = "blue";
	ctx.font = "100px Arial";
	ctx.fillText("Chenwei", 10, 30);
	ctx.strokeRect(10, 30 - 3/4*100, ctx.measureText("Chenwei").width, 3/4*100);

	ctx.save();
	ctx.rotate(90*Math.PI/180);

	
	ctx.fillStyle = "red";
	ctx.strokeStyle = "red";
	ctx.font = "100px Arial";
	ctx.fillText("Chenwei", 30, -10);
	ctx.strokeRect(30 - 3/4*100 + 3/4*100, -10-3/4*100, ctx.measureText("Chenwei").width, 3/4*100);
	ctx.restore();
}*/
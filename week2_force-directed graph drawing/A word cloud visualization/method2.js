//This is the alphabetic order algorithm for layout, the final figure will range the words in their alphabetical order.

var node1 = {spell:"Hi",weight:10,fontSize:20,x:20,y:100,direction:0,width:0,height:0};
var node2 = {spell:"Bye",weight:4,fontSize:20,x:15,y:15,direction:0,width:0,height:0};
var node3 = {spell:"World",weight:7,fontSize:20,x:10,y:10,direction:0,width:0,height:0};
var node4 = {spell:"Hello",weight:4,fontSize:20,x:10,y:10,direction:0,width:0,height:0};

//var diagram = [node1,node2,node3,node4];
var diagram = [];
var overlap = [];

var N = 4;

var winWidth = 400;
var winHeight = 400;
var midLine = winHeight / 2;
var rightBoundary = 0;

var updateDirection = 0;


function compWeight(a,b) {
	if(a.weight < b.weight)
		return 1;
	else if(a.weight > b.weight)
		return -1;
	else 
		return 0;
}

function compAlphabetic(a,b) {
	if(a.spell > b.spell)
		return 1;
	else if(a.spell < b.spell)
		return -1;
	else 
		return 0;
}

//生成等比例字号
function makeInitialFont() {
	diagram.sort(compWeight, compAlphabetic);
	diagram[0].fontSize = 100;
	var ratio = 100/diagram[0].weight;
	for(var i = 1; i<N; i++) {
		diagram[i].fontSize = Math.round(ratio * diagram[i].weight);

	}


	
	return 0;
}



//生成随机坐标并计算其横向长宽
function makeInitialPosition(word) {
	
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	//diagram[i].x = Math.round(Math.random() * 400);
	//diagram[i].y = Math.round(Math.random() * 400);
	word.x = rightBoundary;
	word.y = midLine;
	//rightBoundary要加

	word.direction = 0;

	ctx.font = word.fontSize + "px Arial";
	word.width =  ctx.measureText(word.spell).width;
	word.height = 9/10*word.fontSize;


	//if(word.weight == 1 )
	//	document.write(word.width + " " + word.height + "<br />");

	//document.getElementById("textar").innerHTML += "word " + word.spell + ": x:" + word.x + " y:" + word.y; 



	return 0;
} 



function intersection(word) {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.font = word.fontSize + "px Arial";
	var posA = {x:0,y:0};
	var posB = {x:0,y:0};
	var posC = {x:0,y:0};
	var posD = {x:0,y:0};
	
	if((word.width)*(word.height) <= 23){
		if(word.direction == 0) {
			var imgData = ctx.getImageData(word.x, word.y, word.width, word.height);
			for(var i=0;i<imgData.data.length;i+=4) {
				if((imdData.data[i] == 51) || (imdData.data[i+1] == 51) || imdData.data[i+2] == 51 || imdData.data[i+3] == 51 )
					return 1;
				
			}
			return 0;
		}
		else if(word.direction == 1) {
			var imgData = ctx.getImageData(word.x, word.y, word.height, word.width);
			for(var i=0;i<imgData.data.length;i+=4) {
				if((imdData.data[i] == 51) || (imdData.data[i+1] == 51) || imdData.data[i+2] == 51 || imdData.data[i+3] == 51 )
					return 1;
				
			}
			return 0;
		}
		
	}



	if(word.direction == 0) {
		
		if(word.x <0) {
			word.x =0;
			
		}		
		else if((word.x + ctx.measureText(word.spell).width) > winWidth) {
			word.x = (winWidth - ctx.measureText(word.spell).width);
			
		}

		if(word.y < 0) {
			//document.write("boundary 2 \n");
			word.y = 0;
		}
		else if((word.y +  9/10*word.fontSize) > winHeight) {
			word.y = winHeight -  9/10*word.fontSize;
		}
		
                                                       
		if(overlap.length > 0) {
			//document.write("test for intersection\n");
			posA.x = word.x;
			posA.y = word.y;
			posB.x = word.x + ctx.measureText(word.spell).width;
			posB.y = word.y +  9/10*word.fontSize;
			

			for(var i=0; i<overlap.length; i++) {
				//document.write("test intersection with node " + i + "</br>");
				posC.x = overlap[i].x;
				posC.y = overlap[i].y;
				if(overlap[i].direction ==0) {
					posD.x = overlap[i].x + overlap[i].width;
					posD.y = overlap[i].y + overlap[i].height;
				}
				else {
					posD.x = overlap[i].x + overlap[i].height;
					posD.y = overlap[i].y + overlap[i].width;
				}

				if((posB.x>posC.x)&&(posB.x<=posD.x) && (posB.y>posC.y)&&(posB.y<=posD.y)) {
						
						return 1;
				}
				
				if((posA.x>=posC.x)&&(posA.x<posD.x) && (posB.y>posC.y)&&(posB.y<=posD.y)) {
						
						return 1;
				}

				if((posA.y>=posC.y)&&(posA.y<posD.y) && (posB.x>posC.x)&&(posB.x<=posD.x)) {
						
						return 1;
				}

				if((posA.x>=posC.x)&&(posA.x<posD.x) && (posA.y>=posC.y)&&(posA.y<posD.y)) {
						
						return 1;
				}

				if((posD.x>posA.x)&&(posD.x<=posB.x) && (posD.y>posA.y)&&(posD.y<=posB.y)) {
						
						return 1;
				}

				if((posC.x>=posA.x)&&(posC.x<posB.x) && (posD.y>posA.y)&&(posD.y<=posB.y)) {
						
						return 1;
				}

				if((posC.y>=posA.y)&&(posC.y<posB.y) && (posD.x>posA.x)&&(posD.x<=posB.x)) {
						
						return 1;
				}

				if((posC.x>=posA.x)&&(posC.x<posB.x) && (posC.y>=posA.y)&&(posC.y<posB.y)) {
						
						return 1;
				}

				if((posC.x>=posA.x)&&(posC.x<=posB.x) && (posD.x>=posA.x)&&(posD.x<=posB.x) && (posC.y<=posA.y)&&(posD.y>=posB.y)) {
						
						return 1;
				}

				if((posA.x>=posC.x)&&(posA.x<=posD.x) && (posB.x>=posC.x)&&(posB.x<=posD.x) && (posA.y<=posC.y)&&(posB.y>=posD.y)) {
						
						return 1;
				}

			}

			
			return 0;
		}
		else {
			//document.write("no intersection\n");
			return 0;
		}
	
	}
	else if(word.direction == 1) {
		
		if(word.x <0) {
			word.x =0;
			
		}		
		else if((word.x +  9/10*word.fontSize) > winWidth) {
			word.x = (winWidth -  9/10*word.fontSize);
			
		}

		if(word.y < 0) {
			//document.write("boundary 2 \n");
			word.y = 0;
		}
		else if((word.y + ctx.measureText(word.spell).width) > winHeight) {
			word.y = winHeight - ctx.measureText(word.spell).width;
		}
		
                                                       
		if(overlap.length > 0) {
			//document.write("test for intersection\n");
			posA.x = word.x;
			posA.y = word.y;
			posB.x = word.x + word.height;
			posB.y = word.y + word.width;
			

			for(var i=0; i<overlap.length; i++) {
				//document.write("test intersection with node " + i + "</br>");
				posC.x = overlap[i].x;
				posC.y = overlap[i].y;
				if(overlap[i].direction ==0) {
					posD.x = overlap[i].x + overlap[i].width;
					posD.y = overlap[i].y + overlap[i].height;
				}
				else {
					posD.x = overlap[i].x + overlap[i].height;
					posD.y = overlap[i].y + overlap[i].width;
				}
				
				if((posB.x>posC.x)&&(posB.x<=posD.x) && (posB.y>posC.y)&&(posB.y<=posD.y)) {
						
						return 1;
				}
				
				if((posA.x>=posC.x)&&(posA.x<posD.x) && (posB.y>posC.y)&&(posB.y<=posD.y)) {
						
						return 1;
				}

				if((posA.y>=posC.y)&&(posA.y<posD.y) && (posB.x>posC.x)&&(posB.x<=posD.x)) {
						
						return 1;
				}

				if((posA.x>=posC.x)&&(posA.x<posD.x) && (posA.y>=posC.y)&&(posA.y<posD.y)) {
						
						return 1;
				}

				if((posD.x>posA.x)&&(posD.x<=posB.x) && (posD.y>posA.y)&&(posD.y<=posB.y)) {
						
						return 1;
				}

				if((posC.x>=posA.x)&&(posC.x<posB.x) && (posD.y>posA.y)&&(posD.y<=posB.y)) {
						
						return 1;
				}

				if((posC.y>=posA.y)&&(posC.y<posB.y) && (posD.x>posA.x)&&(posD.x<=posB.x)) {
						
						return 1;
				}

				if((posC.x>=posA.x)&&(posC.x<posB.x) && (posC.y>=posA.y)&&(posC.y<posB.y)) {
						
						return 1;
				}

				if((posC.x>=posA.x)&&(posC.x<=posB.x) && (posD.x>=posA.x)&&(posD.x<=posB.x) && (posC.y<=posA.y)&&(posD.y>=posB.y)) {
						
						return 1;
				}

				if((posA.x>=posC.x)&&(posA.x<=posD.x) && (posB.x>=posC.x)&&(posB.x<=posD.x) && (posA.y<=posC.y)&&(posB.y>=posD.y)) {
						
						return 1;
				}

			}

			
			return 0;
		}
		else {
			//document.write("no intersection\n");
			return 0;
		}
	
	}

}


function update(word) {
	
	var current = {spell:"",weight:0,fontSize:0,x:0,y:0,direction:0,width:0,height:0};
	current.spell = word.spell;
	current.weight = word.weight;
	current.fontSize = word.fontSize;
	current.x = word.x;
	current.y = word.y;
	current.direction = word.direction;
	current.width = word.width;
	current.height = word.height;
	var xPosition = 30;
	var yPosition = 1/2*current.height;
	var xStart = current.x;
	var yStart = current.y;
	var countX = 0;
	var countY = 0;
	var flag = 0;
	
	
	

	while((current.x <= winWidth-current.width) && (current.x >= 0)) {

		
		//x右移
		current.x = xStart + countX * xPosition;
		if(intersection(current) == 0){
			flag = 1;
			break;
		}
		else{
			current.direction =1;
			//current.width = word.height;
			//current.height = word.width;
			if(intersection(current) == 0){
				flag = 1;
				break;
			}
			else{
				current.direction =0;
				//current.width = word.width;
				//current.height = word.height;
			}

		}
		countY = 1;
		while((current.y <= winHeight-current.height) && (current.y >= 0)) {
			//countY ++;
			current.y = yStart + countY * yPosition;
			if(intersection(current) == 0){
				flag = 1;
				break;
			}
			else{

				current.direction =1;
				//current.width = word.height;
				//current.height = word.width;
				if(intersection(current) == 0){
					flag = 1;
					break;
				}
				else{
					current.direction =0;
					//current.width = word.width;
					//current.height = word.height;
				}

			}
			//countY -- ;
			current.y = yStart - countY * yPosition;
			if(intersection(current) == 0){
				flag = 1;
				break;
			}
			else{

				current.direction =1;
				//current.width = word.height;
				//current.height = word.width;
				if(intersection(current) == 0){
					flag = 1;
					break;
				}
				else{
					current.direction =0;
					//current.width = word.width;
					//current.height = word.height;
				}

			}
			countY ++;

		}

		if(flag ==1) {
			word.x = current.x;
			word.y = current.y;
			word.direction = current.direction;
			updateDirection = 1;
			return 0;
		}

		

	

	
		//x左移
		current.x = xStart - countX * xPosition;
		if(intersection(current) == 0){
			flag = 1;
			break;
		}
		else{

			current.direction =1;
			//current.width = word.height;
			//current.height = word.width;
			if(intersection(current) == 0){
				flag = 1;
				break;
			}
			else{
				current.direction =0;
				//current.width = word.width;
				//current.height = word.height;
			}

		}
		countY = 1;
		while((current.y <= winHeight-current.height) && (current.y >= 0)) {
			current.y = yStart + countY * yPosition;
			if(intersection(current) == 0){
				flag = 1;
				break;
			}
			else{

				current.direction =1;
				//current.width = word.height;
				//current.height = word.width;
				if(intersection(current) == 0){
					flag = 1;
					break;
				}
				else{
					current.direction =0;
					//current.width = word.width;
					//current.height = word.height;
				}

			}
			//countY ++ ;
			current.y = yStart - countY * yPosition;
			if(intersection(current) == 0){
				flag = 1;
				break;
			}
			else{

				current.direction =1;
				//current.width = word.height;
				//current.height = word.width;
				if(intersection(current) == 0){
					flag = 1;
					break;
				}
				else{
					current.direction =0;
					//current.width = word.width;
					//current.height = word.height;
				}

			}
			countY ++;

		}

		if(flag ==1) {
			word.x = current.x;
			word.y = current.y;
			word.direction = current.direction;
			updateDirection = 0;
			return 0;
		}
		

		countX ++;

	}


	if(flag ==1) {
		word.x = current.x;
		word.y = current.y;
		word.direction = current.direction;
		return 0;
	}
	return 0;
}



function drawSingle(word) {

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	//ctx.clearRect(0,0,winWidth,winHeight);
	//ctx.clearRect(0,0,winHeight,-winWidth);

	ctx.fillStyle = "blue";
	ctx.strokeStyle = "blue";
	
	
	//ctx2.clearRect(0,0,c.width,c.height);

	
		if(word.direction == 0) {
			ctx.fillStyle = "#333333";
			ctx.strokeStyle = "blue";
			ctx.font = word.fontSize + "px Arial";
			
			//ctx.strokeRect(overlap[i].x, overlap[i].y, overlap[i].width, overlap[i].height);
			//ctx.strokeRect(diagram[i].x, diagram[i].y, ctx.measureText(diagram[0].spell), diagram[i].fontSize);
			ctx.fillText(word.spell, word.x, word.y + word.height);
			//ctx.fillText(ctx.measureText(diagram[0].spell).width, diagram[0].x, diagram[0].y+diagram[0].fontSize);
		
		}

		else if (word.direction == 1) {
			ctx.save();
			ctx.rotate(90*Math.PI/180);

			ctx.fillStyle = "#333333";
			ctx.strokeStyle = "red";
			ctx.font = word.fontSize + "px Arial";
			
			//ctx.strokeRect(overlap[i].y, -overlap[i].x-overlap[i].height, overlap[i].width, overlap[i].height);//!!!!!
			//ctx.strokeRect(diagram[i].x, diagram[i].y, ctx.measureText(diagram[0].spell), diagram[i].fontSize);
			ctx.fillText(word.spell, word.y, -word.x);
			//ctx.fillText(ctx.measureText(diagram[0].spell).width, diagram[0].x, diagram[0].y+diagram[0].fontSize);
			
			ctx.restore();
		}

	

	//ctx.strokeRect(10, 20, 20, 10);
	return 0;
}


function pRead() {
	
	var wor = textar.value;
	wor = wor.split(";");
	
	N = wor.length;
	
	for(var i=0; i<N; i++) {
		var origin = {spell:" ",weight:0,fontSize:0,x:0,y:0,direction:0,width:0,height:0};
		var con = wor[i].split(" ");
		origin.spell = con[0];
		origin.weight = parseInt(con[1]);
		diagram.push(origin);
	}

	return;
}





function layout() {

	pRead();
	
	makeInitialFont();
	diagram.sort(compAlphabetic);

	for(var i=0;i<diagram.length;i++) {
		makeInitialPosition(diagram[i]);

		document.getElementById("textar").innerHTML += "\nNow is in " + i + " node proccess";
		if(intersection(diagram[i]) == 0) {
			document.getElementById("textar").innerHTML += "\nNode " + i + " is not intersectin with others";
			overlap.push(diagram[i]);
			if(diagram[i].y == midLine){
				
				rightBoundary = rightBoundary + diagram[i].width;
				//rightBoundary = rightBoundary + 70;
			}
			drawSingle(diagram[i]);
			//document.getElementById("textar").innerHTML += "\nThe word " + i + " is inserted successfully";
		}
		else {
			document.getElementById("textar").innerHTML += "\nNode " + i + " is in intersectin with others";
			update(diagram[i]);
			overlap.push(diagram[i]);
			drawSingle(diagram[i]);
			
		}

	}
	
	
	//draw();


	
	return 0;
}



/*
Test data:
hello 10;
world 5;
helen 3;
nice 7;
is 15;
text 30;
visualization 20;
data 50;
system 17;
hi 1;
my 9;
wordle 30;
report 6;
fighting 8;
algorithm 2

*/
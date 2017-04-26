function draw(canId){

	var c = document.getElementById(canId);
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, 200, 200); 
	ctx.strokeStyle = "#FF0000";
	ctx.fillRect(10, 10, 130, 130); 
}


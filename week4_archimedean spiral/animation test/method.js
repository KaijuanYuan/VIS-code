
var ele;
var progress = 0;

function step(timestamp) {
	
    progress += 1;
    ele.style.width = progress + "%";
    ele.innerHTML=progress + "%";
    if (progress < 100) {
        requestAnimationFrame(step);
    }
}

function update(div)
{
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


	ele = document.getElementById(div);
	ele.style.width = "1px";
	progress = 0;
	requestAnimationFrame(step);

}
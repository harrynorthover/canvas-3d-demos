var camera = new BLUR.Camera3D( window.innerWidth - 20, window.innerHeight - 20);
var scene = new BLUR.Scene3D();
var renderer = new BLUR.CanvasRenderer( scene, camera );

var mouseX = 0;
var mouseY = 0;

var shouldDraw = false;

function init() {
	var plane = new BLUR.Plane( new BLUR.Vector(100, 100, 0), new BLUR.Vector(-100, 100, 0), new BLUR.Vector(-100, -100, 0), new BLUR.Vector(100, -100, 0) );
	scene.addObject(plane);
	setInterval(render, 10);
}

function render()
{
	if(shouldDraw)
	{
		for(var i = 0; i < scene.objects.length; ++i) {
			scene.objects[i].rotateY(-(((window.innerWidth / 2) - mouseX) * .02));
			scene.objects[i].rotateX((((window.innerHeight / 2) - mouseY) * .02));
		}
	}

	renderer.render( scene, camera );
}

function setMousePosition( x,y )
{
	mouseX = x;
	mouseY = y;
}

jQuery(document).ready(function() {
	$('canvas').mousemove(function(e) { setMousePosition(e.pageX, e.pageY); } );
	$('canvas').mousedown(function(e) { shouldDraw = true;  } );
	$('canvas').mouseup(function(e)   { shouldDraw = false; } );
});

init();
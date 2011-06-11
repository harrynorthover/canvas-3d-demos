var camera 					= new BLUR.Camera3D( window.innerWidth, window.innerHeight );
var scene 					= new BLUR.Scene3D();
var renderer 				= new BLUR.CanvasRenderer( scene, camera );

var mouseX 					= 0;
var mouseY 					= 0;

var shouldDraw 				= false;

setInterval(render, 1);

function render()
{
	for(var i = 0; i < scene.objects.length; ++i) {
		scene.objects[i].rotateY(((window.innerWidth / 2) - mouseX) * .009);
		scene.objects[i].rotateX(((window.innerHeight / 2) - mouseY) * .009);
	}

	if(shouldDraw)
	{
		var range 			= [-150, 150];
		var point 			= new BLUR.Particle( new BLUR.Vector( mouseX - (window.innerWidth /2), mouseY - (window.innerHeight/2) ,  1 ), randomNumber(1, 10) );
		point.material 		= new BLUR.RGBColour(Math.floor(Math.random() * 200), 255, 255, 1);

		scene.addObject(point);
	}

	for(var i = 0; i < scene.objects.length; ++i) {
		scene.objects[i].rotateY(((window.innerWidth / 2) - mouseX) * .007);
		scene.objects[i].material = new BLUR.RGBColour(scene.objects[i].material.r,
													   scene.objects[i].material.g,
													   scene.objects[i].material.b,
													   scene.objects[i].material.a - .01);
	}

	renderer.render( scene, camera );
}

function setMousePosition( x,y )
{
	mouseX = x;
	mouseY = y;
}

function randomNumber(min, max)
{
	return ( (Math.random() * (max-min) ) + min);
}

jQuery(document).ready(function() {
	$('canvas').mousemove(function(e) { setMousePosition(e.pageX, e.pageY); } );
	$('canvas').mousedown(function(e) { shouldDraw = true;  } );
	$('canvas').mouseup(function(e)   { shouldDraw = false; } );
});

var camera = new BLUR.Camera3D( window.innerWidth - 20, window.innerHeight - 20);
var scene = new BLUR.Scene3D();
var renderer = new BLUR.CanvasRenderer( scene, camera );

var mouseX = 0;
var mouseY = 0;

var shouldDraw = false;

function init() {
	for(var i = 0; i < 150; ++i)
	{
		var range = [-150, 150];
		var point = new BLUR.Particle( new BLUR.Vector(randomNumber(range[0], range[1]), randomNumber(range[0], range[1]) , randomNumber(range[0], range[1])), 1 );
		var line = new BLUR.Line3D( new BLUR.Vector( randomNumber(range[0], range[1]) ,
													  randomNumber(range[0], range[1]) ,
													  randomNumber(range[0], range[1]), 1 ),
				                    new BLUR.Vector( randomNumber(range[0], range[1]) ,
				                    				  randomNumber(range[0], range[1]) ,
				                    				  randomNumber(range[0], range[1]) ,1 ) );

		point.material = new BLUR.RGBColour(255, Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.random());
		line.material = new BLUR.RGBColour(255, Math.floor(Math.random() * 255), 255, Math.random());

		scene.addObject(line);
		scene.addObject(point);
	}

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

function randomNumber(min, max)
{
	return ( (Math.random() * (max-min) ) + min);
}

jQuery(document).ready(function() {
	$('canvas').mousemove(function(e) { setMousePosition(e.pageX, e.pageY); } );
	$('canvas').mousedown(function(e) { shouldDraw = true;  } );
	$('canvas').mouseup(function(e)   { shouldDraw = false; } );
});

init();
var camera 		= new BLUR.Camera3D( window.innerWidth - 18, window.innerHeight - 18 );
var scene 		= new BLUR.Scene3D();
var renderer 	= new BLUR.CanvasRenderer( scene, camera );

var mouseX 		= 0;
var mouseY 		= 0;

var orgMouseX   = 0;
var orgMouseY	= 0;

var points 		= [];
var shapes	 	= [];

var shouldDraw	= false;

setInterval(render, 10);

function render()
{
	if(shouldDraw)
	{
		var line 			= new BLUR.Line3D(new BLUR.Vector( orgMouseX - (window.innerWidth /2) , orgMouseY - (window.innerHeight /2) ,  0, 0 ),
											  new BLUR.Vector( mouseX - (window.innerWidth /2) , mouseY - (window.innerHeight /2) , 1 ,0 ), 1);
		line.material 		= new BLUR.RGBColour(255, 255, 255, Math.random());

		var ranX 			= [orgMouseX - (window.innerWidth /2) - 100, orgMouseX - (window.innerWidth /2) + 100];
		var ranY 			= [orgMouseY - (window.innerHeight /2) - 100, orgMouseY - (window.innerHeight /2) + 100];
		var range 			= [-150, 150];

		var point 			= new BLUR.Particle( new BLUR.Vector( randomNumber(ranX[0], ranX[1]),
																   randomNumber(ranY[0], ranY[1]),
																   randomNumber(range[0], range[1]) ), randomNumber(1, 5) );
		point.material 		= new BLUR.RGBColour(255, 255, 255, 0.3);

		scene.addObject(point);
		scene.addObject(line);
	}

	for(var i = 0; i < scene.objects.length; ++i) {
		scene.objects[i].rotateY(((window.innerWidth / 2) - mouseX) * .009);
		scene.objects[i].rotateX(((window.innerHeight / 2) - mouseY) * .009);

		if(!shouldDraw) {
			if(scene.objects[i].material.a <= 0)
				scene.removeObject(scene.objects[i]);
			else {
				var fadeAmount = scene.objects[i].type == "BLUR.Line3D" ? .001 : .001;
				scene.objects[i].material = new BLUR.RGBColour(scene.objects[i].material.r + 1,
							   								   scene.objects[i].material.g - 1,
							   								   scene.objects[i].material.b - 1,
							   								   scene.objects[i].material.a - fadeAmount);
			}
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
	$('canvas').mousedown(function(e) { shouldDraw = true; orgMouseX = e.pageX; orgMouseY = e.pageY; } );
	$('canvas').mouseup(function(e)   { shouldDraw = false; } );
});
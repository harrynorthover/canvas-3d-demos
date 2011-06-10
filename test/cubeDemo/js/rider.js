var camera 		= new BLUR.Camera3D( window.innerWidth - 50, window.innerHeight - 50 );
var scene 		= new BLUR.Scene3D();
var renderer 	= new BLUR.CanvasRenderer( scene, camera );

var mouseX 		= 0;
var mouseY 		= 0;

var points 		= [];
var shapes	 	= [];

var shouldDraw	= false;

var statsContainer		= document.getElementById( 'statsHolder' );

var stats 			= new Stats();
statsContainer.appendChild( stats.domElement );

setInterval( function () {
    stats.update();
}, 1000 / 60 );

function init() {
	points.push( new BLUR.Vector(-100, -100, -100, 1)  );
	points.push( new BLUR.Vector(100, -100, -100, 1)  );
	points.push( new BLUR.Vector(100, 100, -100, 1) );
	points.push( new BLUR.Vector(-100, 100, -100, 1)  );
	points.push( new BLUR.Vector(-100, -100, 100, 1)  );
	points.push( new BLUR.Vector(100, -100, 100, 1)  );
	points.push( new BLUR.Vector(100, 100, 100, 1) );
	points.push( new BLUR.Vector(-100, 100, 100, 1) );

	shapes.push( new BLUR.Plane( points[0], points[1], points[2], points[3]) );
	shapes.push( new BLUR.Plane( points[4], points[5], points[6], points[7]) );
	shapes.push( new BLUR.Plane( points[0], points[4], points[7], points[3]) );
	shapes.push( new BLUR.Plane( points[0], points[1], points[5], points[4]) );
	shapes.push( new BLUR.Plane( points[1], points[5], points[6], points[2]) );
	shapes.push( new BLUR.Plane( points[3], points[7], points[6], points[2]) );

	for(var i = 0; i < shapes.length; ++i)
	{
		shapes[i].material = new BLUR.RGBColour(Math.floor(Math.random() * 255) , Math.floor(Math.random() * 255), 255, Math.random());
		scene.addObject(shapes[i]);
	}

	setInterval(render, 10);
}

function render()
{
	if(shouldDraw)
	{
		var range 			= [-150, 150];
		var point 			= new BLUR.Particle( new BLUR.Vector( mouseX - (window.innerWidth /2), mouseY - (window.innerHeight/2) ,  randomNumber(range[0], range[1]) ), randomNumber(1, 8) );
		point.material 		= new BLUR.RGBColour(Math.floor(Math.random() * 200), 255, 255, 1);

		scene.addObject(point);
	}

	for(var i = 0; i < scene.objects.length; ++i) {
		scene.objects[i].rotateY(((window.innerWidth / 2) - mouseX) * .009);
		scene.objects[i].rotateX(((window.innerHeight / 2) - mouseY) * .009);
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
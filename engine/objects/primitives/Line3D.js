BLUR.Line3D = function( p1, p2, t ) {

	this.thickness = t == undefined ? 1 : t;
	this.point1 = new BLUR.Vector( p1.x, p1.y, p1.z );
	this.point2	= new BLUR.Vector( p2.x, p2.y, p2.z );

	this.material = new BLUR.RGBColour( 255, 255, 255, 1 );

	this.rotateY = function(angle) {
		var temp_p1 = new BLUR.Vector(this.point1.x, this.point1.y, this.point1.z);
		var temp_p2 = new BLUR.Vector(this.point2.x, this.point2.y, this.point2.z);

		temp_p1.rotateY(angle);
		temp_p2.rotateY(angle);

		this.point1 = temp_p1;
		this.point2	= temp_p2;
	};

	this.rotateX = function(angle) {
		var temp_p1 = new BLUR.Vector(this.point1.x, this.point1.y, this.point1.z);
		var temp_p2 = new BLUR.Vector(this.point2.x, this.point2.y, this.point2.z);

		temp_p1.rotateX(angle);
		temp_p2.rotateX(angle);

		this.point1 = temp_p1;
		this.point2	= temp_p2;
	};

	this.type = 'BLUR.Line3D';
};
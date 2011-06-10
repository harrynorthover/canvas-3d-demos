/*
 * Author: Harry Northover
 * 			- harrynorthover.com
 * Description:
 * The scene used to hold all 3D objects.
 *
 * Edits:
 * None.
 */

BLUR.Scene3D = function () {
	this.objects 	= [];

	this.addObject = function( object ) {
		this.objects.push(object);
	};

	this.removeObject = function( object ) {
		var index = this.objects.indexOf(object);
		if(index != null)
			this.objects.splice(index, 1);
	};
};
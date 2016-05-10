/**
 * MyClockFace
 * @constructor
 */
 function MyClockFace(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;

 	this.initBuffers();
 };

 MyClockFace.prototype = Object.create(CGFobject.prototype);
 MyClockFace.prototype.constructor = MyClockFace;

 MyClockFace.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	var ang = 2*Math.PI/this.slices;

 	this.vertices = [];

 	this.vertices.push(0, 0, 0);
 	for (var i = 0; i < this.slices; i++) {
 		this.vertices.push(Math.cos(i*ang),Math.sin(i*ang),0);
	}

 	this.indices = [];
	for (var i = 1; i < this.slices; i++) {
		this.indices.push(0, i, i+1);
	}
	this.indices.push(0, this.slices, 1);

 	this.normals = [];
 	for (var i = 0; i <= this.slices; i++) {
		this.normals.push(0, 0, 1);
	}

	this.texCoords = [];

	this.texCoords.push(0.5, 0.5);
	for (var i = 0; i < this.slices; i++) {
		this.texCoords.push(0.5 + 0.5*Math.cos(-i*ang), 0.5 + 0.5*Math.sin(-i*ang));
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
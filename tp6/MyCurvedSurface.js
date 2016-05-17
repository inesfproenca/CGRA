/**
 * MyCurvedSurface
 * @constructor
 */
 function MyCurvedSurface(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;

 	this.initBuffers();
 };

 MyCurvedSurface.prototype = Object.create(CGFobject.prototype);
 MyCurvedSurface.prototype.constructor = MyCurvedSurface;

 MyCurvedSurface.prototype.initBuffers = function() {

 	var ang = Math.PI/(2*this.slices);

 	this.vertices = [];
 	this.texCoords = [];
 	for(var j = 0; j <= 1; j++){
		for (var i = 0; i <= this.slices; i++) {
			this.vertices.push(Math.cos(i*ang),Math.sin(i*ang),j);
			this.texCoords.push(i/this.slices, j);
		}
	}

 	this.indices = [];
	for (var i = 0; i < this.slices; i++) {
 		this.indices.push(i,i+1,i+this.slices+1);
 		this.indices.push(i+1,i+this.slices+2,i+this.slices+1);
 		this.indices.push(i+this.slices+1,i+1,i);
 		this.indices.push(i+this.slices+1,i+this.slices+2,i+1);
	}

 	this.normals = [];
 	for(var j = 0; j <= 1; j++){
		for (var i = 0; i <= this.slices; i++) {
			this.normals.push(Math.cos(i*ang), Math.sin(i*ang), 0);
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
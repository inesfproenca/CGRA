/**
 * MyCurvedSurface
 * @constructor
 */
 function MyCurvedSurface(scene, nrDivs) {
 	CGFobject.call(this,scene);

 	this.scene = scene;
	this.nrDivs = nrDivs;

 	this.initBuffers();
 };

 MyCurvedSurface.prototype = Object.create(CGFobject.prototype);
 MyCurvedSurface.prototype.constructor = MyCurvedSurface;

 MyCurvedSurface.prototype.initBuffers = function() {

 	var tmp = 1/this.nrDivs;

 	this.vertices = [];
 	this.texCoords = [];
 	for(var j = 0; j <= 1; j++){
		for (var i = 0; i <= this.nrDivs; i++) {
			this.vertices.push(i*tmp,1-(i*tmp)*(i*tmp),j);
			this.texCoords.push(i/this.nrDivs, j);
		}
	}

 	this.indices = [];
	for (var i = 0; i < this.nrDivs; i++) {
 		this.indices.push(i,i+1,i+this.nrDivs+1);
 		this.indices.push(i+1,i+this.nrDivs+2,i+this.nrDivs+1);
 		this.indices.push(i+this.nrDivs+1,i+1,i);
 		this.indices.push(i+this.nrDivs+1,i+this.nrDivs+2,i+1);
	}

 	this.normals = [];
 	for(var j = 0; j <= 1; j++){
		for (var i = 0; i <= this.nrDivs; i++) {
			this.normals.push(i*tmp,1-(i*tmp)*(i*tmp), 0);
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
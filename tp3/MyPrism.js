/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	var ang = 2*Math.PI/this.slices;

 	this.vertices = [];
 	for(var j = 0; j <= this.stacks; j++){
		for (var i = 0; i <= this.slices; i++) {
			var height = (1/this.stacks);
			this.vertices.push(Math.cos(i*ang),Math.sin(i*ang),j*height);
			this.vertices.push(Math.cos(i*ang),Math.sin(i*ang),(j+1)*height);
			this.vertices.push(Math.cos((i+1)*ang),Math.sin((i+1)*ang),j*height);
			this.vertices.push(Math.cos((i+1)*ang),Math.sin((i+1)*ang),(j+1)*height);
		}
	} 
 	this.indices = [];
	for (var i = 0; i < (this.slices+1)*this.stacks; i++) {
		 	var tmp = i*4;
 			this.indices.push(tmp+2,tmp+1,tmp);
 			this.indices.push(tmp+1,tmp+2,tmp+3);
	}

 	this.normals = [];
 	var ang_tmp = ang/2;
 	for(var j = 0; j <= this.stacks; j++){
 		ang_tmp = ang/2;
		for (var i = 0; i <= this.slices; i++) {
			this.normals.push(Math.cos(ang_tmp), Math.sin(ang_tmp), 0);
			this.normals.push(Math.cos(ang_tmp), Math.sin(ang_tmp), 0);
			this.normals.push(Math.cos(ang_tmp), Math.sin(ang_tmp), 0);
			this.normals.push(Math.cos(ang_tmp), Math.sin(ang_tmp), 0);
			ang_tmp += ang;
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
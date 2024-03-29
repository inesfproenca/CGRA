/**
 * MyTarget
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTarget(scene) {
	CGFobject.call(this, scene);

	this.body= new MyClockFace(this.scene, 12);
	this.x = 2.0;
	this.z = 2.0;
	
	this.targetAppearance = new CGFappearance(this.scene);;
	this.targetAppearance.loadTexture("../resources/images/target.png");
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;

MyTarget.prototype.display = function () {
	this.scene.translate(this.x ,0 , this.z);
	
	this.scene.pushMatrix();
	this.scene.translate(0,.005,0);
	this.scene.rotate(-Math.PI/2,1,0,0);
	this.targetAppearance.apply();
	this.body.display();
	this.scene.popMatrix();

	this.scene.materialDefault.apply();

	
};

MyTarget.prototype.getX = function() {
	return this.x;
};

MyTarget.prototype.getZ = function() {
	return this.z;
};
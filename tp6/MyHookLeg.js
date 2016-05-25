function MyHookLeg(scene, ang) {
	CGFobject.call(this,scene);
	this.cube = new MyUnitCubeQuad(scene);
	this.ang= ang;
};

MyHookLeg.prototype = Object.create(CGFobject.prototype);
MyHookLeg.prototype.constructor=MyHookLeg;

MyHookLeg.prototype.display = function () {
	this.scene.pushMatrix();
	this.scene.translate(0,-Math.sin(this.ang)*2,0);

	this.scene.pushMatrix();
	this.scene.translate(0,Math.sin(this.ang),Math.cos(this.ang));
	this.scene.rotate(this.ang,1,0,0);
	this.scene.scale(0.5,0.5,2);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,-Math.sin(this.ang),Math.cos(this.ang));
	this.scene.rotate(-this.ang,1,0,0);
	this.scene.scale(0.5,0.5,2);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.popMatrix();

};

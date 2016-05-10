function MyDroneBody(scene) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.arm = new MyCylinder(this.scene,5,3);
	this.helixBase = new MyCylinder(this.scene,5,1);
	this.body = new MySemiSphere(this.scene,6,5);

};

MyDroneBody.prototype = Object.create(CGFobject.prototype);
MyDroneBody.prototype.constructor=MyDroneBody;

MyDroneBody.prototype.display = function(){

	//Draw arms
	this.scene.pushMatrix();
		this.scene.translate(0, 0, -1);
		this.scene.scale(0.05,0.05,2);
		this.arm.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-1, 0, 0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(0.05,0.05,2);
		this.arm.display();
	this.scene.popMatrix();

	//Draw helix Base
	this.scene.pushMatrix();
		this.scene.translate(-0.95, 0.15, 0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(0.05,0.05,0.2);
		this.helixBase.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0.95, 0.15, 0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(0.05,0.05,0.2);
		this.helixBase.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0.15, -0.95);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(0.05,0.05,0.2);
		this.helixBase.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0.15, 0.95);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(0.05,0.05,0.2);
		this.helixBase.display();
	this.scene.popMatrix();

	//DrawBody
	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.5,0.5,0.4);
		this.body.display();
	this.scene.popMatrix();
}
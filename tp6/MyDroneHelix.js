/**
 * MyDroneHelix
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyDroneHelix(scene) {
	CGFobject.call(this,scene);

	this.center= new MySemiSphere(this.scene,5,3);
	this.paddle = new MyCylinder(this.scene, 5, 1);

	this.angle = 0;
	this.speed = 1.0;
};

MyDroneHelix.prototype = Object.create(CGFobject.prototype);
MyDroneHelix.prototype.constructor=MyDroneHelix;

MyDroneHelix.prototype.updateAngle = function(time)
{
	var rad= 2*Math.PI;
	this.angle += time*this.speed*this.scene.speed*rad/1000;
};

MyDroneHelix.prototype.setSpeed = function(speed)
{
	this.speed = speed;
};

MyDroneHelix.prototype.display = function () {

	this.scene.rotate(this.angle,0,1,0);
	
	this.scene.pushMatrix();
		this.scene.scale(0.4,0.4,0.4);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.center.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.scale(0.2,0.1,1.5);
		this.paddle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.scale(0.2,0.1,1.5);
		this.paddle.display();
	this.scene.popMatrix();
};
/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this, scene);

	this.body= new MyCylinder(this.scene, 12, 1);
	this.face= new MyClockFace(this.scene, 12);
	this.secHand = new MyClockHand(this.scene, 0.9);
	this.minHand = new MyClockHand(this.scene, 0.7);
	this.hourHand = new MyClockHand(this.scene, 0.4);

	this.hourHand.setAngle(90);
	this.minHand.setAngle(180)
	this.secHand.setAngle(270);

	// Materials
	this.materialDefault = new CGFappearance(this.scene);
	
	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.setAmbient(0.3,0.3,0.3,1);
	this.clockAppearance.setDiffuse(0.6, 0.6, 0.6 ,1);
	this.clockAppearance.setSpecular(0.1,0.1,0.1,1);
	this.clockAppearance.setShininess(5);
	this.clockAppearance.loadTexture("../resources/images/clock.png");
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.display = function () {

	//Clock body	
	this.scene.pushMatrix();
	this.scene.scale(1,1,0.3);
	this.body.display();
	this.scene.popMatrix();
	
	//Clock face
	
	this.scene.pushMatrix();
	this.scene.translate(0,0, 0.3);
	this.clockAppearance.apply();
	this.face.display();
	this.scene.popMatrix();

	this.materialDefault.apply();

	//Clock hands
	this.scene.pushMatrix();
	this.scene.translate(0,0, 0.33);
	this.secHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0, 0.36);
	this.minHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0, 0.39);
	this.hourHand.display();
	this.scene.popMatrix();

	this.materialDefault.apply();

	
};

MyClock.prototype.update = function(currTime) {
			var time = currTime / 1000;
			var sec = time % 60;
			var min = (time/60)%60;
			var hour = (time/3600)%12;

			this.secHand.setAngle(sec*6);
			this.minHand.setAngle(min*6);
			this.hourHand.setAngle(hour*30);
};
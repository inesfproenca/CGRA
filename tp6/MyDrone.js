function MyDrone(scene) {
	CGFobject.call(this, scene);

    this.scene = scene;
  
	this.slow = 0.2;
	this.medium = 1.0;
	this.fast = 10.0;

	this.body = new MyDroneBody(this.scene);
	this.leg = new MyDroneLeg(this.scene);
	this.frontHelix = new MyDroneHelix(this.scene);
	this.backHelix = new MyDroneHelix(this.scene);
	this.rightHelix = new MyDroneHelix(this.scene);
	this.leftHelix = new MyDroneHelix(this.scene);
	this.vel=1;
	this.x=8;
	this.z=9;
	this.height=5;
	this.angle= 7*Math.PI/6;
	this.tilt = 0;
	this.time = 0;

	//Materials
	this.droneApperances = [];

	this.teste = new CGFappearance(this.scene);
	this.teste.loadTexture("../resources/images/teste.png");
	this.droneApperances.push(this.teste);
	
	this.camuflage= new CGFappearance(this.scene);
	this.camuflage.loadTexture("../resources/images/camuflage.png");
	this.droneApperances.push(this.camuflage);

	this.circuits = new CGFappearance(this.scene);
	this.circuits.loadTexture("../resources/images/circuits.png");
	this.droneApperances.push(this.circuits);

};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor=MyDrone;

MyDrone.prototype.display = function(){
	this.scene.translate(this.x, this.height, this.z);
	this.scene.rotate(this.angle,0,1,0);
	this.scene.rotate(this.tilt,1,0,0);

/*
	if(this.scene.currDroneAppearance == 'Camuflage')
		this.camuflageAppearance.apply();
	if(this.scene.currDroneAppearance == 'Teste')
		this.testAppearance.apply();
	if(this.scene.currDroneAppearance == 'Circuits')
		this.circuitAppearance.apply();
*/
	this.droneApperances[this.scene.currDroneAppearance].apply();

	//Draw Body
	this.scene.pushMatrix();
		this.scene.translate(0,0.4,0);
		this.body.display();
	this.scene.popMatrix();

	//Draw Legs
	this.scene.pushMatrix();
		this.scene.translate(0.35,0,0);
		this.leg.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-0.35,0,0);
		this.leg.display();
	this.scene.popMatrix();

	//Draw helixes
	this.scene.pushMatrix();
		this.scene.translate(0,0.5,0.95);
		this.scene.scale(0.25,0.25,0.25);
		this.frontHelix.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,0.5,-0.95);
		this.scene.scale(0.25,0.25,0.25);
		this.backHelix.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-0.95,0.5,0);
		this.scene.scale(0.25,0.25,0.25);
		this.rightHelix.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0.95,0.5,0);
		this.scene.scale(0.25,0.25,0.25);
		this.leftHelix.display();
	this.scene.popMatrix();
	
	this.scene.materialDefault.apply();
};

MyDrone.prototype.rotateLeft = function(){
	this.frontHelix.setSpeed(this.slow);
	this.backHelix.setSpeed(this.slow);
	this.rightHelix.setSpeed(this.fast);
	this.leftHelix.setSpeed(this.fast);

	this.angle += Math.PI/12;
};

MyDrone.prototype.rotateRight = function(){
	this.frontHelix.setSpeed(this.fast);
	this.backHelix.setSpeed(this.fast);
	this.rightHelix.setSpeed(this.slow);
	this.leftHelix.setSpeed(this.slow);

	this.angle -= Math.PI/12;
};

MyDrone.prototype.moveForward = function(){
	this.tilt = Math.PI/12;

	this.frontHelix.setSpeed(this.slow);
	this.backHelix.setSpeed(this.fast);
	this.rightHelix.setSpeed(this.medium);
	this.leftHelix.setSpeed(this.medium);

	this.x += this.vel*Math.sin(this.angle);
	this.z += this.vel*Math.cos(this.angle);

	if(this.x < 1 || this.x > 14 || this.z < 1 || this.z > 14){
		this.x -= this.vel*Math.sin(this.angle);
		this.z -= this.vel*Math.cos(this.angle);
	}
};

MyDrone.prototype.moveBackward = function(){
	this.tilt = -Math.PI/12;

	this.frontHelix.setSpeed(this.fast);
	this.backHelix.setSpeed(this.slow);
	this.rightHelix.setSpeed(this.medium);
	this.leftHelix.setSpeed(this.medium);

	this.x -= this.vel*Math.sin(this.angle);
	this.z -= this.vel*Math.cos(this.angle);

	if(this.x < 1 || this.x > 14 || this.z < 1 || this.z > 14){
		this.x += this.vel*Math.sin(this.angle);
		this.z += this.vel*Math.cos(this.angle);
	}
};

MyDrone.prototype.moveUp = function(){
	this.frontHelix.setSpeed(this.fast);
	this.backHelix.setSpeed(this.fast);
	this.rightHelix.setSpeed(this.fast);
	this.leftHelix.setSpeed(this.fast);

	this.height += 0.3;

	if(this.height > 8)
		this.height = 8;
};

MyDrone.prototype.moveDown = function(){
	this.frontHelix.setSpeed(this.slow);
	this.backHelix.setSpeed(this.slow);
	this.rightHelix.setSpeed(this.slow);
	this.leftHelix.setSpeed(this.slow);

	this.height -= 0.3;

	if(this.height < 0)
		this.height = 0;
};

MyDrone.prototype.static = function(){
	this.tilt = 0;

	this.frontHelix.setSpeed(this.medium);
	this.backHelix.setSpeed(this.medium);
	this.rightHelix.setSpeed(this.medium);
	this.leftHelix.setSpeed(this.medium);
};

MyDrone.prototype.update = function(currTime) {

	if(this.time == 0)
		this.time = currTime;
	else{
		var difTime = currTime - this.time;
		this.frontHelix.updateAngle(difTime);
		this.backHelix.updateAngle(difTime);
		this.rightHelix.updateAngle(-difTime);
		this.leftHelix.updateAngle(-difTime);
		this.time = currTime;
	}
};
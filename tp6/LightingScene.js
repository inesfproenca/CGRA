var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.enableTextures(true);

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.rightWall = new Plane(this);
	this.leftWall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	this.floor = new MyQuad(this, 0, 10, 0, 12);

	this.cylinder = new MyCylinder(this,8,20);
	this.lamp = new MySemiSphere(this,10,20);
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, BOARD_WIDTH, BOARD_HEIGHT);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	this.clock = new MyClock(this);
	this.plane = new MyPaperPlane(this);
	this.drone = new MyDrone(this);
	this.target = new MyTarget(this);
	this.cargo = new MyCargo(this);

	// Materials
	this.materialDefault = new CGFappearance(this);	

	this.column = new CGFappearance(this);
	this.column.setSpecular(0.3,0.3,0.3,1);	
	this.column.setShininess(170);
	this.column.loadTexture("../resources/images/column.png");

	this.wallpaper = new CGFappearance(this);
	this.wallpaper.setSpecular(0.3,0.3,0.3,1);	
	this.wallpaper.setShininess(170);
	this.wallpaper.loadTexture("../resources/images/wallpaper.png");
	
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.5, 0.5, 0.5,1);
	this.windowAppearance.setSpecular(0.2,0.2,0.2,1);	
	this.windowAppearance.setShininess(70);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE' );
	
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearance.setDiffuse(0.5, 0.5, 0.5,1);
	this.floorAppearance.setSpecular(0.2,0.2,0.2,1);	
	this.floorAppearance.setShininess(70);
	this.floorAppearance.loadTexture("../resources/images/floor.png");

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(0.7, 0.7, 0.7,1);
	this.slidesAppearance.setSpecular(0.2,0.2,0.2,1);	
	this.slidesAppearance.setShininess(20);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE' );
	
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.4, 0.4, 0.4,1);
	this.boardAppearance.setSpecular(0.7,0.7,0.7,1);	
	this.boardAppearance.setShininess(100);
	this.boardAppearance.loadTexture("../resources/images/board.png");

	this.paperAppearance = new CGFappearance(this);
	this.paperAppearance.setAmbient(0.3,0.3,0.3,1);
	this.paperAppearance.setDiffuse(0.9, 0.9, 0.9,1);
	this.paperAppearance.setSpecular(0.2,0.2,0.2,1);	
	this.paperAppearance.setShininess(20);
	this.paperAppearance.loadTexture("../resources/images/paper.png");
	
	this.setUpdatePeriod(10);

	this.Luz1=true;
	this.Luz2=true;
	this.Luz3=true;
	this.Luz4=true;
	this.run = true;

	this.currDroneAppearance = 0;
	this.droneAppearanceList = {'estrela': 0, 'camuflage': 1, 'circuits': 2, 'arrow': 3};
	
	this.speed=1;
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.2,0.2,0.2, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1, 1, 0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1, 1, 0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1);
	this.lights[3].enable();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++){
		this.lights[i].update();
		switch(i){
			case 0:
				if(this.Luz1)
					this.lights[0].enable();
				else
					this.lights[0].disable();
				break;
			case 1:
				if(this.Luz2)
					this.lights[1].enable();
				else
					this.lights[1].disable();
				break;
			case 2:
				if(this.Luz3)
					this.lights[2].enable();
				else
					this.lights[2].disable();
				break;
			case 3:
				if(this.Luz4)
					this.lights[3].enable();
				else
					this.lights[3].disable();
				break;
		}
	}
}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	
	this.floorAppearance.apply();
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.windowAppearance.apply();
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.wallpaper.apply();
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.rightWall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	//Cylinder
	this.column.apply();
	this.pushMatrix();
		this.translate(0,0,14);
		this.rotate(-Math.PI/2,1,0,0);
		this.scale(1,1,8);
		this.cylinder.display();
	this.popMatrix();

	//Lamp
	this.materialDefault.apply();
	this.pushMatrix();
		this.translate(10.5, 6.0, 1.0);
		this.rotate(-Math.PI/2,1,0,0);
		this.scale(0.7,0.7,0.7);
		this.lamp.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(10.5, 6.0, 5.0);
		this.rotate(-Math.PI/2,1,0,0);
		this.scale(0.7,0.7,0.7);
		this.lamp.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(4, 6.0, 1.0);
		this.rotate(-Math.PI/2,1,0,0);
		this.scale(0.7,0.7,0.7);
		this.lamp.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(4, 6.0, 5.0);
		this.rotate(-Math.PI/2,1,0,0);
		this.scale(0.7,0.7,0.7);
		this.lamp.display();
	this.popMatrix();
	
	//Clock
	this.pushMatrix();
		this.translate(7.5, 7.3, 0);
		this.scale(0.7,0.7, 1);
		this.clock.display();
	this.popMatrix();

	//Plane
	this.pushMatrix();
		this.paperAppearance.apply();
		this.translate(this.plane.dist, this.plane.height, 8);
		this.rotate(this.plane.angle,0,0,1);
		this.plane.display();
	this.popMatrix();
	
	//Drone
	this.pushMatrix();
		this.drone.display();
	this.popMatrix();

	//Target
	this.pushMatrix();
		this.target.display();
	this.popMatrix();

	//Cargo
	this.pushMatrix();
		this.cargo.display();
	this.popMatrix();

	
	// ---- END Primitive drawing section
};

LightingScene.prototype.update = function(currTime) {

	if(this.run == true){
		if(this.clock)
			this.clock.update(currTime);

		if(this.plane)
			this.plane.update();

		if(this.drone)
			this.drone.update(currTime);

		this.cargo.update(currTime);
	}

};

LightingScene.prototype.pause = function ()
{ this.run= !this.run; };
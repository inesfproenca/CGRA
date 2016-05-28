/**
 * MyCargo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyCargo(scene) {
	CGFobject.call(this, scene);

	this.isHooked = false;
	this.appearance;

	this.body= new MyUnitCubeQuad(this.scene);
	this.x = 5.0;
	this.y = 0.5;
	this.z = 5.0;

	this.falling = false;
	this.time = 0;
	
	this.cargoAppearance = new CGFappearance(this.scene);;
	this.cargoAppearance.loadTexture("../resources/images/cargo.png");

	this.steelBoxApperance = new CGFappearance(this.scene);;
	this.steelBoxApperance.loadTexture("../resources/images/steel-box.png");
	
	this.appearance = this.cargoAppearance;
};

MyCargo.prototype = Object.create(CGFobject.prototype);
MyCargo.prototype.constructor=MyCargo;

MyCargo.prototype.display = function () {
	this.scene.translate(this.x , this.y , this.z);
	
	this.scene.pushMatrix();
	this.appearance.apply();
	this.body.display();
	this.scene.popMatrix();

	this.scene.materialDefault.apply();
};

MyCargo.prototype.getX = function() {
	return this.x;
}

MyCargo.prototype.getZ = function() {
	return this.z;
}

MyCargo.prototype.checkColision = function() {
	var tolerance = 0.5;

	if(this.x >= this.scene.drone.x - tolerance && this.x <= this.scene.drone.x + tolerance &&
		this.z >= this.scene.drone.z - tolerance && this.z <= this.scene.drone.z + tolerance &&
		this.y + 0.5 >= this.scene.drone.getHeight() - tolerance && this.y + 0.5 <= this.scene.drone.getHeight() + tolerance){
		this.isHooked = true;
		this.appearance = this.steelBoxApperance;
	}
		
	if(this.x >= this.scene.target.getX() - tolerance && this.x <= this.scene.target.getX() + tolerance &&
		this.z >= this.scene.target.getZ() - tolerance && this.z <= this.scene.target.getZ() + tolerance  &&
		this.y + 0.5  <= 1){
		this.isHooked = false;
		this.falling = true;
		this.appearance = this.cargoAppearance;
	}
}

MyCargo.prototype.update = function(currTime) {
	if(this.time == 0)
		this.time = currTime;

	this.checkColision();
		
	if(this.isHooked){
		this.x = this.scene.drone.x;
		this.z = this.scene.drone.z;
		this.y = this.scene.drone.getHeight() - 0.5;
	}
	else if (this.falling){
		var diffTime = currTime - this.time;
		this.y -= 0.01*diffTime;
	}

	if(this.y <= 0.5){
		this.falling = false;
		this.y = 0.5;
	}

	this.time = currTime;
}
/**
 * MyCargo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyCargo(scene) {
	CGFobject.call(this, scene);

	this.isHooked = false;

	this.body= new MyUnitCubeQuad(this.scene);
	this.x = 5.0;
	this.y = 0.5;
	this.z = 5.0;
	
	this.cargoAppearance = new CGFappearance(this.scene);;
	this.cargoAppearance.loadTexture("../resources/images/cargo.png");
};

MyCargo.prototype = Object.create(CGFobject.prototype);
MyCargo.prototype.constructor=MyCargo;

MyCargo.prototype.display = function () {
	this.scene.translate(this.x , this.y , this.z);
	
	this.scene.pushMatrix();
	this.cargoAppearance.apply();
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

MyCargo.prototype.update = function() {
	if(this.x >= this.scene.drone.x - 1 && this.x <= this.scene.drone.x + 1 &&
		this.z >= this.scene.drone.z - 1 && this.z <= this.scene.drone.z + 1)
		this.isHooked = true;
		
	if(this.x >= this.scene.target.x - 0.5 && this.x <= this.scene.target.x + 0.5 &&
		this.z >= this.scene.target.z - 0.5 && this.z <= this.scene.target.z + 0.5)
		this.isHooked = false;
	
	if(this.isHooked){
		this.x = this.scene.drone.x;
		this.z = this.scene.drone.z;
	}
	else
		this.y = 0.5;
}
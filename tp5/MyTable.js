/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.cube= new MyUnitCubeQuad(this.scene);

	// Materials
	this.materialDefault = new CGFappearance(this.scene);
	
	this.tableAppearance = new CGFappearance(this.scene);
	this.tableAppearance.setAmbient(0.3,0.3,0.3,1);
	this.tableAppearance.setDiffuse(0.6, 0.6, 0.6 ,1);
	this.tableAppearance.setSpecular(0.1,0.1,0.1,1);
	this.tableAppearance.setShininess(5);
	this.tableAppearance.loadTexture("../resources/images/table.png");

	this.metal = new CGFappearance(this.scene);
	this.metal.setAmbient(0.5,0.5,0.5,1);
	this.metal.setDiffuse(0.839216, 0.839216, 0.839216,1);
	this.metal.setSpecular(2,2,2,1);	
	this.metal.setShininess(120);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {

	var deg2rad=Math.PI/180.0;

	//Table legs
	this.metal.apply();
	
	this.scene.pushMatrix();
	this.scene.translate(2,1.75,1);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(2,1.75,-1);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-2,1.75,1);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-2,1.75,-1);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();
	
	//Table top
	
	this.scene.pushMatrix();
	this.scene.translate(0,3.65,0);
	this.scene.scale(5,0.3,3);
	this.tableAppearance.apply();
	this.cube.display();
	this.scene.popMatrix();
	
	this.materialDefault.apply();
};
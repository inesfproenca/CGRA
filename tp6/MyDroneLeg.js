function MyDroneLeg(scene) {
	CGFobject.call(this,scene);

	this.scene = scene;

	this.conection = new MyCurvedSurface(this.scene, 8);
	this.base = new MyUnitCubeQuad(this.scene);

};

MyDroneLeg.prototype = Object.create(CGFobject.prototype);
MyDroneLeg.prototype.constructor=MyDroneLeg;

MyDroneLeg.prototype.display = function(){
	
	//Draw base
	this.scene.pushMatrix();
		this.scene.translate(0.35, 0.025, 0);
		this.scene.scale(0.15,0.05,1.4);
		this.base.display();
	this.scene.popMatrix();

	//Draw connection
	this.scene.pushMatrix();
		this.scene.translate(0, 0.05, 0.25);
		this.scene.scale(0.35,0.3,0.15);
		this.conection.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0.05, -0.375);
		this.scene.scale(0.35,0.3,0.15);
		this.conection.display();
	this.scene.popMatrix();
}
function MyDroneLeg(scene) {
	CGFobject.call(this,scene);

	this.scene = scene;

	this.conection = new MyCurvedSurface(this.scene, 4);
	this.base = new MyPrism(this.scene,4 ,1);

};

MyDroneLeg.prototype = Object.create(CGFobject.prototype);
MyDroneLeg.prototype.constructor=MyDroneLeg;

MyDroneLeg.prototype.display = function(){
	
	//Draw base
	this.scene.pushMatrix();
		this.scene.translate(0, 0, -.7);
		this.scene.scale(0.1,0.05,1.4);
		this.scene.rotate(-Math.PI/4, 0,0,1);
		this.base.display();
	this.scene.popMatrix();

	//Draw connection
	this.scene.pushMatrix();
		this.scene.translate(0.06, 0.05, 0);
		this.scene.rotate(-Math.PI/2, 0,1,0);
		this.scene.scale(0.7,0.3,.15);
		this.conection.display();
	this.scene.popMatrix();
}
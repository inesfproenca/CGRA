function MyDroneHook(scene, ang, height, ab) {
	CGFobject.call(this, scene, ang);

	this.h=height; //altura do cabo
	this.ab=ab; //abetura do gancho (0 a 90)

	this.body= new MyCylinder(this.scene, 20, 1);
	this.leg = new MyHookLeg(scene,ang);


};

MyDroneHook.prototype = Object.create(CGFobject.prototype);
MyDroneHook.prototype.constructor=MyDroneHook;

MyDroneHook.prototype.getLength = function (){
	return this.length;
}

MyDroneHook.prototype.down = function(){
	this.h += 0.3;

	if(this.h*0.1>this.scene.drone.height)
		this.h=this.scene.drone.height/0.1;

}

MyDroneHook.prototype.up = function(){
	this.h -= 0.3;
	
	if (this.h<4)
		this.h=4;
}

MyDroneHook.prototype.display = function () {

	this.scene.pushMatrix();
	this.scene.scale(0.3,this.h,0.3);
	this.scene.rotate(-Math.PI/2,1,0,0);
	this.body.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(-this.ab,1,0,0);
	this.leg.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(this.ab,0,0,1);
	this.scene.rotate(Math.PI/2,0,1,0);
	this.leg.display();
	this.scene.popMatrix();	

	this.scene.pushMatrix();
	this.scene.rotate(this.ab,1,0,0);
	this.scene.rotate(Math.PI,0,1,0);
	this.leg.display();
	this.scene.popMatrix();	

	this.scene.pushMatrix();
	this.scene.rotate(-this.ab,0,0,1);
	this.scene.rotate(3*Math.PI/2,0,1,0);
	this.leg.display();
	this.scene.popMatrix();	
};

MyDroneHook.prototype.update = function(currTime) {

};
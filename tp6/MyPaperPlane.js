function MyPaperPlane(scene) {
	CGFobject.call(this,scene);

	this.state=0;
	this.dist=12;
	this.height=4;
	this.angle=0;

	this.initBuffers();
};

MyPaperPlane.prototype = Object.create(CGFobject.prototype);
MyPaperPlane.prototype.constructor=MyPaperPlane;

MyPaperPlane.prototype.update=function(){
	if(this.state==0){
		this.dist=this.dist-0.3;
		if(this.height+Math.random()*0.1<=8)
			this.height=this.height+Math.random()*0.1;
		this.angle=(0.5-Math.random())*0.1+this.angle;
	}

	if(this.state==1){
		this.dist=1;
		this.angle=Math.PI/2;
		if(this.height>2)
			this.height--;
		else
		 	this.height=1;
	}

	if(this.state==2){
		this.dist=2;
		this.angle=0;
		this.height=0.5
	}

	if(this.dist<2)
		this.state=1;

	if(this.height<=1)
		this.state=2;
}

MyPaperPlane.prototype.initBuffers = function () {


	this.vertices = [
            -1, 0, 0,
            0, 0.1, -0.5,
            0, 0, 0,
            0, 0.1, 0.5,
            0,-0.3, 0
			];

	this.indices = [
            2, 1, 0,
            0, 1, 2,
            2, 0, 3,
            3, 0, 2,
            0, 2, 4,
            4, 2, 0,
		
        ];

	this.normals = [
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0,0,-1
	];

	this.texCoords = [
		0, 0,
		1,0.5,
		1,0,
		1,0.5,
		1,0.5,
	];


		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

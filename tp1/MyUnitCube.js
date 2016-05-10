/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0.5,	//0
            0.5, -0.5, 0.5, 	//1
            -0.5, 0.5, 0.5,		//2
            0.5, 0.5, 0.5,		//3
            -0.5, -0.5, -0.5,	//4
            0.5, -0.5, -0.5,	//5
            -0.5, 0.5, -0.5,	//6
            0.5, 0.5, -0.5		//7
			];

	this.indices = [
			//Face em z = 0.5
            0, 1, 2, 
			3, 2, 1,
			//Face em z = -0.5
			6, 5, 4,
			5, 6, 7,
			//Face in x = 0.5
			5, 3, 1,
			3, 5, 7,
			//Face in x = -0.5
			0, 2, 4,
			6, 4, 2,
			//Face in y = 0.5
			2, 3, 6,
			7, 6, 3,
			//Face in y = -0.5
			4, 1, 0,
			1, 4, 5,
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

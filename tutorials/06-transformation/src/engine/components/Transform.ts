import { vec3, quat, mat4 } from 'gl-matrix';

export default class Transform {

    _gl: WebGL2RenderingContext;
    _position: vec3;
    _rotation: quat;
    _scale: vec3;
    _localTransformationMatrix: mat4;
    _updated: boolean;

    constructor(gl: WebGL2RenderingContext) {
        this._gl = gl;
        this._position = vec3.create();
        this._rotation = quat.create();
        this._scale = vec3.fromValues(1, 1, 1);
        this._localTransformationMatrix = mat4.create();
        this._updated = false;
    }

    getTransformationMatrix(): mat4 {
        if (!this._updated)
            return this._localTransformationMatrix;
        mat4.fromRotationTranslationScale(this._localTransformationMatrix, 
            this._rotation, this._position, this._scale);
        this._updated = false;
        return this._localTransformationMatrix;
    }

    setPosition(position: vec3): void {
        if (!vec3.equals(this._position, position)) {
            vec3.copy(this._position, position);
            this._updated = true;
        }
    }
    setRotation(rotation: quat): void {
        if (!quat.equals(this._rotation, rotation)) {
            quat.copy(this._rotation, rotation);
            this._updated = true;
        }
    }
    setScale(scale: vec3): void {
        if (!vec3.equals(this._scale, scale)) {
            vec3.copy(this._scale, scale);
            this._updated = true;
        }
    }

    rotateX(angle: number): void {
        quat.rotateX(this._rotation, this._rotation, angle);
        this._updated = true;
    }

    rotateY(angle: number): void {
        quat.rotateY(this._rotation, this._rotation, angle);
        this._updated = true;
    }

    rotateZ(angle: number): void {
        quat.rotateZ(this._rotation, this._rotation, angle);
        this._updated = true;
    }

    getPosition(): vec3 { return this._position; }
    getRotation(): quat { return this._rotation; }
    getScale(): vec3 { return this._scale; }

}
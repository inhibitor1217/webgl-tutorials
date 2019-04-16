import { vec3, quat, mat4 } from 'gl-matrix';

export default class Transform {

    _position: vec3;                  /* Current position. */
    _rotation: quat;                  /* Current rotation, expressed by quaternion. */
    _scale: vec3;                     /* Current scale. */
    _localTransformationMatrix: mat4; /* Storage of transformation matrix, for efficiency. */
    _updated: boolean;                /* Flag for updated position, rotation, or scale. */

    constructor() {
        this._position = vec3.create();
        this._rotation = quat.create();
        this._scale = vec3.fromValues(1, 1, 1);
        this._localTransformationMatrix = mat4.create();
        this._updated = false;
    }

    /* mat4 Transform::getTransformationMatrix()
     * If necessary, computes the transformation matrix from
     * position, rotation, and scale.
     * Returns current transformation matrix. */
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

    /* void Transform::rotate[XYZ](number)
     * Rotate the transform respect to (x, y, z)-axis
     * by the given angle. */
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
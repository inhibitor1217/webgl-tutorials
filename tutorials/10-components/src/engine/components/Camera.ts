import { mat4 } from 'gl-matrix';
import Component from 'engine/components/Component';
import Transform from 'engine/components/Transform';

export default class Camera extends Component {

    _isCamera : boolean = true;
    _requiredComponents = [ 'transform' ];

    near        : number = 0.1;
    far         : number = 120.0;
    fov         : number = 0.5 * Math.PI;
    aspectRatio : number = 1.33;
    
    _projection : mat4;

    _transform : Transform;

    constructor() {
        super('camera');
    }

    init() {
        this._transform = this._gameObject.getComponent('transform') as Transform;
    }

    getProjection(): mat4 {
        mat4.perspective(this._projection, this.fov, this.aspectRatio, this.near, this.far);
        return this._projection;
    }

    getView(): mat4 {
        return this._transform.getInverseLocalTransform();
    }

}
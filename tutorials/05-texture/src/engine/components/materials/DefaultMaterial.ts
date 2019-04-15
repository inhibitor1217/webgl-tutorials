import Material from 'engine/components/materials/Material';
import Program from 'engine/shaders/Program';
import { vertexShader, fragmentShader } from 'engine/res/DefaultMaterialShaders';

export default class DefaultMaterial extends Material {

    constructor(gl: WebGL2RenderingContext) {
        super(new Program(gl, vertexShader, fragmentShader));
    }

}
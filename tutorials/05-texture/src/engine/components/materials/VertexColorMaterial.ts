import Material from 'engine/components/materials/Material';
import Program from 'engine/shaders/Program';
import { vertexShader, fragmentShader } from 'engine/res/VertexColorMaterialShaders';

export default class VertexColorMaterial extends Material {

    constructor(gl: WebGL2RenderingContext) {
        super(new Program(gl, vertexShader, fragmentShader));
    }

}
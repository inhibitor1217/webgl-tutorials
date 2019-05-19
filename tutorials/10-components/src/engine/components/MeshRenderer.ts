import global from 'global';
import Program from 'engine/shaders/Program';
import ShaderMaster from 'engine/shaders/ShaderMaster';
import Component from 'engine/components/Component';
import Mesh from 'engine/components/Mesh';
import Material from 'engine/components/Material';
import Transform from './Transform';

export default class MeshRenderer extends Component {

    _isMeshRenderer : boolean = true;
    _requiredComponents = [ 'mesh', 'material', 'transform' ];

    _gl: WebGL2RenderingContext;
    _program : Program;

    _mesh      : Mesh;
    _material  : Material;
    _transform : Transform;

    constructor() {
        super('mesh_renderer');
        this._gl = global.get('gl');
    }

    init() {
        this._program   = ShaderMaster.get('DefaultShader');
        this._mesh      = this._gameObject.getComponent('mesh')      as Mesh;
        this._material  = this._gameObject.getComponent('material')  as Material;
        this._transform = this._gameObject.getComponent('transform') as Transform;
    }

    start() {
        this._program.bind();

        /* Bind mesh resources. */
        this._mesh.bind();

        /* Update material attributes and bind resources (if necessary). */
        this._program.setUniform1f('use_texture', this._material.texture2D ? 1 : 0);
        if (this._material.texture2D) {
            this._material.texture2D.bind(this._gl.TEXTURE0);
            this._program.setUniform1i('sampler', 0);
        } else {
            this._program.setUniform3f('diffuse_color', this._material.diffuse.color.r, this._material.diffuse.color.g, this._material.diffuse.color.b);
        }
        this._program.setUniform1f('diffuse_intensity',  this._material.diffuse.intensity);
        this._program.setUniform3f('specular_color',     this._material.specular.color.r, this._material.specular.color.g, this._material.specular.color.b);
        this._program.setUniform1f('specular_intensity', this._material.specular.intensity);
        this._program.setUniform1f('specular_exponent',  this._material.specular.exponent);
        this._program.setUniform1f('ambient_intensity',  this._material.ambient.intensity);

        /* Update local transformation. */
        this._program.setUniformMatrix4fv('transformation', this._transform.getLocalTransform());
    }

    stop() {
        this._program.unbind();

        /* Unbind mesh resources. */
        this._mesh.unbind();

        /* Unbind material resources. */
        if (this._material.texture2D) {
            this._material.texture2D.unbind(this._gl.TEXTURE0);
        }
    }

    render(): void {
        this._mesh.draw();
    }

    setShaderProgram(shaderProgramName: string): void {
        this._program = ShaderMaster.get(shaderProgramName);
    }

}
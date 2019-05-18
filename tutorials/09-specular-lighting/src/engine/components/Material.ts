import global from 'global';
import Program from 'engine/shaders/Program';
import Texture2D from 'engine/textures/Texture2D';

export default class Material {
    
    _gl: WebGL2RenderingContext;
    _texture2D: Texture2D;

    diffuse: {
        diffuseColor: { r: number, g: number, b: number },
        diffuseIntensity: number
    };
    specular: {
        specularColor: { r: number, g: number, b: number },
        specularIntensity: number,
        specularExponent: number
    };
    ambient: {
        ambientIntensity: number
    };

    constructor() {
        this._gl = global.get('gl');

        /* Initialize material attributes. */
        this.diffuse = {
            diffuseColor: { r: 1.0, g: 1.0, b: 1.0 },
            diffuseIntensity: 1.0
        };
        this.specular = {
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            specularIntensity: 1.0,
            specularExponent: 50.0
        };
        this.ambient = {
            ambientIntensity: 1.0
        };
    }

    start(program: Program): void {
        program.start();
        program.setUniform1f('use_texture', this._texture2D ? 1 : 0);
        if (this._texture2D) {
            this._texture2D.bind(this._gl.TEXTURE0);
            program.setUniform1i('sampler', 0);
        } else {
            program.setUniform3f('diffuse_color', this.diffuse.diffuseColor.r, this.diffuse.diffuseColor.g, this.diffuse.diffuseColor.b);
        }
        program.setUniform1f('diffuse_intensity',  this.diffuse.diffuseIntensity);
        program.setUniform3f('specular_color',     this.specular.specularColor.r, this.specular.specularColor.g, this.specular.specularColor.b);
        program.setUniform1f('specular_intensity', this.specular.specularIntensity);
        program.setUniform1f('specular_exponent',  this.specular.specularExponent);
        program.setUniform1f('ambient_intensity',  this.ambient.ambientIntensity);
    }

    stop(program: Program): void {
        program.stop();
        if (this._texture2D) {
            this._texture2D.unbind(this._gl.TEXTURE0);
        }
    }

    getTexture(): Texture2D { return this._texture2D; }
    setTexture(texture2D: Texture2D): void { this._texture2D = texture2D; }

}
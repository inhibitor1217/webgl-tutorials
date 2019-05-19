import global from 'global';
import Program from 'engine/shaders/Program';
import Texture2D from 'engine/textures/Texture2D';
import Color from 'engine/utils/Color';

export default class Material {
    
    _gl: WebGL2RenderingContext;
    _texture2D: Texture2D;

    diffuse: {
        color: Color,
        intensity: number
    };
    specular: {
        color: Color,
        intensity: number,
        exponent: number
    };
    ambient: {
        intensity: number
    };

    constructor() {
        this._gl = global.get('gl');

        /* Initialize material attributes. */
        this.diffuse = {
            color: new Color(0xFFFFFF),
            intensity: 1.0
        };
        this.specular = {
            color: new Color(0xFFFFFF),
            intensity: 1.0,
            exponent: 50.0
        };
        this.ambient = {
            intensity: 1.0
        };
    }

    start(program: Program): void {
        program.start();
        program.setUniform1f('use_texture', this._texture2D ? 1 : 0);
        if (this._texture2D) {
            this._texture2D.bind(this._gl.TEXTURE0);
            program.setUniform1i('sampler', 0);
        } else {
            program.setUniform3f('diffuse_color', this.diffuse.color.r, this.diffuse.color.g, this.diffuse.color.b);
        }
        program.setUniform1f('diffuse_intensity',  this.diffuse.intensity);
        program.setUniform3f('specular_color',     this.specular.color.r, this.specular.color.g, this.specular.color.b);
        program.setUniform1f('specular_intensity', this.specular.intensity);
        program.setUniform1f('specular_exponent',  this.specular.exponent);
        program.setUniform1f('ambient_intensity',  this.ambient.intensity);
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
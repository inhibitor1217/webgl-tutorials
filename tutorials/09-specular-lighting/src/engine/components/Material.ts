import global from 'global';
import Program from 'engine/shaders/Program';
import Texture2D from 'engine/textures/Texture2D';

export default class Material {
    
    _gl: WebGL2RenderingContext;
    _color: Array<number>;
    _texture2D: Texture2D;

    constructor() {
        this._gl = global.get('gl');
    }

    start(program: Program): void {
        program.start();
        program.setUniform1f('use_texture', this._texture2D ? 1 : 0);
        if (this._texture2D) {
            this._texture2D.bind(this._gl.TEXTURE0);
            program.setUniform1i('sampler', 0);
        } else {
            program.setUniform3f('diffuse_color', this._color[0], this._color[1], this._color[2]);
        }
    }

    stop(program: Program): void {
        program.stop();
        if (this._texture2D) {
            this._texture2D.unbind(this._gl.TEXTURE0);
        }
    }

    getColor(): Array<number> { return this._color; }
    setColor(r: number, g: number, b: number): void { this._color = [r, g, b]; }

    getTexture(): Texture2D { return this._texture2D; }
    setTexture(texture2D: Texture2D): void { this._texture2D = texture2D; }

}
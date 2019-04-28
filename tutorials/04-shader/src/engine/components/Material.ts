import global from 'global';
import Program from 'engine/shaders/Program';

export default class Material {
    
    _gl: WebGL2RenderingContext;
    _color: Array<number>;

    constructor() {
        this._gl = global.get('gl');
    }

    start(program: Program): void {
        program.start();
        program.setUniform3f('color', this._color[0], this._color[1], this._color[2]);
    }

    stop(program: Program): void {
        program.stop();
    }

    getColor(): Array<number> { return this._color; }
    setColor(r: number, g: number, b: number): void { this._color = [r, g, b]; }

}
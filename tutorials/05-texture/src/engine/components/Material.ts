import global from 'global';
import Program from 'engine/shaders/Program';
import Texture2D from 'engine/textures/Texture2D';

export default class Material {
    
    _gl: WebGL2RenderingContext;
    _program: Program;
    _color: Array<number>;
    _texture2D: Texture2D;
    _uniformLocations: {[key: string]: WebGLUniformLocation};

    constructor(program: Program) {
        this._gl = global.get('gl');
        this._program = program;
        this._uniformLocations = {};
    }

    start(): void {
        this._program.start();
        this._setUniform1f('use_texture', this._texture2D ? 1 : 0);
        if (this._texture2D) {
            this._texture2D.bind(this._gl.TEXTURE0);
            this._setUniform1i('sampler', 0);
        } else {
            this._setUniform3f('color', this._color[0], this._color[1], this._color[2]);
        }
    }

    stop(): void {
        this._program.stop();
        if (this._texture2D) {
            this._texture2D.unbind(this._gl.TEXTURE0);
        }
    }

    getColor(): Array<number> { return this._color; }
    setColor(r: number, g: number, b: number): void { this._color = [r, g, b]; }

    getTexture(): Texture2D { return this._texture2D; }
    setTexture(texture2D: Texture2D): void { this._texture2D = texture2D; }

    getProgram(): Program { return this._program; }

    _setUniform1f(variableName: string, v0: number): void {
        this._gl.uniform1f(this._getUniformLocation(variableName), v0);
    }
    _setUniform2f(variableName: string, v0: number, v1: number): void {
        this._gl.uniform2f(this._getUniformLocation(variableName), v0, v1);
    }
    _setUniform3f(variableName: string, v0: number, v1: number, v2: number): void {
        this._gl.uniform3f(this._getUniformLocation(variableName), v0, v1, v2);
    }
    _setUniform4f(variableName: string, v0: number, v1: number, v2: number, v3: number): void {
        this._gl.uniform4f(this._getUniformLocation(variableName), v0, v1, v2, v3);
    }
    _setUniform1i(variableName: string, v0: number): void {
        this._gl.uniform1i(this._getUniformLocation(variableName), v0);
    }

    _getUniformLocation(variableName: string): WebGLUniformLocation {
        if (!this._uniformLocations[variableName])
            this._uniformLocations[variableName] = this._gl.getUniformLocation(this._program.getProgram(), variableName);
        return this._uniformLocations[variableName]; 
    }

}
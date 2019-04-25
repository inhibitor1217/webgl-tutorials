import global from 'global';
import Program from 'engine/shaders/Program';

export default class Material {
    
    _gl: WebGL2RenderingContext;
    _program: Program;
    _uniformLocations: {[key: string]: WebGLUniformLocation};

    constructor(program: Program) {
        this._gl = global.get('gl');
        this._program = program;
        this._uniformLocations = {};
    }

    start(): void {
        this._program.start();
    }

    stop(): void {
        this._program.stop();
    }

    setColor(r: number, g: number, b: number) {
        this._setUniform3f('color', r, g, b);
    }
    
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

    _getUniformLocation(variableName: string): WebGLUniformLocation {
        if (!this._uniformLocations[variableName])
            this._uniformLocations[variableName] = this._gl.getUniformLocation(this._program.getProgram(), variableName);
        return this._uniformLocations[variableName]; 
    }

}
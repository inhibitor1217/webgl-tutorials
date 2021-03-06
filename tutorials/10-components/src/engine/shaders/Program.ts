import global from 'global';

export default class Program {

    _gl: WebGL2RenderingContext;
    _vertexShader: WebGLShader;
    _fragmentShader: WebGLShader;
    _program: WebGLProgram;
    _uniformLocations: {[key: string]: WebGLUniformLocation};

    constructor(vertexShaderSource: string, fragmentShaderSource: string) {
        this._gl = global.get('gl');

        this._vertexShader = this._gl.createShader(this._gl.VERTEX_SHADER);
        this._gl.shaderSource(this._vertexShader, vertexShaderSource);
        this._gl.compileShader(this._vertexShader);
        if (!this._gl.getShaderParameter(this._vertexShader, this._gl.COMPILE_STATUS)) {
            console.log(this._gl.getShaderInfoLog(this._vertexShader));
            this._gl.deleteShader(this._vertexShader);
            throw "Error occurred while compiling vertex shader";
        }

        this._fragmentShader = this._gl.createShader(this._gl.FRAGMENT_SHADER);
        this._gl.shaderSource(this._fragmentShader, fragmentShaderSource);
        this._gl.compileShader(this._fragmentShader);
        if (!this._gl.getShaderParameter(this._fragmentShader, this._gl.COMPILE_STATUS)) {
            console.log(this._gl.getShaderInfoLog(this._fragmentShader));
            this._gl.deleteShader(this._vertexShader);
            this._gl.deleteShader(this._fragmentShader);
            throw "Error occurred while compiling fragment shader.";
        }

        this._program = this._gl.createProgram();
        this._gl.attachShader(this._program, this._vertexShader);
        this._gl.attachShader(this._program, this._fragmentShader);
        this._gl.linkProgram(this._program);
        if (!this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS)) {
            console.log(this._gl.getProgramInfoLog(this._program));
            this._gl.deleteProgram(this._program);
            this._gl.deleteShader(this._vertexShader);
            this._gl.deleteShader(this._fragmentShader);
            throw "Error occurred while linking shaders";
        }

        this._uniformLocations = {};
    }

    bind(): void {
        this._gl.useProgram(this._program);
    }

    unbind(): void {
        this._gl.useProgram(null);
    }

    delete(): void {
        this._gl.deleteProgram(this._program);
        this._gl.deleteShader(this._vertexShader);
        this._gl.deleteShader(this._fragmentShader);
    }

    getProgram(): WebGLProgram { return this._program; }

    setUniform1f(variableName: string, v0: number): void {
        this._gl.useProgram(this._program);
        this._gl.uniform1f(this._getUniformLocation(variableName), v0);
    }
    setUniform2f(variableName: string, v0: number, v1: number): void {
        this._gl.useProgram(this._program);
        this._gl.uniform2f(this._getUniformLocation(variableName), v0, v1);
    }
    setUniform3f(variableName: string, v0: number, v1: number, v2: number): void {
        this._gl.useProgram(this._program);
        this._gl.uniform3f(this._getUniformLocation(variableName), v0, v1, v2);
    }
    setUniform4f(variableName: string, v0: number, v1: number, v2: number, v3: number): void {
        this._gl.useProgram(this._program);
        this._gl.uniform4f(this._getUniformLocation(variableName), v0, v1, v2, v3);
    }
    setUniform1i(variableName: string, v0: number): void {
        this._gl.useProgram(this._program);
        this._gl.uniform1i(this._getUniformLocation(variableName), v0);
    }
    setUniformMatrix4fv(variableName: string, value: Float32Array) {
        this._gl.useProgram(this._program);
        this._gl.uniformMatrix4fv(this._getUniformLocation(variableName), false, value);
    }

    _getUniformLocation(variableName: string): WebGLUniformLocation {
        this._gl.useProgram(this._program);
        if (!this._uniformLocations[variableName])
            this._uniformLocations[variableName] = this._gl.getUniformLocation(this._program, variableName);
        return this._uniformLocations[variableName]; 
    }

}
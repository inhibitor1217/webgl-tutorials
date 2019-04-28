import global from 'global';

export default class Program {

    _gl: WebGL2RenderingContext;
    _vertexShader: WebGLShader;
    _fragmentShader: WebGLShader;
    _program: WebGLProgram;
    _uniformLocations: {[key: string]: WebGLUniformLocation};

    _active: boolean;
    _deleted: boolean;

    constructor(vertexShaderSource: string, fragmentShaderSource: string) {
        this._gl = global.get('gl');

        this._vertexShader = this._gl.createShader(this._gl.VERTEX_SHADER);
        this._gl.shaderSource(this._vertexShader, vertexShaderSource);
        this._gl.compileShader(this._vertexShader);
        if (!this._gl.getShaderParameter(this._vertexShader, this._gl.COMPILE_STATUS)) {
            this._gl.deleteShader(this._vertexShader);
            console.log(this._gl.getShaderInfoLog(this._vertexShader));
            throw "Error occurred while compiling vertex shader";
        }

        this._fragmentShader = this._gl.createShader(this._gl.FRAGMENT_SHADER);
        this._gl.shaderSource(this._fragmentShader, fragmentShaderSource);
        this._gl.compileShader(this._fragmentShader);
        if (!this._gl.getShaderParameter(this._fragmentShader, this._gl.COMPILE_STATUS)) {
            this._gl.deleteShader(this._vertexShader);
            this._gl.deleteShader(this._fragmentShader);
            console.log(this._gl.getShaderInfoLog(this._fragmentShader));
            throw "Error occurred while compiling fragment shader.";
        }

        this._program = this._gl.createProgram();
        this._gl.attachShader(this._program, this._vertexShader);
        this._gl.attachShader(this._program, this._fragmentShader);
        this._gl.linkProgram(this._program);
        if (!this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS)) {
            this._gl.deleteProgram(this._program);
            this._gl.deleteShader(this._vertexShader);
            this._gl.deleteShader(this._fragmentShader);
            console.log(this._gl.getProgramInfoLog(this._program));
            throw "Error occurred while linking shaders";
        }

        this._uniformLocations = {};
    }

    start(): void {
        if (!this._deleted) {
            this._active = true;
            this._gl.useProgram(this._program);
        }
    }

    stop(): void {
        if (!this._deleted) {
            this._active = false;
            this._gl.useProgram(null);
        }
    }

    delete(): void {
        if (this._deleted)
            return;
        if (this._active)
            this._gl.useProgram(null);
        this._gl.deleteProgram(this._program);
        this._gl.deleteShader(this._vertexShader);
        this._gl.deleteShader(this._fragmentShader);
        this._deleted = true;
    }

    getProgram(): WebGLProgram { return this._program; }

    setUniform1f(variableName: string, v0: number): void {
        if (!this._active)
            this._gl.useProgram(this._program);
        this._gl.uniform1f(this._getUniformLocation(variableName), v0);
    }
    setUniform2f(variableName: string, v0: number, v1: number): void {
        if (!this._active)
            this._gl.useProgram(this._program);
        this._gl.uniform2f(this._getUniformLocation(variableName), v0, v1);
    }
    setUniform3f(variableName: string, v0: number, v1: number, v2: number): void {
        if (!this._active)
            this._gl.useProgram(this._program);
        this._gl.uniform3f(this._getUniformLocation(variableName), v0, v1, v2);
    }
    setUniform4f(variableName: string, v0: number, v1: number, v2: number, v3: number): void {
        if (!this._active)
            this._gl.useProgram(this._program);
        this._gl.uniform4f(this._getUniformLocation(variableName), v0, v1, v2, v3);
    }
    setUniform1i(variableName: string, v0: number): void {
        if (!this._active)
            this._gl.useProgram(this._program);
        this._gl.uniform1i(this._getUniformLocation(variableName), v0);
    }

    _getUniformLocation(variableName: string): WebGLUniformLocation {
        if (!this._active)
            this._gl.useProgram(this._program);
        if (!this._uniformLocations[variableName])
            this._uniformLocations[variableName] = this._gl.getUniformLocation(this._program, variableName);
        return this._uniformLocations[variableName]; 
    }

}
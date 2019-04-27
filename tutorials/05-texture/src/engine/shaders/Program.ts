import global from 'global';

export default class Program {

    _gl: WebGL2RenderingContext;
    _vertexShader: WebGLShader;
    _fragmentShader: WebGLShader;
    _program: WebGLProgram;
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
    }

    start(): void {
        if (!this._deleted)
            this._gl.useProgram(this._program);
    }

    stop(): void {
        if (!this._deleted)
            this._gl.useProgram(null);
    }

    delete(): void {
        if (this._deleted)
            return;
        this._gl.deleteProgram(this._program);
        this._gl.deleteShader(this._vertexShader);
        this._gl.deleteShader(this._fragmentShader);
        this._deleted = true;
    }

    getProgram(): WebGLProgram { return this._program; }

}
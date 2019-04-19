import global from 'global';

export default class Program {

    _gl: WebGL2RenderingContext    /* Reference to WebGL Context. */
    _program: WebGLProgram;        /* WebGL program layered by this class. */
    _vertexShader: WebGLShader;    /* Vertex shader of the program. */
    _fragmentShader: WebGLShader;  /* Fragment shader of the program. */
    _vertexShaderSource: string;   /* Source string of the vertex shader. */
    _fragmentShaderSource: string; /* Source string of the fragment shader. */

    constructor(vertexShaderSource: string, fragmentShaderSource: string) {
        this._gl = global.get('gl');
        this._vertexShaderSource = vertexShaderSource;
        this._fragmentShaderSource = fragmentShaderSource;
    }

    /* void Program::generate()
     * This method compiles the shader sources and link them
     * into a program. */
    generate(): void {
        /* Compile the shader source into WebGLShader object. */
        this._vertexShader = this._createShader(this._gl.VERTEX_SHADER, this._vertexShaderSource);
        this._fragmentShader = this._createShader(this._gl.FRAGMENT_SHADER, this._fragmentShaderSource);

        /* Validation for compile errors. */
        if (!this._vertexShader)
            throw "Program::generate failed: compile error at vertex shader";
        if (!this._fragmentShader)
            throw "Program::generate failed: compile error at fragment shader";

        /* Link the shaders into WebGLProgram object. */
        this._program = this._gl.createProgram();
        this._gl.attachShader(this._program, this._vertexShader);
        this._gl.attachShader(this._program, this._fragmentShader);
        this._gl.linkProgram(this._program);
        if (!this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS)) {
            /* Link failed. */
            console.log(this._gl.getProgramInfoLog(this._program));
            this._gl.deleteProgram(this._program);
            this._gl.deleteShader(this._vertexShader);
            this._gl.deleteShader(this._fragmentShader);
            throw "Program::generate failed: link failed";
        }
    }

    /* void Program::release()
     * This method is a clean-up method when the program is no
     * longer needed in the application.
     * Deletes the shader and program attached to this object. */
    release(): void {
        /* Detach the shaders and delete the program. */
        if (this._program) {
            this._gl.detachShader(this._program, this._vertexShader);
            this._gl.detachShader(this._program, this._fragmentShader);
            this._gl.deleteProgram(this._program);
        }

        /* Delete the shaders. */
        if (this._vertexShader)
            this._gl.deleteShader(this._vertexShader);
        if (this._fragmentShader)
            this._gl.deleteShader(this._fragmentShader)
    }

    /* void Program::start()
     * This method is called before the application needs to render
     * using this shader program.
     * Binds WebGL context to the program. */
    start(): void {
        this._gl.useProgram(this._program);
    }

    /* void Program::stop()
     * This method is used when the application finished rendering
     * using this shader program.
     * Unbinds WebGL context to the program. */
    stop(): void {
        this._gl.useProgram(null);
    }

    /* WebGLShader Program::_createShader(GLenum, string)
     * This private method compiles the shader source and returns it.
     * null is returned for failure. */
    _createShader(type: GLenum, source: string): WebGLShader | null {
        const shader = this._gl.createShader(type);
        this._gl.shaderSource(shader, source);
        this._gl.compileShader(shader);
        if (this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS))
            /* Compile success. */
            return shader;
        else {
            /* Compile failed. */
            console.log(this._gl.getShaderInfoLog(shader));
            this._gl.deleteShader(shader);
            return null;
        }
    }

}
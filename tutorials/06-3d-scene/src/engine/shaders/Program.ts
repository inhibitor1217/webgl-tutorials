
export default class Program {

    _gl: WebGL2RenderingContext;   /* Reference to WebGL context. */
    _program: WebGLProgram;        /* WebGL program layered by this class. */
    _vertexShader: WebGLShader;    /* Vertex shader of the program. */
    _fragmentShader: WebGLShader;  /* Fragment shader of the program. */
    _vertexShaderSource: string;   /* Source string of the vertex shader. */
    _fragmentShaderSource: string; /* Source string of the fragment shader. */

    constructor(
        gl: WebGL2RenderingContext, 
        vertexShaderSource: string,
        fragmentShaderSource: string) {
        this._gl = gl;
        this._vertexShaderSource = vertexShaderSource;
        this._fragmentShaderSource = fragmentShaderSource;
    }

    /* void Program::generate()
     * This method compiles the shader sources and link them
     * into a program. */
    generate(): void {
        /* Release previous resources in case of duplicate generation. */
        this.release();

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
            this._program = null;
        }

        /* Delete the shaders. */
        if (this._vertexShader) {
            this._gl.deleteShader(this._vertexShader);
            this._vertexShader = null;
        }
        if (this._fragmentShader) {
            this._gl.deleteShader(this._fragmentShader)
            this._fragmentShader = null;
        }
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

    /* void Program::setUniform[1234][fi][v](string, ...)
     * This method references the location of uniform variable in shader program
     * and modifies the variable to a given value. */
    setUniform1f(name: string, v0: number): void {
        this._gl.uniform1f(this._gl.getUniformLocation(this._program, name), v0); 
    }
    setUniform1fv(name: string, value: Float32Array): void {
        this._gl.uniform1fv(this._gl.getUniformLocation(this._program, name), value);
    }
    setUniform1i(name: string, v0: number): void {
        this._gl.uniform1i(this._gl.getUniformLocation(this._program, name), v0);
    }
    setUniform1iv(name: string, value: Int32Array): void {
        this._gl.uniform1iv(this._gl.getUniformLocation(this._program, name), value);
    }
    setUniform2f(name: string, v0: number, v1: number): void {
        this._gl.uniform2f(this._gl.getUniformLocation(this._program, name), v0, v1);
    }
    setUniform2fv(name: string, value: Float32Array): void {
        this._gl.uniform2fv(this._gl.getUniformLocation(this._program, name), value);
    }
    setUniform2i(name: string, v0: number, v1: number): void {
        this._gl.uniform2i(this._gl.getUniformLocation(this._program, name), v0, v1);
    }
    setUniform2iv(name: string, value: Int32Array): void {
        this._gl.uniform2iv(this._gl.getUniformLocation(this._program, name), value);
    }
    setUniform3f(name: string, v0: number, v1: number, v2: number): void {
        this._gl.uniform3f(this._gl.getUniformLocation(this._program, name), v0, v1, v2);
    }
    setUniform3fv(name: string, value: Float32Array): void {
        this._gl.uniform3fv(this._gl.getUniformLocation(this._program, name), value);
    }
    setUniform3i(name: string, v0: number, v1: number, v2: number): void {
        this._gl.uniform3i(this._gl.getUniformLocation(this._program, name), v0, v1, v2);
    }
    setUniform3iv(name: string, value: Int32Array): void {
        this._gl.uniform3iv(this._gl.getUniformLocation(this._program, name), value);
    }
    setUniform4f(name: string, v0: number, v1: number, v2: number, v3: number): void {
        this._gl.uniform4f(this._gl.getUniformLocation(this._program, name), v0, v1, v2, v3);
    }
    setUniform4fv(name: string, value: Float32Array): void {
        this._gl.uniform4fv(this._gl.getUniformLocation(this._program, name), value);
    }
    setUniform4i(name: string, v0: number, v1: number, v2: number, v3: number): void {
        this._gl.uniform4i(this._gl.getUniformLocation(this._program, name), v0, v1, v2, v3);
    }
    setUniform4iv(name: string, value: Int32Array): void {
        this._gl.uniform4iv(this._gl.getUniformLocation(this._program, name), value);
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
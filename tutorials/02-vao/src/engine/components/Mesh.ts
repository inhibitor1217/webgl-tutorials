import { vertexShader } from "engine/res/DefaultMaterialShaders";

export default class Mesh {

    _gl: WebGL2RenderingContext;                      /* Reference to WebGL context. */
    _vao: WebGLVertexArrayObject;                     /* VAO of the mesh. */
    _vbo: WebGLBuffer;                                /* BO for storing vertex data. */
    _vertexBuffer: ArrayBuffer;                       /* Buffer storing the vertex data before BO creation. */
    _attributes: Array<[GLenum, number]>;             /* Object containing type and size of each attributes. */
    _numVertices: GLsizei;                            /* Number of vertices in this mesh. */
    _drawMode: GLenum;                                /* DrawMode that render refers when rendering this mesh. */

    constructor(gl: WebGL2RenderingContext) {
        this._gl = gl;
        this._attributes = [];
        this._numVertices = 0;
        this._drawMode = this._gl.TRIANGLES;
    }

    /* void Mesh::generate()
     * This method should be called after the application
     * fills the data at vertex buffer and configured attributes.
     * VAO and BOs are created and the vertex buffer is copied to GPU. */
    generate(): void {
        /* Validation. */
        if (this._attributes.length == 0)
            throw "Mesh::generate failed: attributes empty";
        if (this._numVertices == 0)
            throw "Mesh::generate failed: numVertices is zero";
        if (this._vertexBuffer == null)
            throw "Mesh::generate failed: vertexBuffer not set";

        /* Generate Buffer Objects and copy vertexBuffer into GPU. */
        this._vbo = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vbo);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, this._vertexBuffer, this._gl.STATIC_DRAW);

        /* Generate VAO. */
        this._vao = this._gl.createVertexArray();
        this._gl.bindVertexArray(this._vao);
        const vertexBufferSize = this._attributes.map(([type, size]) => 4 * size).reduce((s, x) => s + x);
        let vertexBufferOffset = 0;
        for (const [index, [type, size]] of Object.entries(this._attributes)) {
            this._gl.vertexAttribPointer(Number(index), size, type, false, vertexBufferSize, vertexBufferOffset);
            vertexBufferOffset += 4 * size;
        }

        /* Unbind VAO and BOs. */
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
        this._gl.bindVertexArray(null);
    }

    /* void Mesh::release()
     * This method is a clean-up method when the mesh is no longer 
     * needed in the application.
     * Frees the VAO and BOs attached to the mesh. */
    release(): void {
        /* Free the Buffer Objects. */
        if (this._vbo)
            this._gl.deleteBuffer(this._vbo);
        
        /* Free the VAO. */
        if (this._vao) {
            this._gl.deleteVertexArray(this._vao);
        }
    }

    /* void Mesh::start()
     * This method is called before the application invokes the render call
     * when rendering this mesh.
     * Binds VAO and enable BOs attached to this mesh. */
    start(): void {
        /* Validation. */
        if (!this._vao)
            throw "Mesh::start failed: VAO not generated";

        /* Bind VAO to WebGL context. */
        this._gl.bindVertexArray(this._vao);

        /* Enable BOs attached to this VAO. */
        Object.keys(this._attributes)
            .map(x => Number(x))
            .forEach(index => {
                this._gl.enableVertexAttribArray(index);
            });
    }

    /* void Mesh::stop()
     * This method is called after the application rendered this mesh.
     * Unbinds VAO and disable BOs attached to this mesh. */
    stop(): void {
        /* Validation. */
        if (!this._vao)
            throw "Mesh::start failed: VAO not generated";

        /* Disable BOs attached to this VAO. */
        Object.keys(this._attributes)
            .map(x => Number(x))
            .forEach(index => {
                this._gl.disableVertexAttribArray(index);
            });

        /* Unbind VAO to WebGL Context. */
        this._gl.bindVertexArray(null);
    }

    /* void Mesh::render()
     * Wraps the render call to this mesh. */
    render(): void {
        this._gl.drawArrays(this._drawMode, 0, this._numVertices);
    }

    /* void Mesh::storeBufferFromFloatArray(Float32Array)
     * This method sets the vertex buffer from given Float32Array. */
    storeBufferFromFloat32Array(data: Float32Array): void {
        this._vertexBuffer = data.buffer;
    }

    setAttributes(attributes: Array<[GLenum, number]>) { this._attributes = attributes; }
    setDrawMode(drawMode: GLenum) { this._drawMode = drawMode; }
    setNumVertices(numVertices: number) { this._numVertices = numVertices; }

    getVAO(): WebGLVertexArrayObject { return this._vao; }
    getVBO(): WebGLBuffer { return this._vbo; }
    getDrawMode(): GLenum { return this._drawMode; }
    getNumVertices(): number { return this._numVertices; }

}
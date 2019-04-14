
export default class Mesh {

    _gl: WebGL2RenderingContext;                      /* Reference to WebGL context. */
    _vao: WebGLVertexArrayObject;                     /* VAO of the mesh. */
    _vbo: WebGLBuffer;                                /* BO for storing vertex data. */
    _vertexBuffer: ArrayBuffer;                       /* Buffer storing the vertex data before BO creation. */
    _attributes: { [key: string]: [GLenum, number] }; /* Object containing type and size of each attributes. */
    _numVertices: GLsizei;                            /* Number of vertices in this mesh. */
    _drawMode: GLenum;                                /* DrawMode that render refers when rendering this mesh. */

    constructor(gl: WebGL2RenderingContext) {
        this._gl = gl;
        this._attributes = {};
        this._numVertices = 0;
        this._drawMode = this._gl.TRIANGLES;
    }

    /* void Mesh::generate()
     * This method should be called after the application
     * fills the data at vertex buffer and configured attributes.
     * VAO and BOs are created and the vertex buffer is copied to GPU. */
    generate(): void {
        /* Validation. */
        if (Object.keys(this._attributes).length == 0)
            throw "Mesh::generate failed: attributes empty";
        if (this._numVertices == 0)
            throw "Mesh::generate failed: numVertices is zero";
        if (this._vertexBuffer == null)
            throw "Mesh::generate failed: vertexBuffer not set";

        /* Generate Buffer Objects and copy vertexBuffer into GPU. */
        this._vbo = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vbo);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, this._vertexBuffer, this._gl.STATIC_DRAW);
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);

        /* Generate VAO. */
        this._vao = this._gl.createVertexArray();
        this._gl.bindVertexArray(this._vao);
        const vertexBufferSize = Object.keys(this._attributes)
            .map(attribute => 4 * this._attributes[attribute][1]).reduce((s, x) => s + x);
        let vertexBufferOffset = 0;
        for (const [index, [type, size]] of Object.entries(this._attributes)) {
            this._gl.vertexAttribPointer(Number(index), size, type, false, vertexBufferSize, vertexBufferOffset);
            vertexBufferOffset += 4 * size;
        }
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

    /* void Mesh::storeBufferFromFloatArray(Float32Array)
     * This method sets the vertex buffer from given Float32Array. */
    storeBufferFromFloat32Array(data: Float32Array): void {
        this._vertexBuffer = data.buffer;
    }

    setAttributes(attributes: { [key: string]: [GLenum, number] }) { this._attributes = attributes; }
    setDrawMode(drawMode: GLenum) { this._drawMode = drawMode; }
    setNumVertices(numVertices: number) { this._numVertices = numVertices; }

    getVAO(): WebGLVertexArrayObject { return this._vao; }
    getVBO(): WebGLBuffer { return this._vbo; }
    getDrawMode(): GLenum { return this._drawMode; }
    getNumVertices(): number { return this._numVertices; }

}
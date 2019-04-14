
class Mesh {

    constructor(gl) {
        this._gl = gl;                  /* Reference to WebGL context. */
        this._vao = null;               /* Vertex Array Object of the mesh. */
        this._vbo = null;               /* Buffer Object for storing vertex data. */
        this._vertexBuffer = null;      /* Buffer storing the vertex data. */
        this._attributes = [];          /* List of sizes of each attributes. */
        this._numVertices = 0;          /* Number of vertices in this mesh. */
        this._drawMode = gl.TRIANGLES;  /* DrawMode that render refers when it renders this mesh. */
    }

    generate() {
        if (this._attributes.length == 0)
            throw "Mesh::generate failed: attributes empty";

        /* Generate Buffer Objects and copy vertexBuffer into GPU. */
        this._vbo = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vbo);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, this._vertexBuffer, this._gl.STATIC_DRAW);
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, 0);

        /* Generate VAO. */
        this._vao = this._gl.createVertexArray();
        this._gl.bindVertexArray(this._vao);
        const vertexBufferSize = this._attributes.reduce((s, x) => s + x);
        let vertexBufferOffset = 0;
        for (let i in this._attributes) {
            this._gl.vertexAttribPointer(i, this._attributes[i], 
                gl.FLOAT, gl.FALSE, vertexBufferSize, vertexBufferOffset);
            this._gl.enableVertexAttribArray(i);
            vertexBufferOffset += this._attributes[i];
        }
        this._gl.bindVertexArray(0);
    }

    release() {
        /* Free the Buffer Objects. */
        if (this._vbo)
            this._gl.deleteBuffer(this._vbo);
        
        if (this._vao) {
            /* Release the BOs from VAO. */
            this._gl.bindVertexArray(this._vao);
            for (let i in this._attributes) {
                this._gl.disableVertexAttribArray(i);
            }
            this._gl.bindVertexArray(0);

            /* Free the VAO. */
            this._gl.deleteVertexArray(this._vao);
        }
    }

    setAttributes(attributes) { this._attributes = attributes; }
    setDrawMode(drawMode) { this._drawMode = drawMode; }
    setNumVertices(numVertices) { this._numVertices = numVertices; }

    getVAO() { return this._vao; }
    getVBO() { return this._vbo; }
    getDrawMode() { return this._drawMode; }
    getNumVertices() { return this._numVertices; }

}

export default Mesh;
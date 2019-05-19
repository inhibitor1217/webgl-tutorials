import global from 'global';
import Component from 'engine/components/Component';

export default class Mesh extends Component {

    _isMesh: boolean = true;

    _gl: WebGL2RenderingContext;
    _vao: WebGLVertexArrayObject;
    _vbo: WebGLBuffer;
    _ibo: WebGLBuffer;
    _count: GLsizei;
    _drawMode: GLenum;

    constructor() {
        super('mesh');
        this._gl = global.get('gl');
        this._vao = this._gl.createVertexArray();
        this._vbo = this._gl.createBuffer();
        this._ibo = this._gl.createBuffer();
        this._count = 0;
        this._drawMode = this._gl.TRIANGLES;
    }

    updateVertexBuffer(buffer: ArrayBuffer): void {
        if (this._deleted)
            return;
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vbo);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, buffer, this._gl.STATIC_DRAW);
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
    }

    updateIndexBuffer(buffer: ArrayBuffer): void {
        if (this._deleted)
            return;
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._ibo);
        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, buffer, this._gl.STATIC_DRAW);
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);
    }

    configure(attributes: Array<[GLenum, number]>): void {
        if (this._deleted)
            return;
        if (attributes.length == 0)
            return;

        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vbo);
        this._gl.bindVertexArray(this._vao);

        const type2size = (type: GLenum): GLsizei => {
            if (type == this._gl.BYTE || type == this._gl.UNSIGNED_BYTE)
                return 1;
            if (type == this._gl.SHORT || type == this._gl.UNSIGNED_SHORT || type == this._gl.HALF_FLOAT)
                return 2;
            return 4;
        };

        const stride = attributes.map(([type, size]) => type2size(type) * size).reduce((s, x) => s + x);
        let offset = 0;
        for (const [index, [type, size]] of Object.entries(attributes)) {
            this._gl.vertexAttribPointer(Number(index), size, type, false, stride, offset);
            this._gl.enableVertexAttribArray(Number(index));
            offset += type2size(type) * size;
        }

        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._ibo);

        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
        this._gl.bindVertexArray(null);
    }

    bind(): void {
        this._gl.bindVertexArray(this._vao);
    }

    draw(): void {
        this._gl.drawElements(this._gl.TRIANGLES, this._count, this._gl.UNSIGNED_INT, 0);
    }

    unbind(): void {
        this._gl.bindVertexArray(null);
    }

    delete(): void {
        this._gl.deleteBuffer(this._vbo);
        this._gl.deleteBuffer(this._ibo);
        this._gl.deleteVertexArray(this._vao);
    }

    getDrawMode(): GLenum { return this._drawMode; }
    setDrawMode(drawMode: GLenum): void { this._drawMode = drawMode; }

    getCount(): GLsizei { return this._count; }
    setCount(count: GLsizei): void { this._count = count; }

    getVAO(): WebGLVertexArrayObject { return this._vao; }
    getVBO(): WebGLBuffer { return this._vbo; }
    getIBO(): WebGLBuffer { return this._ibo; }

}
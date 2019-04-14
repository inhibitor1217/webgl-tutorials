import Mesh from './engine/components/Mesh';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

function createShader(gl: WebGL2RenderingContext, type: GLenum, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        return shader;
    else {
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
}

function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (gl.getProgramParameter(program, gl.LINK_STATUS))
        return program;
    else {
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
}

const vs = `
    attribute vec2 position;

    void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const fs = `
    void main() { gl_FragColor = vec4(1, 1, 1, 1); }
`

if (gl) {

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vs);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fs);
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.bindAttribLocation(program, 0, 'position');

    /* glViewPort(x, y, width, height)
     * Specifies the affine transform from normalized device coordinates
     * to window coordinates. */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    /* Initialize frame buffer with color (0, 0, 0, 1). */
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    /* Test code. */
    const mesh = new Mesh(gl);
    mesh.setAttributes({ position: [gl.FLOAT, 2] });
    mesh.storeBufferFromFloat32Array(new Float32Array([
        -0.5,  0.5, -0.5, -0.5,  0.5, -0.5,
         0.5, -0.5,  0.5,  0.5, -0.5,  0.5
    ]));
    mesh.setNumVertices(6);
    mesh.generate();

    gl.useProgram(program);

    gl.bindVertexArray(mesh.getVAO());
    gl.enableVertexAttribArray(0);
    gl.drawArrays(mesh.getDrawMode(), 0, mesh.getNumVertices());
    gl.disableVertexAttribArray(0);
    gl.bindVertexArray(null);

    gl.useProgram(null);

    mesh.release();

} else {
    console.log('WebGL not supported in this browser.');
}
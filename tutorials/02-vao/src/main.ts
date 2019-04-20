import global from 'global';
import Mesh from 'engine/components/Mesh';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

if (gl) {

    /* Store WebGL Context to global storage. */
    global.set('gl', gl);
    
    /* Create mesh (a rectangle) using hard-coded data. */
    const mesh = new Mesh();
    mesh.updateVertexBuffer(new Float32Array([
        -0.5,  0.5, -0.5, -0.5,  0.5, -0.5,
         0.5, -0.5,  0.5,  0.5, -0.5,  0.5
    ]));
    mesh.configure([[gl.FLOAT, 2]]);
    mesh.setCount(6);

    const vertexShaderSource = 
    `#version 300 es
    layout(location = 0) in vec2 position;
    void main() {
        gl_Position = vec4(position, 0, 1);
    }
    `
    const fragmentShaderSource = 
    `#version 300 es
    precision mediump float;
    out vec4 out_color;
    void main() {
        out_color = vec4(1, 1, 1, 1);
    }
    `
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.useProgram(program);

    /* glViewPort(x, y, width, height)
     * Specifies the affine transform from normalized device coordinates
     * to window coordinates. */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    /* Initialize frame buffer with color (0, 0, 0, 1). */
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    /* Invoke the render call. */
    mesh.start();
    mesh.render();
    mesh.stop();

    mesh.delete();

} else {
    console.log('WebGL not supported in this browser.');
}
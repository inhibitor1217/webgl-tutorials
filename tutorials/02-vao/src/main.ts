import Mesh from './engine/components/Mesh';
import Program from './engine/shaders/Program';
import { vertexShader, fragmentShader } from './engine/res/DefaultMaterialShaders';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

if (gl) {

    const program = new Program(gl, vertexShader, fragmentShader);
    program.generate();

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

    gl.bindVertexArray(mesh.getVAO());
    gl.enableVertexAttribArray(0);
    
    program.start();
    gl.drawArrays(mesh.getDrawMode(), 0, mesh.getNumVertices());
    program.stop();
    
    gl.disableVertexAttribArray(0);
    gl.bindVertexArray(null);

    mesh.release();

} else {
    console.log('WebGL not supported in this browser.');
}
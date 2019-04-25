import global from 'global';
import Mesh from 'engine/components/Mesh';
import DefaultShader from 'engine/shaders/DefaultShader';
import Material from 'engine/components/Material';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

if (gl) {

    /* Store WebGL Context to global storage. */
    global.set('gl', gl);
    
    /* Create mesh (a rectangle) using hard-coded data. */
    const mesh = new Mesh();
    mesh.updateVertexBuffer(new Float32Array([
        -0.5,  0.5, -0.5, -0.5,  0.5, 0.5, 0.5, -0.5
    ]));
    mesh.updateIndexBuffer(new Uint32Array([
        0, 1, 3, 0, 3, 2
    ]));
    mesh.configure([[gl.FLOAT, 2]]);
    mesh.setCount(6);

    const defaultShader = new DefaultShader();
    const material = new Material(defaultShader);

    /* glViewPort(x, y, width, height)
     * Specifies the affine transform from normalized device coordinates
     * to window coordinates. */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    /* Initialize frame buffer with color (0, 0, 0, 1). */
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    /* Invoke the render call. */
    mesh.start();
    material.start();
    material.setColor(1, 0, 0);

    mesh.render();

    mesh.stop();
    material.stop();

    mesh.delete();

} else {
    console.log('WebGL not supported in this browser.');
}
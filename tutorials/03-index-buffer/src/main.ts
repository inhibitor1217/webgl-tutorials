import Mesh from './engine/components/Mesh';
import Program from './engine/shaders/Program';
import Material from './engine/components/Material';
import SceneObject from './engine/objects/SceneObject';
import { vertexShader, fragmentShader } from './engine/res/DefaultMaterialShaders';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

if (gl) {

    /* Create mesh (a rectangle) using hard-coded data. */
    const mesh = new Mesh(gl);
    mesh.setAttributes([[gl.FLOAT, 2]]);
    mesh.storeBufferFromFloat32Array(new Float32Array([
        -0.5,  0.5, -0.5, -0.5,  0.5, -0.5,
         0.5, -0.5,  0.5,  0.5, -0.5,  0.5
    ]));
    mesh.setNumVertices(6);
    mesh.generate();

    /* Create program and materials used to render the mesh. */
    const program = new Program(gl, vertexShader, fragmentShader);
    program.generate();
    const material = new Material(program);

    /* Define a SceneObject associated with the mesh and material. */
    const object = new SceneObject(gl, mesh, material);

    /* glViewPort(x, y, width, height)
     * Specifies the affine transform from normalized device coordinates
     * to window coordinates. */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    /* Initialize frame buffer with color (0, 0, 0, 1). */
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    /* Invoke the render call. */
    object.render();

} else {
    console.log('WebGL not supported in this browser.');
}
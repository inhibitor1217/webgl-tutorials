import Mesh from 'engine/components/Mesh';
import DefaultMaterial from 'engine/components/materials/DefaultMaterial';
import SceneObject from 'engine/objects/SceneObject';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

if (gl) {

    /* Create meshes (a rectangle) using hard-coded data. */
    const mesh = new Mesh(gl);
    mesh.setAttributes([[gl.FLOAT, 2]]); // [position]
    mesh.storeVertexBuffer(new Float32Array([
        -0.5,  0.5,
        -0.5, -0.5,
         0.5,  0.5, 
         0.5, -0.5
    ]));
    mesh.storeIndexBuffer(new Uint32Array([
        0, 1, 3, 0, 3, 2
    ]));
    mesh.setNumVertices(6);
    mesh.generate();

    /* Create materials used to render the mesh. */
    const defaultMaterial = new DefaultMaterial(gl);

    /* Define SceneObjects associated with the mesh and material. */
    const object = new SceneObject(gl, mesh, defaultMaterial);

    /* glViewPort(x, y, width, height)
     * Specifies the affine transform from normalized device coordinates
     * to window coordinates. */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    /* Initialize frame buffer with color (0, 0, 0, 1). */
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    /* Invoke the render call. */
    object.render();

    /* Clean up the resources. */
    mesh.release();
    defaultMaterial.release();

} else {
    console.log('WebGL not supported in this browser.');
}
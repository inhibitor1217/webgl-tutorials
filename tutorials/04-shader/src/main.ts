import Mesh from 'engine/components/Mesh';
import DefaultMaterial from 'engine/components/materials/DefaultMaterial';
import VertexColorMaterial from 'engine/components/materials/VertexColorMaterial';
import SceneObject from 'engine/objects/SceneObject';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

if (gl) {

    /* Create meshes (a rectangle) using hard-coded data. */
    const mesh1 = new Mesh(gl);
    mesh1.setAttributes([[gl.FLOAT, 2]]); // [position]
    mesh1.storeVertexBuffer(new Float32Array([
        -0.5,  0.5,
        -0.5,  0.0,
         0.0,  0.5, 
         0.0,  0.0
    ]));
    mesh1.storeIndexBuffer(new Uint32Array([
        0, 1, 3, 0, 3, 2
    ]));
    mesh1.setNumVertices(6);
    mesh1.generate();

    const mesh2 = new Mesh(gl);
    mesh2.setAttributes([[gl.FLOAT, 2], [gl.FLOAT, 3]]); // [position, color]
    mesh2.storeVertexBuffer(new Float32Array([
         0.0,  0.0, 0.0, 1.0, 0.0,
         0.0, -0.5, 1.0, 0.0, 0.0,
         0.5,  0.0, 0.0, 0.0, 1.0,
         0.5, -0.5, 1.0, 1.0, 1.0
    ]));
    mesh2.storeIndexBuffer(new Uint32Array([
        0, 1, 3, 0, 3, 2
    ]));
    mesh2.setNumVertices(6);
    mesh2.generate();

    /* Create materials used to render the mesh. */
    const defaultMaterial = new DefaultMaterial(gl);
    const vertexColorMaterial = new VertexColorMaterial(gl);

    /* Define SceneObjects associated with the mesh and material. */
    const object1 = new SceneObject(gl, mesh1, defaultMaterial);
    const object2 = new SceneObject(gl, mesh2, vertexColorMaterial);

    /* glViewPort(x, y, width, height)
     * Specifies the affine transform from normalized device coordinates
     * to window coordinates. */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    /* Initialize frame buffer with color (0, 0, 0, 1). */
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    /* Invoke the render call. */
    object1.render();
    object2.render();

    /* Clean up the resources. */
    mesh1.release();
    mesh2.release();
    defaultMaterial.release();
    vertexColorMaterial.release();

} else {
    console.log('WebGL not supported in this browser.');
}
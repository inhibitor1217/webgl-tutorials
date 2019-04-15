import Mesh from 'engine/components/Mesh';
import SceneObject from 'engine/objects/SceneObject';
import TextureMaterial from 'engine/components/materials/TextureMaterial';
import Texture2D from 'engine/textures/Texture2D';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

if (gl) {

    /* Create meshes (a rectangle) using hard-coded data. */
    const mesh = new Mesh(gl);
    mesh.setAttributes([[gl.FLOAT, 2], [gl.FLOAT, 2]]); // [position, uv]
    mesh.storeVertexBuffer(new Float32Array([
        -0.5,  0.5, 0, 0,
        -0.5, -0.5, 0, 1,
         0.5,  0.5, 1, 0,
         0.5, -0.5, 1, 1
    ]));
    mesh.storeIndexBuffer(new Uint32Array([
        0, 1, 3, 0, 3, 2
    ]));
    mesh.setNumVertices(6);
    mesh.generate();

    /* Create a texture from the resource. */
    const texture = new Texture2D(gl);
    texture.generate('res/textures/sample_texture.png');

    /* Create a TextureMaterial from the shader and texture. */
    const material = new TextureMaterial(gl);
    material.setTexture(texture);

    /* Define SceneObjects associated with the mesh and material. */
    const object = new SceneObject(gl, mesh, material);

    /* glViewPort(x, y, width, height)
     * Specifies the affine transform from normalized device coordinates
     * to window coordinates. */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    const render = (time: number) => {

        /* Initialize frame buffer with color (0, 0, 0, 1). */
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        /* Invoke the render call. */
        object.render();

        /* Request for next frame. */
        requestAnimationFrame(render);

    };

    /* Start render loop. */
    requestAnimationFrame(render);

} else {
    console.log('WebGL not supported in this browser.');
}
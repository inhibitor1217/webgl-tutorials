import global from 'global';
import ShaderMaster from 'engine/shaders/ShaderMaster';
import Mesh from 'engine/components/Mesh';
import Material from 'engine/components/Material';
import Texture2D from 'engine/textures/Texture2D';
import Transform from 'engine/components/Transform';

import { vec3 } from 'gl-matrix';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

if (gl) {

    /* Store WebGL Context to global storage. */
    global.set('gl', gl);

    ShaderMaster.init();

    /* Create mesh (a rectangle) using hard-coded data. */
    const mesh = new Mesh();
    mesh.updateVertexBuffer(new Float32Array([
        -0.5,  0.5, 0, 0,
        -0.5, -0.5, 0, 1,
         0.5,  0.5, 1, 0,
         0.5, -0.5, 1, 1
    ]));
    mesh.updateIndexBuffer(new Uint32Array([
        0, 1, 3, 0, 3, 2
    ]));
    mesh.configure([[gl.FLOAT, 2], [gl.FLOAT, 2]]);
    mesh.setCount(6);

    const material = new Material();
    const texture = new Texture2D();
    material.setTexture(texture);

    const transform = new Transform();

    /* glViewPort(x, y, width, height)
     * Specifies the affine transform from normalized device coordinates
     * to window coordinates. */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    const mainLoop = (time: number) => {

        /* Initialize frame buffer with color (0, 0, 0, 1). */
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        /* Handle animation. */
        transform.setPosition(
            vec3.fromValues(
                0.3 * Math.cos(2 * Math.PI * time / 5000), 
                0.3 * Math.sin(2 * Math.PI * time / 5000),
                0
            )
        );

        /* Rendering. */
        mesh.start();
        material.start();
        ShaderMaster.get('DefaultShader').setUniformMatrix4fv('transformation', transform.getLocalTransform());

        mesh.render();

        mesh.stop();
        material.stop();

        requestAnimationFrame(mainLoop);

    }

    /* Start main loop. */
    requestAnimationFrame(mainLoop);

} else {
    console.log('WebGL not supported in this browser.');
}
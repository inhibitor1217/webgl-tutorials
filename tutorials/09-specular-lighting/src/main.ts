import global from 'global';
import { vec3, mat4 } from 'gl-matrix';

import DefaultShader from 'engine/shaders/DefaultShader';
import Material from 'engine/components/Material';
import Transform from 'engine/components/Transform';
import Camera from 'engine/components/Camera';

import PrimitiveMesh from 'engine/mixins/PrimitiveMesh';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

if (gl) {

    /* Store WebGL Context to global storage. */
    global.set('gl', gl);
    
    /* Create a quad mesh from primitives. */
    const mesh = PrimitiveMesh.get('cube');

    const defaultShader = new DefaultShader();

    const material = new Material();

    const transform = new Transform();

    /* Create a camera with a transform. */
    const camera = new Camera();
    const cameraTransform = new Transform();
    cameraTransform.setPosition(vec3.fromValues(0, 0, 3));

    /* glViewPort(x, y, width, height)
     * Specifies the affine transform from normalized device coordinates
     * to window coordinates. */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    let prevTime = 0;

    const mainLoop = (time: number) => {

        /* Handle animation. */
        const deltaTime = time - prevTime;
        prevTime = time;
        transform.rotateEulerX(0.0003 * deltaTime);
        transform.rotateEulerY(0.0003 * deltaTime);
        transform.rotateEulerZ(0.0003 * deltaTime);
        
        material.diffuse.color.setRGB(
            0.5 * Math.sin(0.0005 * time) + 0.5,
            0.5 * Math.sin(0.0003 * time) + 0.5,
            0.5 * Math.sin(0.0001 * time) + 0.5
        );

        /* Initialize frame buffer with color (0, 0, 0, 1). */
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        /* Rendering. */
        mesh.start();
        material.start(defaultShader);
        defaultShader.setUniformMatrix4fv('transformation', transform.getLocalTransform());
        defaultShader.setUniformMatrix4fv('inverseCameraTransformation', 
            mat4.invert(mat4.create(), cameraTransform.getLocalTransform()));
        defaultShader.setUniformMatrix4fv('projection', camera.getProjection());

        mesh.render();

        mesh.stop();
        material.stop(defaultShader);

        requestAnimationFrame(mainLoop);

    }

    /* Start main loop. */
    requestAnimationFrame(mainLoop);

} else {
    console.log('WebGL not supported in this browser.');
}
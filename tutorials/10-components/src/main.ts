import global from 'global';
import ShaderMaster from 'engine/shaders/ShaderMaster';
import Quad from 'Quad';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

if (gl) {

    /* Store WebGL Context to global storage. */
    global.set('gl', gl);

    ShaderMaster.init();

    const quad = new Quad();

    /* glViewPort(x, y, width, height)
     * Specifies the affine transform from normalized device coordinates
     * to window coordinates. */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    let prev_time = 0;
    const mainLoop = (time: number) => {

        /* Initialize frame buffer with color (0, 0, 0, 1). */
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        /* Start components. */
        quad.start();

        /* Handle animation. */
        const deltaTime = time - prev_time;
        prev_time = time;
        quad.update(deltaTime);

        /* Rendering. */
        quad.render();

        /* Stop components. */
        quad.stop();

        requestAnimationFrame(mainLoop);

    }

    /* Start main loop. */
    requestAnimationFrame(mainLoop);

} else {
    console.log('WebGL not supported in this browser.');
}
import global from 'global';
import ShaderMaster from 'engine/shaders/ShaderMaster';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

if (gl) {

    /* Store WebGL Context to global storage. */
    global.set('gl', gl);
    
    ShaderMaster.init();
    
    /* Load scene. */

    /* Setup viewport. */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    /* Initial configuration. */
    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    let prevTime = 0;

    const mainLoop = (time: number) => {

        /* Animate objects in the scene. */
        const deltaTime = time - prevTime;
        prevTime = time;

        

        /* Clear the frame buffer. */
        gl.clear(gl.COLOR_BUFFER_BIT);

        /* Render Pass. */
        

        requestAnimationFrame(mainLoop);

    }

    /* Start main loop. */
    requestAnimationFrame(mainLoop);

} else {
    console.log('WebGL not supported in this browser.');
}
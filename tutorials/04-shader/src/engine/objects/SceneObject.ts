import Mesh from 'engine/components/Mesh';
import Material from 'engine/components/materials/Material';

export default class SceneObject {

    _gl: WebGL2RenderingContext; /* Reference to WebGL context. */

    /* Note that these components will be replaced to general components later. */
    _mesh: Mesh;                 /* Mesh to be rendered in this object. */
    _material: Material;         /* Material used to render in this object .*/

    constructor(gl: WebGL2RenderingContext, mesh: Mesh, material: Material) {
        this._gl = gl;
        this._mesh = mesh;
        this._material = material;
    }

    /* void SceneObject::render()
     * Wraps a thin layer for rendering the mesh with the material.
     * It is simple... for now, but as we practice various techniques for rendering,
     * this function will become more general and complex. */
    render(): void {
        /* Bind mesh and shaders to WebGL context. */
        this._mesh.start();
        this._material.getProgram().start();

        /* Invoke the render call. */
        this._mesh.render();

        /* Unbind mesh and shaders to WebGL context. */
        this._mesh.stop();
        this._material.getProgram().stop();
    }

}
import global from 'global';

import GameObject from 'engine/objects/GameObject';
import Mesh from 'engine/components/Mesh';
import Material from 'engine/components/Material';
import Transform from 'engine/components/Transform';
import Texture2D from 'engine/textures/Texture2D';

import QuadMovement from 'QuadMovement';

export default class Quad extends GameObject {

    constructor() {
        super();

        const gl = global.get('gl');

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

        const quadMovement = new QuadMovement();

        /* Add components to this object. */
        this.addComponent(mesh);
        this.addComponent(material);
        this.addComponent(transform);
        this.addComponent(quadMovement);
    }

}
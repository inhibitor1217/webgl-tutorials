import global from 'global';
import Mesh from 'engine/components/Mesh';

export default (() => {

    let gl: WebGL2RenderingContext = null;
    const primitives: {[key: string]: Mesh} = {};

    const generatePrimitive = (key: string): Mesh => {
        if (!gl)
            gl = global.get('gl');
        switch(key) {
            case 'quad':
                return generateQuad();
            case 'cube':
                return generateCube();
            default:
                throw `Primitive not supported: ${key}`;
        }
    }

    const generateQuad = (): Mesh => {
        const mesh = new Mesh();
        mesh.updateVertexBuffer(new Float32Array([
            -0.5,  0.5, 0,   0, 0,
            -0.5, -0.5, 0,   0, 1,
             0.5,  0.5, 0,   1, 0,
             0.5, -0.5, 0,   1, 1,
        ]));
        mesh.updateIndexBuffer(new Uint32Array([
            0, 1, 3, 0, 3, 2
        ]));
        mesh.configure([[gl.FLOAT, 3], [gl.FLOAT, 2]]);
        mesh.setCount(6);
        return mesh;
    }

    const generateCube = (): Mesh => {
        const mesh = new Mesh();
        mesh.updateVertexBuffer(new Float32Array([
            -0.5, -0.5, -0.5,   0, 0,
             0.5, -0.5, -0.5,   1, 0,
            -0.5,  0.5, -0.5,   0, 1,
             0.5,  0.5, -0.5,   1, 1,
            -0.5, -0.5,  0.5,   0, 1,
             0.5, -0.5,  0.5,   1, 1,
            -0.5,  0.5,  0.5,   0, 0,
             0.5,  0.5,  0.5,   1, 0,
            -0.5, -0.5,  0.5,   1, 0,
            -0.5,  0.5,  0.5,   1, 1,
             0.5, -0.5,  0.5,   0, 0,
             0.5,  0.5,  0.5,   0, 1,
        ]));
        mesh.updateIndexBuffer(new Uint32Array([
            0,  3,  1,  0,  2,  3,
            0,  1,  5,  0,  5,  4,
            4,  5,  7,  4,  7,  6,
            2,  6,  7,  2,  7,  3,
            0,  9,  2,  0,  8,  9,
            1, 11, 10,  1,  3, 11,
        ]));
        mesh.configure([[gl.FLOAT, 3], [gl.FLOAT, 2]]);
        mesh.setCount(36);
        return mesh;
    }

    return {
        
        get(key: string): Mesh {
            if (!primitives[key])
                primitives[key] = generatePrimitive(key);
            return primitives[key];
        },

        delete(): void {
            Object.keys(primitives).forEach(key => {
                primitives[key].delete();
            });
        }

    };

})();
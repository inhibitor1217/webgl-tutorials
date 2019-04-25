import Program from 'engine/shaders/Program';

const vertexShaderSource = 
`#version 300 es
layout(location = 0) in vec2 position;
void main() {
    gl_Position = vec4(position, 0, 1);
}
`

const fragmentShaderSource = 
`#version 300 es
precision mediump float;
uniform vec3 color;
out vec4 out_color;
void main() {
    out_color = vec4(color, 1);
}
`

export default class DefaultShader extends Program {

    constructor() {
        super(vertexShaderSource, fragmentShaderSource);
    }

} 
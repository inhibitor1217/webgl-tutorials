
export const vertexShader = 
`#version 300 es

layout(location = 0) in vec2 position;

void main() {
    gl_Position = vec4(position, 0, 1);
}

`

export const fragmentShader = 
`#version 300 es

precision mediump float;

out vec4 out_color;

void main() {
    out_color = vec4(1, 1, 1, 1);
}

`

export const vertexShader =
`#version 300 es

layout(location = 0) in vec2 position;
layout(location = 1) in vec3 color;

out vec3 vertex_color;

void main() {
    gl_Position = vec4(position, 0, 1);
    vertex_color = color;
}

`

export const fragmentShader =
`#version 300 es

precision mediump float;

in vec3 vertex_color;

out vec4 out_color;

void main() {
    out_color = vec4(vertex_color, 1);
}

`
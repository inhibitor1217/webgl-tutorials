import Program from 'engine/shaders/Program';

const vertexShaderSource = 
`#version 300 es

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 uv;

uniform mat4 transformation;
uniform mat4 inverseCameraTransformation;
uniform mat4 projection;

out vec2 pass_uv;
out vec3 world_normal;

void main() {
    gl_Position = projection * inverseCameraTransformation * transformation * vec4(position, 1);
    pass_uv = uv;
    world_normal = vec3(transformation * vec4(normal, 0));
}
`

const fragmentShaderSource = 
`#version 300 es

precision mediump float;

in vec2 pass_uv;
in vec3 world_normal;

uniform float use_texture;
uniform sampler2D sampler;

uniform vec3 color;
const float diffuse_intensity = 1.0;

const vec3  light_direction = vec3(0, 0, 1);
const float light_intensity = 1.0;
const vec3  light_color = vec3(1, 1, 1);

out vec4 out_color;

void main() {

    vec3 _diffuse_color = mix(vec4(color, 1), texture(sampler, pass_uv), use_texture).xyz;
    
    vec3 n_world_normal    = normalize(world_normal);
    vec3 n_light_direction = normalize(light_direction);
    float diffuse_factor   = clamp( dot(n_world_normal, n_light_direction), 0.0, 1.0 );
    
    out_color = vec4(diffuse_factor * light_intensity * diffuse_intensity * (_diffuse_color * light_color), 1.0);
    
}
`

export default class DefaultShader extends Program {

    constructor() {
        super(vertexShaderSource, fragmentShaderSource);
    }

}
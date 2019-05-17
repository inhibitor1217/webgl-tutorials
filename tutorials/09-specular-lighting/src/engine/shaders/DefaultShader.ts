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
out vec3 world_viewpoint;

void main() {

    vec4 world_position_h = transformation * vec4(position, 1);

    gl_Position = projection * inverseCameraTransformation * world_position_h;
    pass_uv = uv;
    world_normal = vec3(transformation * vec4(normal, 0));
    world_viewpoint = -(inverseCameraTransformation * vec4(0, 0, 0, 1)).xyz - world_position_h.xyz;
}
`

const fragmentShaderSource = 
`#version 300 es

precision mediump float;

in vec2 pass_uv;
in vec3 world_normal;
in vec3 world_viewpoint;

uniform float use_texture;
uniform sampler2D sampler;

uniform vec3 diffuse_color;
const float diffuse_intensity = 1.0;

const vec3 specular_color = vec3(1, 1, 1);
const float specular_intensity = 1.0;

const vec3  light_direction = vec3(0, 0, 1);
const float light_intensity = 1.0;
const vec3  light_color = vec3(1, 1, 1);

const float specular_exponent = 50.0;

out vec4 out_color;

void main() {

    vec3 _diffuse_color = mix(vec4(diffuse_color, 1), texture(sampler, pass_uv), use_texture).xyz;
    
    vec3 n_world_normal    = normalize(world_normal);
    vec3 n_light_direction = normalize(light_direction);
    vec3 n_reflection      = normalize(2.0 * dot(n_world_normal, n_light_direction) * n_world_normal - n_light_direction);
    vec3 n_world_viewpoint = normalize(world_viewpoint);

    float diffuse_factor   = clamp( dot(n_world_normal, n_light_direction), 0.0, 1.0 );
    float specular_factor  = pow( clamp( dot(n_reflection, n_world_viewpoint), 0.0, 1.0 ), specular_exponent );
    
    out_color = vec4(
          diffuse_factor  * light_intensity * diffuse_intensity  * ( _diffuse_color * light_color )
        + specular_factor * light_intensity * specular_intensity * ( specular_color * light_color ), 
        1.0
    );

}
`

export default class DefaultShader extends Program {

    constructor() {
        super(vertexShaderSource, fragmentShaderSource);
    }

}
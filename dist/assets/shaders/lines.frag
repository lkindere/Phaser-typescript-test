#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

void main(){
	vec2 coord = (gl_FragCoord.xy / resolution.xy);
	float color = 0.0;

	color += sin(coord.x * 50.0 + cos(time + coord.y * 10.0 + sin(coord.x * 50.0 + time * 2.0))) * 2.0;
	color += cos(coord.x * 20.0 + sin(time + coord.y * 10.0 + cos(coord.x * 50.0 + time * 2.0))) * 2.0;
	color += sin(coord.x * 30.0 + cos(time + coord.y * 10.0 + sin(coord.x * 50.0 + time * 2.0))) * 2.0;
	color += cos(coord.x * 10.0 + sin(time + coord.y * 10.0 + cos(coord.x * 50.0 + time * 2.0))) * 2.0;

	gl_FragColor = vec4(vec3(color * coord.y, color + coord.x, color), 1.0);
}
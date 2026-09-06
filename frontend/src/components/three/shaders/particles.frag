// Fragment shader for particles - soft circular dots with glow
varying vec3 vColor;

void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    alpha *= 0.6;
    gl_FragColor = vec4(vColor, alpha);
}

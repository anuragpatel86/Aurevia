// Fragment shader for luxury fabric look
// Gold/dark gradient with shimmer based on displacement
varying vec2 vUv;
varying float vDisplacement;
uniform float uTime;
uniform vec3 uColor1; // dark color
uniform vec3 uColor2; // accent/gold color

void main() {
    vec3 color = mix(uColor1, uColor2, vUv.y * 0.5 + vDisplacement * 2.0);
    float shimmer = sin(vUv.x * 50.0 + uTime * 2.0) * 0.05 + 0.95;
    color *= shimmer;
    float alpha = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
    gl_FragColor = vec4(color, alpha);
}

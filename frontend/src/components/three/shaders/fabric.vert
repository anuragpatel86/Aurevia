// Vertex shader for fabric simulation
// Uses sine waves and noise for cloth-like displacement
// Uniforms: uTime (float), uMouse (vec2), uAmplitude (float)
varying vec2 vUv;
varying float vDisplacement;
uniform float uTime;
uniform vec2 uMouse;
uniform float uAmplitude;

void main() {
    vUv = uv;
    vec3 pos = position;
    float wave1 = sin(pos.x * 3.0 + uTime * 0.8) * uAmplitude;
    float wave2 = sin(pos.y * 2.5 + uTime * 0.6) * uAmplitude * 0.8;
    float wave3 = cos(pos.x * 1.5 + pos.y * 2.0 + uTime * 0.4) * uAmplitude * 0.5;
    float mouseEffect = smoothstep(0.5, 0.0, distance(uv, uMouse)) * 0.3;
    pos.z += wave1 + wave2 + wave3 + mouseEffect;
    vDisplacement = pos.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

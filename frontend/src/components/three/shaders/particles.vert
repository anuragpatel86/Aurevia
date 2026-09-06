// Vertex shader for GPU particle system
// Each particle is a point with size based on depth
attribute float aScale;
attribute vec3 aRandomness;
uniform float uTime;
uniform float uSize;
varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // Animate particles in a swirling pattern
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceFromCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceFromCenter) * uTime * 0.2;
    float cosAngle = cos(angle + angleOffset);
    float sinAngle = sin(angle + angleOffset);
    modelPosition.x = cosAngle * distanceFromCenter;
    modelPosition.z = sinAngle * distanceFromCenter;
    modelPosition.xyz += aRandomness;
    modelPosition.y += sin(uTime * 0.5 + modelPosition.x * 0.5) * 0.3;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale * (1.0 / -viewPosition.z);
    gl_PointSize = max(gl_PointSize, 1.0);
    vColor = vec3(0.85, 0.75, 0.55); // gold tint
}

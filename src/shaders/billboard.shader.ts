import * as THREE from 'three';
import billboardVertexShader from './billboard.vertex.glsl';
import billboardFragmentShader from './billboard.fragment.glsl';

export const billboardShader = new THREE.RawShaderMaterial({
    vertexShader: billboardVertexShader,
    fragmentShader: billboardFragmentShader,
    uniforms: {
        cameraPosition: { value: new THREE.Vector3() },
    },
});
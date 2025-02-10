import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.webgl') });

// Add 3D Model
const loader = new GLTFLoader();
loader.load('public/assets/models/cyber_logo.glb', (gltf) => {
  const model = gltf.scene;
  model.position.set(0, 0, -5);
  scene.add(model);
});

// Add Ambient Lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
// Create distortion effect
const distortionUniforms = {
  time: { value: 0 },
};

const distortionMaterial = new THREE.ShaderMaterial({
  uniforms: distortionUniforms,
  vertexShader: `
    varying vec2 vUv;
    uniform float time;
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 10.0 + time) * 0.2;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(vUv, 1.0, 1.0);
    }
  `,
});

// Apply to project cards (optional)

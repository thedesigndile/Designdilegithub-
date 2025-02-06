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

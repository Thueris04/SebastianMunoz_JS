import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const container = document.getElementById("chair-model");

const camera = new THREE.PerspectiveCamera(
  75,
  container.offsetWidth / container.offsetHeight, // Corrección aquí
  0.1,
  1000
);
camera.position.set(3.8, 3.4, 8.0);

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light = new THREE.PointLight(0xffffff, 50);
light.position.set(0.8, 1.4, 1.0);
scene.add(light);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.offsetWidth, container.offsetHeight); // Corrección aquí
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
loader.load(
  "./public/wassily_chair.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = container.offsetWidth / container.offsetHeight; // Corrección aquí
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight); // Corrección aquí
  render();
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();

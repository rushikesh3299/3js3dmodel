import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setup scene
const scene = new THREE.Scene();

// Setup camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 1.5);

// Setup light
const ambientLight = new THREE.AmbientLight(0xffffff); // (color, intensity)
ambientLight.position.set(500, 500, 500); //top-left
// ambientLight.castShadow = true;
scene.add(ambientLight);

// Setup controls{mouse move & zoom}
const controls = new OrbitControls(camera, renderer.domElement);

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();
//Load the file
loader.load(
  "./free_zuk_3d_model/scene.gltf",
  function (gltf) {
    //If the file is loaded, add it to the scene
    scene.add(gltf.scene);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Render the scene continuously
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

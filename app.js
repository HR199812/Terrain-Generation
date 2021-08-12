import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';


let scene, camera, renderer, controls, object, objectMaterial, objectMesh, dirLight, 
loader= new THREE.TextureLoader();


let texture = loader.load('./TerrainResources/terrain.jpg');
let displacementtexture = loader.load('./TerrainResources/height.jpg');
let displacementAlpha = loader.load('./TerrainResources/alpha.jpg');

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 50000);
camera.position.set(0, 0, 3);

dirLight = new THREE.DirectionalLight(0xffffff, 2)
dirLight.position.set(2, 3, 4);
scene.add(dirLight);

object = new THREE.PlaneBufferGeometry(20, 20, 640, 640);
objectMaterial = new THREE.MeshStandardMaterial({ 
    color: 'gray', 
    map: texture,
    displacementMap: displacementtexture,
    displacementScale: 0.6,

});
objectMesh = new THREE.Mesh(object, objectMaterial);

objectMesh.rotation.x = 181;

scene.add(objectMesh);

renderer = new THREE.WebGLRenderer({ antialiasing: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;
controls.zoomSpeed = 1.15;
controls.screenSpacePanning = false;
controls.minDistance = 0;
controls.maxDistance = 45000;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2.5;
controls.update();

animate();

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});


// ============================================
// HYDRA SHOWROOM 3D CONTROLLER
// Uses existing GLB + Material Swap for Performance
// ============================================

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'https://unpkg.com/three@0.160.0/examples/jsm/environments/RoomEnvironment.js';

class Showroom {
    constructor() {
        this.container = document.getElementById('showroom-canvas-container');
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;


        // Models Config (Files)
        this.modelsConfig = [
            {
                name: "AVENTADOR SVJ",
                path: "models/lamborghini.glb",
                desc: "The Classic Legend"
            },
            {
                name: "VENENO ROADSTER",
                path: "models/lamborghini_venevo.glb",
                desc: "Aerodynamic Prototype"
            },
            {
                name: "SIAN FKP 37",
                path: "models/2021_lamborghini_sian_roadster.glb",
                desc: "Hybrid Supercapacitor"
            },
            {
                name: "INVENCIBLE",
                path: "models/2023_lamborghini_invencible.glb",
                desc: "One-Off Masterpiece"
            },
            {
                name: "EGOISTA",
                path: "models/2013_lamborghini_egoista_concept.glb",
                desc: "Single Seater Jet"
            }
        ];

        this.currentModelIndex = 0;
        this.currentModelObject = null;

        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = null;

        // Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
        this.camera.position.set(3, 1.5, 4);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        // Environment Map (Reflections) creates AAA look
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.0;
        this.controls.enablePan = false;
        this.controls.minDistance = 2.5;
        this.controls.maxDistance = 6;

        // Lighting (Reduced since EnvMap provides light)
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambient);

        const spot = new THREE.SpotLight(0xffffff, 5);
        spot.position.set(5, 10, 5);
        spot.castShadow = true;
        this.scene.add(spot);

        const rim = new THREE.SpotLight(0x3b82f6, 5);
        rim.position.set(-5, 0, -5);
        this.scene.add(rim);

        // Initial Load
        this.loadModel(this.currentModelIndex);

        // Event Listeners for Navigation (Models)
        document.getElementById('prev-edition').addEventListener('click', () => this.changeModel(-1));
        document.getElementById('next-edition').addEventListener('click', () => this.changeModel(1));

        // Animation Loop
        this.animate();

        // Resize
        window.addEventListener('resize', () => {
            if (this.camera && this.renderer) {
                this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
            }
        });
    }

    changeModel(dir) {
        let newIndex = this.currentModelIndex + dir;
        if (newIndex < 0) newIndex = this.modelsConfig.length - 1;
        if (newIndex >= this.modelsConfig.length) newIndex = 0;

        this.loadModel(newIndex);
    }

    loadModel(index) {
        this.currentModelIndex = index;

        // Show Loading
        const loading = document.querySelector('.showroom-loading');
        if (loading) {
            loading.style.display = 'block';
            loading.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Loading Model...';
            loading.style.color = '#fff';
        }

        // Remove old model
        if (this.currentModelObject) {
            this.scene.remove(this.currentModelObject);
            this.currentModelObject = null;
        }

        // Update UI Text immediately
        this.updateUI();

        const loader = new GLTFLoader();
        const modelData = this.modelsConfig[index];

        loader.load(modelData.path, (gltf) => {
            const model = gltf.scene;
            this.currentModelObject = model;

            // Normalize Scale and Center
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const scale = 3.5 / Math.max(size.x, size.y, size.z);
            model.scale.setScalar(scale);

            box.setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            model.position.y -= 0.5;

            this.scene.add(model);

            // Hide Loading
            if (loading) loading.style.display = 'none';

        }, undefined, (error) => {
            console.error('Error loading', modelData.path, error);
            if (loading) {
                loading.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Load Failed';
                loading.style.color = '#ff5555';
            }
        });
    }

    updateUI() {
        const config = this.modelsConfig[this.currentModelIndex];
        document.getElementById('edition-name').textContent = config.name;
        document.getElementById('edition-desc').textContent = config.desc;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.controls) this.controls.update();
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
}

// Start Showroom when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new Showroom();
});

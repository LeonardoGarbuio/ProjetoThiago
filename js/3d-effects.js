// ============================================
// 3D EFFECTS - SCROLLYTELLING EDITION
// ============================================

(function () {
    'use strict';

    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
    }

    class LamborghiniModel {
        constructor() {
            this.container = document.getElementById('hero-3d-car');
            if (!this.container) return;

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);

            this.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });

            this.model = null;

            // Mouse Interaction (Subtle, on top of scroll)
            this.mouseX = 0;
            this.mouseY = 0;

            // Animation variables
            this.floatTime = 0;

            this.init();
        }

        init() {
            // Renderer setup
            this.updateSize();
            this.renderer.outputEncoding = THREE.sRGBEncoding;
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.2;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            this.container.appendChild(this.renderer.domElement);

            // Initial Camera Position (CENTERED FRONT VIEW)
            this.camera.position.set(0, 1.2, 5.0);
            this.camera.lookAt(0, 0.5, 0);

            // Setup lighting
            this.setupLighting();

            // Load the model
            this.loadModel();

            // Event Listeners
            window.addEventListener('resize', () => this.onResize());
            window.addEventListener('mousemove', (e) => {
                this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            });

            // Init Scroll Listener
            this.initScrollListener();

            // Check Mobile initially
            this.checkMobile();

            // Start animation loop
            this.animate();
        }

        checkMobile() {
            this.isMobile = window.innerWidth <= 768;
        }

        updateSize() {
            if (this.container && this.renderer && this.camera) {
                const width = window.innerWidth;
                const height = window.innerHeight;
                this.renderer.setSize(width, height);
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
                this.checkMobile();
            }
        }

        onResize() {
            this.updateSize();
        }

        setupLighting() {
            // Ambient light
            const ambient = new THREE.AmbientLight(0xffffff, 0.2);
            this.scene.add(ambient);

            // Main Spot
            const keyLight = new THREE.SpotLight(0xffffff, 2);
            keyLight.position.set(-5, 10, 5);
            keyLight.castShadow = true;
            this.scene.add(keyLight);

            // Rim Lights
            const rimLight = new THREE.SpotLight(0x3b82f6, 4);
            rimLight.position.set(5, 2, -5);
            this.scene.add(rimLight);

            // Fill
            const fillLight = new THREE.PointLight(0x7c3aed, 2, 10);
            fillLight.position.set(0, -1, 2);
            this.scene.add(fillLight);
        }

        loadModel() {
            const loader = new THREE.GLTFLoader();
            loader.load('models/lamborghini.glb', (gltf) => {
                this.model = gltf.scene;

                // Materials (Blue Metallic)
                const blueMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0x3b82f6, metalness: 0.9, roughness: 0.2, clearcoat: 1.0, envMapIntensity: 2.0
                });

                this.model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;

                        const mName = child.material.name ? child.material.name.toLowerCase() : '';

                        // Paint Logic
                        if (mName.includes('body') || mName.includes('paint') || (child.material.color && child.material.color.r > 0.5)) {
                            child.material = blueMaterial;
                        }
                    }
                });

                // Scale & Position
                const box = new THREE.Box3().setFromObject(this.model);
                const size = box.getSize(new THREE.Vector3());
                const scale = 3.8 / Math.max(size.x, size.y, size.z);
                this.model.scale.setScalar(scale);
                this.model.position.y = -0.5;

                // Initial Rotation (Direct Front)
                this.model.rotation.y = 0;

                this.scene.add(this.model);

                // Hide loading
                const loading = document.querySelector('.car-loading');
                if (loading) loading.style.display = 'none';

            });
        }

        initScrollListener() {
            window.addEventListener('scroll', () => {
                if (!this.model) return;

                const scrollY = window.scrollY;
                const height = window.innerHeight;
                const progress = scrollY / height;

                this.targetScroll = progress;
            });

            this.currentScroll = 0;
            this.targetScroll = 0;
        }

        animate() {
            requestAnimationFrame(() => this.animate());

            // Smooth Scroll Interpolation for 3D state
            this.currentScroll += (this.targetScroll - this.currentScroll) * 0.05;

            if (this.model) {
                this.floatTime += 0.01;
                this.model.position.y = -0.5 + Math.sin(this.floatTime) * 0.05;

                // --- SCROLLYTELLING LOGIC (RESPONSIVE) ---

                let rotY = 0;
                let camX = 0;
                let camZ = 5.0;

                if (this.isMobile) {
                    // === MOBILE LOGIC (FIXED) ===
                    camZ = 10.0;

                    // Bring car up a bit if it disappeared (was -1.2)
                    this.model.position.y = -0.8;

                    let camY = 1.0; // Lower camera height slightly to look more leveled

                    if (this.currentScroll < 1) {
                        rotY = THREE.MathUtils.lerp(0, -Math.PI / 4, this.currentScroll);
                    } else {
                        rotY = -Math.PI / 4 + (this.currentScroll - 1) * -0.5;
                        camZ = 9.5 + (this.currentScroll - 1) * 1.5;
                    }

                    this.camera.position.y += (camY - this.camera.position.y) * 0.05;

                } else {
                    // 1. Reset Model Y (Standard float)
                    const baseFloat = -0.5 + Math.sin(this.floatTime) * 0.05;
                    this.model.position.y += (baseFloat - this.model.position.y) * 0.1;

                    // 2. Reset Camera Y (Standard height) - CRITICAL for correct framing
                    this.camera.position.y += (1.2 - this.camera.position.y) * 0.1;

                    // === DESKTOP LOGIC (Cinematic) ===
                    if (this.currentScroll < 1) {
                        const p = this.currentScroll;
                        rotY = THREE.MathUtils.lerp(0, -Math.PI / 2, p);
                        camX = 0;
                        camZ = THREE.MathUtils.lerp(5.0, 4.5, p);
                    } else if (this.currentScroll < 2) {
                        const p = this.currentScroll - 1;
                        rotY = THREE.MathUtils.lerp(-Math.PI / 2, -Math.PI, p);
                        camZ = THREE.MathUtils.lerp(4.5, 4.0, p);
                    } else {
                        const p = Math.min(this.currentScroll - 2, 1);
                        rotY = -Math.PI;
                        camZ = THREE.MathUtils.lerp(4.0, 9.0, p);
                    }
                }

                // Apply Rotations
                this.model.rotation.y = rotY + (this.mouseX * 0.1);

                // Apply Camera Position
                this.camera.position.x += (camX - this.camera.position.x) * 0.05;
                this.camera.position.z += (camZ - this.camera.position.z) * 0.05;
                this.camera.lookAt(0, 0, 0);
            }

            this.renderer.render(this.scene, this.camera);
        }
    }

    // Initialize
    window.addEventListener('load', () => {
        new LamborghiniModel();
    });

})();

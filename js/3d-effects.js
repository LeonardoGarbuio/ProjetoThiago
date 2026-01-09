// ============================================
// 3D EFFECTS - Real Lamborghini GLB Model
// ============================================

(function () {
    'use strict';

    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
    }

    // ============================================
    // 3D PARTICLES BACKGROUND
    // ============================================
    class ParticlesBackground {
        constructor() {
            this.canvas = document.getElementById('particles-canvas');
            if (!this.canvas) return;

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                alpha: true,
                antialias: true
            });

            this.particles = null;
            this.mouseX = 0;
            this.mouseY = 0;

            this.init();
        }

        init() {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.camera.position.z = 50;
            this.createParticles();
            this.createGeometricShapes();
            window.addEventListener('resize', () => this.onResize());
            window.addEventListener('mousemove', (e) => this.onMouseMove(e));
            this.animate();
        }

        createParticles() {
            const particleCount = 300;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            const color1 = new THREE.Color(0x3B82F6);
            const color2 = new THREE.Color(0x8b5cf6);

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3] = (Math.random() - 0.5) * 100;
                positions[i3 + 1] = (Math.random() - 0.5) * 100;
                positions[i3 + 2] = (Math.random() - 0.5) * 100;

                const mixRatio = Math.random();
                const color = color1.clone().lerp(color2, mixRatio);
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 1.2,
                vertexColors: true,
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending
            });

            this.particles = new THREE.Points(geometry, material);
            this.scene.add(this.particles);
        }

        createGeometricShapes() {
            this.shapes = [];
            const geometries = [
                new THREE.OctahedronGeometry(1.5),
                new THREE.IcosahedronGeometry(1.2)
            ];

            const materials = [
                new THREE.MeshBasicMaterial({ color: 0x3B82F6, wireframe: true, transparent: true, opacity: 0.15 }),
                new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.15 })
            ];

            for (let i = 0; i < 4; i++) {
                const geometry = geometries[Math.floor(Math.random() * geometries.length)];
                const material = materials[Math.floor(Math.random() * materials.length)];
                const mesh = new THREE.Mesh(geometry, material);

                mesh.position.x = (Math.random() - 0.5) * 80;
                mesh.position.y = (Math.random() - 0.5) * 80;
                mesh.position.z = (Math.random() - 0.5) * 40 - 20;

                mesh.userData = {
                    rotationSpeed: { x: (Math.random() - 0.5) * 0.008, y: (Math.random() - 0.5) * 0.008 },
                    floatOffset: Math.random() * Math.PI * 2
                };

                this.shapes.push(mesh);
                this.scene.add(mesh);
            }
        }

        onResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }

        onMouseMove(event) {
            this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        animate() {
            requestAnimationFrame(() => this.animate());
            const time = Date.now() * 0.001;

            if (this.particles) {
                this.particles.rotation.x += 0.0002;
                this.particles.rotation.y += 0.0004;
            }

            this.shapes.forEach(shape => {
                shape.rotation.x += shape.userData.rotationSpeed.x;
                shape.rotation.y += shape.userData.rotationSpeed.y;
                shape.position.y += Math.sin(time + shape.userData.floatOffset) * 0.008;
            });

            this.camera.position.x += (this.mouseX * 2 - this.camera.position.x) * 0.02;
            this.camera.position.y += (this.mouseY * 2 - this.camera.position.y) * 0.02;
            this.camera.lookAt(this.scene.position);

            this.renderer.render(this.scene, this.camera);
        }
    }

    // ============================================
    // REAL 3D LAMBORGHINI MODEL LOADER
    // ============================================
    class LamborghiniModel {
        constructor() {
            this.container = document.getElementById('hero-3d-car');
            this.loadingEl = document.getElementById('car-loading');
            if (!this.container) return;

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(40, 600 / 500, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });

            this.model = null;
            this.mouseX = 0;
            this.mouseY = 0;

            this.init();
        }

        init() {
            // Renderer setup
            this.renderer.setSize(600, 500);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.outputEncoding = THREE.sRGBEncoding;
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.5;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.container.appendChild(this.renderer.domElement);

            // Camera position
            this.camera.position.set(4, 1.5, 5);
            this.camera.lookAt(0, 0.5, 0);

            // Setup lighting
            this.setupLighting();

            // Load the model
            this.loadModel();

            // Mouse tracking
            window.addEventListener('mousemove', (e) => {
                this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            });

            // Start animation
            this.animate();
        }

        setupLighting() {
            // Ambient light
            const ambient = new THREE.AmbientLight(0xffffff, 0.4);
            this.scene.add(ambient);

            // Main key light
            const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
            keyLight.position.set(5, 8, 5);
            keyLight.castShadow = true;
            keyLight.shadow.mapSize.width = 2048;
            keyLight.shadow.mapSize.height = 2048;
            this.scene.add(keyLight);

            // Fill light
            const fillLight = new THREE.DirectionalLight(0x8888ff, 0.5);
            fillLight.position.set(-5, 3, -5);
            this.scene.add(fillLight);

            // Blue accent light (left)
            const blueLight = new THREE.PointLight(0x3B82F6, 2, 15);
            blueLight.position.set(-4, 2, 2);
            this.scene.add(blueLight);

            // Purple accent light (right)
            const purpleLight = new THREE.PointLight(0x8b5cf6, 1.5, 15);
            purpleLight.position.set(4, 2, -2);
            this.scene.add(purpleLight);

            // Front spotlight
            const frontSpot = new THREE.SpotLight(0xffffff, 0.8);
            frontSpot.position.set(0, 5, 8);
            frontSpot.angle = Math.PI / 6;
            frontSpot.penumbra = 0.5;
            this.scene.add(frontSpot);
        }

        loadModel() {
            // Check if GLTFLoader is available
            if (typeof THREE.GLTFLoader === 'undefined') {
                console.error('GLTFLoader not available');
                this.hideLoading();
                return;
            }

            const loader = new THREE.GLTFLoader();

            loader.load(
                'models/lamborghini.glb',
                (gltf) => {
                    this.model = gltf.scene;

                    // Apply blue metallic material to car body
                    this.model.traverse((child) => {
                        if (child.isMesh) {
                            // Check if it's likely the car body (by material name or color)
                            const materialName = child.material.name ? child.material.name.toLowerCase() : '';
                            const isBody = materialName.includes('body') ||
                                materialName.includes('paint') ||
                                materialName.includes('car') ||
                                materialName.includes('exterior') ||
                                (child.material.color && child.material.color.r > 0.5);

                            if (isBody || child.material.color) {
                                // Create blue metallic material
                                const blueMaterial = new THREE.MeshPhysicalMaterial({
                                    color: 0x2563EB, // Electric blue
                                    metalness: 0.9,
                                    roughness: 0.1,
                                    clearcoat: 1.0,
                                    clearcoatRoughness: 0.03,
                                    envMapIntensity: 1.5
                                });

                                // Only apply to main body parts, not glass or wheels
                                if (!materialName.includes('glass') &&
                                    !materialName.includes('window') &&
                                    !materialName.includes('wheel') &&
                                    !materialName.includes('tire') &&
                                    !materialName.includes('rim') &&
                                    !materialName.includes('light') &&
                                    !materialName.includes('chrome')) {
                                    child.material = blueMaterial;
                                }
                            }

                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

                    // Scale and position the model
                    const box = new THREE.Box3().setFromObject(this.model);
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 2.5 / maxDim;
                    this.model.scale.setScalar(scale);

                    // Center the model
                    const center = box.getCenter(new THREE.Vector3());
                    this.model.position.x = -center.x * scale;
                    this.model.position.y = -center.y * scale + 0.3;
                    this.model.position.z = -center.z * scale;

                    this.scene.add(this.model);

                    // Add ground glow
                    this.addGroundGlow();

                    // Hide loading
                    this.hideLoading();

                    console.log('🚗 Lamborghini model loaded!');
                },
                (progress) => {
                    const percent = (progress.loaded / progress.total * 100).toFixed(0);
                    console.log(`Loading: ${percent}%`);
                },
                (error) => {
                    console.error('Error loading model:', error);
                    this.hideLoading();
                }
            );
        }

        addGroundGlow() {
            // Circular glow under the car
            const glowGeometry = new THREE.CircleGeometry(2, 32);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: 0x3B82F6,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            glow.rotation.x = -Math.PI / 2;
            glow.position.y = 0;
            this.scene.add(glow);

            // Outer ring
            const ringGeometry = new THREE.RingGeometry(1.8, 2.2, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0x8b5cf6,
                transparent: true,
                opacity: 0.2,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = -Math.PI / 2;
            ring.position.y = 0.01;
            this.scene.add(ring);
        }

        hideLoading() {
            if (this.loadingEl) {
                this.loadingEl.classList.add('hidden');
            }
        }

        animate() {
            requestAnimationFrame(() => this.animate());

            const time = Date.now() * 0.001;

            if (this.model) {
                // Auto rotate
                this.model.rotation.y = time * 0.3;

                // Floating effect
                this.model.position.y = Math.sin(time * 0.5) * 0.05 + 0.3;
            }

            // Camera responds slightly to mouse
            this.camera.position.x = 4 + this.mouseX * 0.5;
            this.camera.position.y = 1.5 + this.mouseY * 0.3;
            this.camera.lookAt(0, 0.5, 0);

            this.renderer.render(this.scene, this.camera);
        }
    }

    // ============================================
    // 3D TILT EFFECT FOR CARDS
    // ============================================
    class TiltCards {
        constructor() {
            setTimeout(() => {
                this.cards = document.querySelectorAll('.product-card, .vip-card');
                this.init();
            }, 500);
        }

        init() {
            this.cards.forEach(card => {
                card.addEventListener('mousemove', (e) => this.onMouseMove(e, card));
                card.addEventListener('mouseleave', (e) => this.onMouseLeave(e, card));
                card.addEventListener('mouseenter', () => {
                    card.style.transition = 'none';
                });
            });
        }

        onMouseMove(e, card) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        }

        onMouseLeave(e, card) {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        }
    }

    // ============================================
    // CURSOR GLOW EFFECT
    // ============================================
    class CursorGlow {
        constructor() {
            this.glow = document.createElement('div');
            this.glow.className = 'cursor-glow';
            document.body.appendChild(this.glow);
            this.init();
        }

        init() {
            let x = 0, y = 0;
            let targetX = 0, targetY = 0;

            document.addEventListener('mousemove', (e) => {
                targetX = e.clientX;
                targetY = e.clientY;
            });

            const animate = () => {
                x += (targetX - x) * 0.08;
                y += (targetY - y) * 0.08;
                this.glow.style.left = x + 'px';
                this.glow.style.top = y + 'px';
                requestAnimationFrame(animate);
            };
            animate();
        }
    }

    // ============================================
    // INITIALIZE
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            new ParticlesBackground();
            new LamborghiniModel();
            new TiltCards();
            new CursorGlow();
            console.log('🎮 3D Effects loaded!');
        }, 100);
    });

})();

// Interatividade básica
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simulação de mapa interativo
    const mapButtons = document.querySelectorAll('.map-btn');
    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent;
            alert(`Ação: ${action} - Em uma implementação real, isso acionaria a mudança no mapa`);
        });
    });

    // Animação dos cards
    const cards = document.querySelectorAll('.data-card, .implication-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});


// BloomWatch - 3D Visualization Script
// Three.js implementation for harmful algal blooms visualization

// Global variables
let scene, camera, renderer, controls;
let oceanFloor, waterSurface, algaeParticles;
let bloomType = 'cyanobacteria';
let bloomIntensity = 50;
let waterTemperature = 25;
let timeOfDay = 'day';
let animationId;

// Algae particle systems
let cyanobacteriaParticles, dinoflagellateParticles, mixedParticles;
let algaeModels = [];

// Lighting
let ambientLight, directionalLight, hemisphereLight;

// Texture loader
let textureLoader;

// Textures
let sandTexture, rockTexture, waterTexture, algaeTextures = {};

// Initialize the scene
function init3D() {
    // Get canvas container
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    const canvas = document.getElementById('three-canvas');

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a3d5c);
    scene.fog = new THREE.FogExp2(0x0a3d5c, 0.018);

    // Create camera
    camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 5, 35);

    // Create renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: window.devicePixelRatio <= 1,
        alpha: false,
        powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    // Create controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;

    // Initialize texture loader
    textureLoader = new THREE.TextureLoader();

    // Create lighting
    createLighting3D();

    // Create ocean floor
    createOceanFloor3D();

    // Create water surface
    createWaterSurface3D();

    // Create algae models
    createAlgaeModels3D();

    // Create ambient elements
    createAmbientElements3D();

    // Setup event listeners
    setupEventListeners3D();

    // Hide loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }

    // Start animation
    animate3D();
}

// Load textures
function loadTextures3D() {
    return new Promise((resolve) => {
        let loadedCount = 0;
        const totalTextures = 6;

        function onTextureLoad() {
            loadedCount++;
            if (loadedCount === totalTextures) {
                resolve();
            }
        }

        // Load sand texture
        textureLoader.load('images/sandy_seabed_texture.jpg', (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(10, 10);
            sandTexture = texture;
            onTextureLoad();
        }, undefined, () => {
            console.warn('Failed to load sand texture');
            onTextureLoad();
        });

        // Load rock texture
        textureLoader.load('images/rocky_coast_texture.jpg', (texture) => {
            rockTexture = texture;
            onTextureLoad();
        }, undefined, () => {
            console.warn('Failed to load rock texture');
            onTextureLoad();
        });

        // Load water texture
        textureLoader.load('images/ocean_water_texture_1.jpg', (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(5, 5);
            waterTexture = texture;
            onTextureLoad();
        }, undefined, () => {
            console.warn('Failed to load water texture');
            onTextureLoad();
        });

        // Load algae textures
        textureLoader.load('images/green_algae_bloom_1.jpg', (texture) => {
            algaeTextures.cyanobacteria = texture;
            onTextureLoad();
        }, undefined, () => {
            console.warn('Failed to load cyanobacteria texture');
            onTextureLoad();
        });

        textureLoader.load('images/red_tide_1.jpg', (texture) => {
            algaeTextures.dinoflagellates = texture;
            onTextureLoad();
        }, undefined, () => {
            console.warn('Failed to load dinoflagellates texture');
            onTextureLoad();
        });

        textureLoader.load('images/cyanobacteria_bloom.jpg', (texture) => {
            algaeTextures.mixed = texture;
            onTextureLoad();
        }, undefined, () => {
            console.warn('Failed to load mixed algae texture');
            onTextureLoad();
        });
    });
}

// Create lighting system
function createLighting3D() {
    // Ambient light (underwater ambient)
    ambientLight = new THREE.AmbientLight(0x1a4d6d, 0.6);
    scene.add(ambientLight);

    // Hemisphere light (water surface and depth)
    hemisphereLight = new THREE.HemisphereLight(0x4a90c2, 0x0a2540, 0.7);
    scene.add(hemisphereLight);

    // Directional light (sun rays through water)
    directionalLight = new THREE.DirectionalLight(0x6ab3e8, 1.2);
    directionalLight.position.set(30, 40, 20);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -80;
    directionalLight.shadow.camera.right = 80;
    directionalLight.shadow.camera.top = 80;
    directionalLight.shadow.camera.bottom = -80;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);
    
    // Add point lights for volumetric effect
    const pointLight1 = new THREE.PointLight(0x4a90c2, 0.5, 50);
    pointLight1.position.set(20, 3, 20);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x3a7fa2, 0.5, 50);
    pointLight2.position.set(-20, 3, -20);
    scene.add(pointLight2);
    
    // Spot light for dramatic effect
    const spotLight = new THREE.SpotLight(0x6ab3e8, 0.8);
    spotLight.position.set(0, 30, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    spotLight.decay = 2;
    spotLight.distance = 100;
    spotLight.castShadow = true;
    scene.add(spotLight);
}

// Update lighting based on time of day
function updateLighting3D() {
    if (timeOfDay === 'day') {
        ambientLight.intensity = 0.6;
        ambientLight.color.setHex(0x1a4d6d);
        hemisphereLight.intensity = 0.7;
        hemisphereLight.color.setHex(0x4a90c2);
        hemisphereLight.groundColor.setHex(0x0a2540);
        directionalLight.intensity = 1.2;
        directionalLight.color.setHex(0x6ab3e8);
        scene.fog.color.setHex(0x0a3d5c);
        scene.background.setHex(0x0a3d5c);
    } else {
        ambientLight.intensity = 0.3;
        ambientLight.color.setHex(0x0a2540);
        hemisphereLight.intensity = 0.4;
        hemisphereLight.color.setHex(0x1a3d5c);
        hemisphereLight.groundColor.setHex(0x051220);
        directionalLight.intensity = 0.5;
        directionalLight.color.setHex(0x2a5a7a);
        scene.fog.color.setHex(0x051a2d);
        scene.background.setHex(0x051a2d);
    }
}

// Create ocean floor with 3D terrain
function createOceanFloor3D() {
    const floorGeometry = new THREE.PlaneGeometry(200, 200, 80, 80);
    
    // Create realistic 3D terrain with hills and valleys using Perlin-like noise
    const vertices = floorGeometry.attributes.position.array;
    
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        
        // Multiple layers of sine waves for organic terrain
        let height = 0;
        
        // Large hills and valleys
        height += Math.sin(x * 0.05) * 8;
        height += Math.cos(y * 0.05) * 8;
        
        // Medium undulations
        height += Math.sin(x * 0.1 + y * 0.1) * 4;
        height += Math.cos(x * 0.15 - y * 0.1) * 3;
        
        // Small details
        height += Math.sin(x * 0.3) * 1.5;
        height += Math.cos(y * 0.3) * 1.5;
        
        // Random noise for texture
        height += (Math.random() - 0.5) * 2;
        
        // Create some deeper valleys
        const distFromCenter = Math.sqrt(x * x + y * y);
        if (distFromCenter < 60) {
            height -= Math.cos(distFromCenter * 0.08) * 3;
        }
        
        vertices[i + 2] = height;
    }
    
    floorGeometry.attributes.position.needsUpdate = true;
    floorGeometry.computeVertexNormals();

    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0xb8a67d,
        roughness: 0.95,
        metalness: 0.05
    });

    oceanFloor = new THREE.Mesh(floorGeometry, floorMaterial);
    oceanFloor.rotation.x = -Math.PI / 2;
    oceanFloor.position.y = -10;
    oceanFloor.receiveShadow = true;
    oceanFloor.castShadow = false;
    scene.add(oceanFloor);

    // Add rocks
    addRocks3D();

    // Add coral-like structures
    addCoralStructures3D();
}

// Add rocks to ocean floor
function addRocks3D() {
    // Create larger rock formations
    for (let i = 0; i < 15; i++) {
        const rockGroup = new THREE.Group();
        const rockCount = Math.floor(Math.random() * 4) + 2;
        
        for (let j = 0; j < rockCount; j++) {
            const rockType = Math.floor(Math.random() * 3);
            let rockGeometry;
            
            if (rockType === 0) {
                rockGeometry = new THREE.DodecahedronGeometry(Math.random() * 2 + 1, 1);
            } else if (rockType === 1) {
                rockGeometry = new THREE.IcosahedronGeometry(Math.random() * 2 + 1, 1);
            } else {
                rockGeometry = new THREE.TetrahedronGeometry(Math.random() * 2.5 + 1, 0);
            }
            
            // Deform rock for natural appearance
            const vertices = rockGeometry.attributes.position.array;
            for (let k = 0; k < vertices.length; k += 3) {
                const noise = Math.random() * 0.4;
                vertices[k] *= 1 + noise;
                vertices[k + 1] *= 1 + noise;
                vertices[k + 2] *= 1 + noise;
            }
            rockGeometry.attributes.position.needsUpdate = true;
            rockGeometry.computeVertexNormals();
            
            const rockMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(
                    0.08 + Math.random() * 0.05,
                    0.2 + Math.random() * 0.2,
                    0.2 + Math.random() * 0.2
                ),
                roughness: 0.95,
                metalness: 0.05,
                bumpScale: 0.5
            });

            const rock = new THREE.Mesh(rockGeometry, rockMaterial);
            rock.position.x = (Math.random() - 0.5) * 3;
            rock.position.y = Math.random() * 1;
            rock.position.z = (Math.random() - 0.5) * 3;
            rock.scale.set(
                Math.random() * 1.5 + 0.8,
                Math.random() * 1.2 + 0.6,
                Math.random() * 1.5 + 0.8
            );
            rock.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            rock.castShadow = true;
            rock.receiveShadow = true;
            rockGroup.add(rock);
        }
        
        rockGroup.position.x = Math.random() * 180 - 90;
        rockGroup.position.z = Math.random() * 180 - 90;
        rockGroup.position.y = -9;
        scene.add(rockGroup);
    }
    
    // Add some moss-covered rocks
    for (let i = 0; i < 8; i++) {
        const rockGeometry = new THREE.DodecahedronGeometry(Math.random() * 1.5 + 1.5, 1);
        
        // Deform
        const vertices = rockGeometry.attributes.position.array;
        for (let j = 0; j < vertices.length; j += 3) {
            const noise = Math.random() * 0.3;
            vertices[j] *= 1 + noise;
            vertices[j + 1] *= 1 + noise;
            vertices[j + 2] *= 1 + noise;
        }
        rockGeometry.attributes.position.needsUpdate = true;
        rockGeometry.computeVertexNormals();
        
        const rockMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0.25, 0.5, 0.3), // Greenish
            roughness: 0.9,
            metalness: 0.1
        });

        const rock = new THREE.Mesh(rockGeometry, rockMaterial);
        rock.position.x = Math.random() * 180 - 90;
        rock.position.z = Math.random() * 180 - 90;
        rock.position.y = -8 + Math.random() * 2;
        rock.scale.set(
            Math.random() * 1.5 + 1,
            Math.random() * 1 + 0.8,
            Math.random() * 1.5 + 1
        );
        rock.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        rock.castShadow = true;
        rock.receiveShadow = true;
        scene.add(rock);
    }
}

// Add coral-like structures
function addCoralStructures3D() {
    // Create various types of coral structures
    for (let i = 0; i < 20; i++) {
        const coralType = Math.floor(Math.random() * 4);
        
        if (coralType === 0) {
            // Branching coral (similar to staghorn)
            createBranchingCoral3D();
        } else if (coralType === 1) {
            // Brain coral (rounded and textured)
            createBrainCoral3D();
        } else if (coralType === 2) {
            // Table coral (flat top)
            createTableCoral3D();
        } else {
            // Fan coral (vertical and flat)
            createFanCoral3D();
        }
    }
}

// Create branching coral
function createBranchingCoral3D() {
    const coralGroup = new THREE.Group();
    const branches = Math.floor(Math.random() * 8) + 5;
    
    const coralColor = new THREE.Color().setHSL(
        Math.random() * 0.15 + 0.05, // Orange to brown hues
        0.7,
        0.4 + Math.random() * 0.2
    );
    
    for (let j = 0; j < branches; j++) {
        const branchHeight = Math.random() * 4 + 2;
        const branchGeometry = new THREE.CylinderGeometry(
            0.08 + Math.random() * 0.05,
            0.15 + Math.random() * 0.1,
            branchHeight,
            8
        );
        
        const branchMaterial = new THREE.MeshStandardMaterial({
            color: coralColor,
            roughness: 0.9,
            metalness: 0.1,
            bumpScale: 0.3
        });
        
        const branch = new THREE.Mesh(branchGeometry, branchMaterial);
        branch.position.y = branchHeight / 2;
        branch.position.x = (Math.random() - 0.5) * 1.5;
        branch.position.z = (Math.random() - 0.5) * 1.5;
        branch.rotation.z = (Math.random() - 0.5) * 0.5;
        branch.rotation.x = (Math.random() - 0.5) * 0.3;
        branch.castShadow = true;
        branch.receiveShadow = true;
        coralGroup.add(branch);
        
        // Add sub-branches
        if (Math.random() > 0.5) {
            const subBranchGeometry = new THREE.CylinderGeometry(0.05, 0.08, branchHeight * 0.6, 6);
            const subBranch = new THREE.Mesh(subBranchGeometry, branchMaterial);
            subBranch.position.copy(branch.position);
            subBranch.position.y += branchHeight * 0.3;
            subBranch.position.x += (Math.random() - 0.5) * 0.5;
            subBranch.position.z += (Math.random() - 0.5) * 0.5;
            subBranch.rotation.z = branch.rotation.z + (Math.random() - 0.5) * 0.8;
            subBranch.castShadow = true;
            coralGroup.add(subBranch);
        }
    }
    
    coralGroup.position.x = Math.random() * 160 - 80;
    coralGroup.position.z = Math.random() * 160 - 80;
    coralGroup.position.y = -8;
    coralGroup.scale.set(
        Math.random() * 0.6 + 0.7,
        Math.random() * 0.6 + 0.7,
        Math.random() * 0.6 + 0.7
    );
    scene.add(coralGroup);
}

// Create brain coral
function createBrainCoral3D() {
    const radius = Math.random() * 1.5 + 1;
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    
    // Deform to make it more organic
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        const noise = Math.random() * 0.3;
        vertices[i] *= 1 + noise;
        vertices[i + 1] *= 0.5 + noise; // Flatten top
        vertices[i + 2] *= 1 + noise;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.15, 0.5, 0.4),
        roughness: 0.95,
        metalness: 0.05,
        bumpScale: 0.5
    });
    
    const coral = new THREE.Mesh(geometry, material);
    coral.position.x = Math.random() * 160 - 80;
    coral.position.z = Math.random() * 160 - 80;
    coral.position.y = -8 + radius * 0.3;
    coral.castShadow = true;
    coral.receiveShadow = true;
    scene.add(coral);
}

// Create table coral
function createTableCoral3D() {
    const coralGroup = new THREE.Group();
    
    // Stem
    const stemGeometry = new THREE.CylinderGeometry(0.3, 0.5, 2, 8);
    const stemMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.08, 0.6, 0.35),
        roughness: 0.9,
        metalness: 0.1
    });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 1;
    stem.castShadow = true;
    coralGroup.add(stem);
    
    // Table top
    const tableGeometry = new THREE.CylinderGeometry(
        Math.random() * 2 + 2,
        Math.random() * 1 + 1.5,
        0.5,
        16
    );
    
    // Make edges irregular
    const vertices = tableGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        if (vertices[i + 1] > 0.2) { // Top vertices
            const noise = Math.random() * 0.3;
            vertices[i] *= 1 + noise;
            vertices[i + 2] *= 1 + noise;
        }
    }
    tableGeometry.attributes.position.needsUpdate = true;
    tableGeometry.computeVertexNormals();
    
    const tableMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.1, 0.6, 0.4),
        roughness: 0.85,
        metalness: 0.1
    });
    
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.y = 2.2;
    table.castShadow = true;
    table.receiveShadow = true;
    coralGroup.add(table);
    
    coralGroup.position.x = Math.random() * 160 - 80;
    coralGroup.position.z = Math.random() * 160 - 80;
    coralGroup.position.y = -8;
    coralGroup.scale.set(
        Math.random() * 0.5 + 0.8,
        Math.random() * 0.5 + 0.8,
        Math.random() * 0.5 + 0.8
    );
    scene.add(coralGroup);
}

// Create fan coral
function createFanCoral3D() {
    const coralGroup = new THREE.Group();
    
    // Create fan shape using multiple thin cylinders
    const fanSegments = Math.floor(Math.random() * 8) + 10;
    const fanRadius = Math.random() * 2 + 2;
    
    const coralColor = new THREE.Color().setHSL(
        Math.random() * 0.2 + 0.5, // Green to cyan
        0.6,
        0.4
    );
    
    for (let i = 0; i < fanSegments; i++) {
        const angle = (Math.PI / fanSegments) * i - Math.PI / 2;
        const segmentHeight = Math.sin(angle + Math.PI / 2) * fanRadius;
        
        const segmentGeometry = new THREE.CylinderGeometry(0.03, 0.05, segmentHeight, 6);
        const segmentMaterial = new THREE.MeshStandardMaterial({
            color: coralColor,
            roughness: 0.8,
            metalness: 0.2,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        });
        
        const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
        segment.position.y = segmentHeight / 2;
        segment.position.x = Math.cos(angle) * fanRadius * 0.3;
        segment.rotation.z = angle;
        segment.castShadow = true;
        coralGroup.add(segment);
    }
    
    // Add connecting membrane (visual effect)
    const membraneGeometry = new THREE.CircleGeometry(fanRadius, 32, 0, Math.PI);
    const membraneMaterial = new THREE.MeshStandardMaterial({
        color: coralColor,
        roughness: 0.7,
        metalness: 0.1,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
    });
    
    const membrane = new THREE.Mesh(membraneGeometry, membraneMaterial);
    membrane.rotation.z = -Math.PI / 2;
    membrane.position.y = fanRadius / 2;
    coralGroup.add(membrane);
    
    coralGroup.position.x = Math.random() * 160 - 80;
    coralGroup.position.z = Math.random() * 160 - 80;
    coralGroup.position.y = -8;
    coralGroup.rotation.y = Math.random() * Math.PI * 2;
    coralGroup.scale.set(
        Math.random() * 0.4 + 0.6,
        Math.random() * 0.4 + 0.6,
        Math.random() * 0.4 + 0.6
    );
    scene.add(coralGroup);
}

// Create water surface
function createWaterSurface3D() {
    const waterGeometry = new THREE.PlaneGeometry(200, 200, 100, 100);
    
    const waterMaterial = new THREE.MeshStandardMaterial({
        color: 0x0077be,
        transparent: true,
        opacity: 0.6,
        roughness: 0.1,
        metalness: 0.8,
        side: THREE.DoubleSide
    });

    waterSurface = new THREE.Mesh(waterGeometry, waterMaterial);
    waterSurface.rotation.x = -Math.PI / 2;
    waterSurface.position.y = 5;
    waterSurface.receiveShadow = true;
    scene.add(waterSurface);
}

// Animate water surface
function animateWater3D() {
    if (!waterSurface) return;
    
    const time = Date.now() * 0.001;
    const vertices = waterSurface.geometry.attributes.position.array;
    
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        vertices[i + 2] = Math.sin(x * 0.1 + time) * 0.5 + Math.cos(y * 0.1 + time) * 0.5;
    }
    
    waterSurface.geometry.attributes.position.needsUpdate = true;
    waterSurface.geometry.computeVertexNormals();
}

// Create algae models with textures
function createAlgaeModels3D() {
    // Clear existing models
    algaeModels.forEach(model => scene.remove(model));
    algaeModels = [];

    const algaeCount = 50;
    
    for (let i = 0; i < algaeCount; i++) {
        // Create organic algae blob
        const algaeGeometry = new THREE.SphereGeometry(
            Math.random() * 0.5 + 0.3,
            16,
            16
        );
        
        // Deform sphere to make it more organic
        const vertices = algaeGeometry.attributes.position.array;
        for (let j = 0; j < vertices.length; j += 3) {
            const noise = Math.random() * 0.3;
            vertices[j] *= 1 + noise;
            vertices[j + 1] *= 1 + noise;
            vertices[j + 2] *= 1 + noise;
        }
        algaeGeometry.attributes.position.needsUpdate = true;
        algaeGeometry.computeVertexNormals();

        let algueMaterial;
        
        if (bloomType === 'cyanobacteria') {
            algueMaterial = new THREE.MeshStandardMaterial({
                color: 0x00ff00,
                emissive: 0x003300,
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.7 + (bloomIntensity / 100) * 0.3,
                roughness: 0.5,
                metalness: 0.2
            });
        } else if (bloomType === 'dinoflagellates') {
            algueMaterial = new THREE.MeshStandardMaterial({
                color: 0xff3333,
                emissive: 0x330000,
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.7 + (bloomIntensity / 100) * 0.3,
                roughness: 0.5,
                metalness: 0.2
            });
        } else {
            algueMaterial = new THREE.MeshStandardMaterial({
                color: 0x9acd32,
                emissive: 0x334400,
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.7 + (bloomIntensity / 100) * 0.3,
                roughness: 0.5,
                metalness: 0.2
            });
        }

        const algae = new THREE.Mesh(algaeGeometry, algueMaterial);
        
        // Position algae
        algae.position.x = Math.random() * 100 - 50;
        algae.position.y = Math.random() * 12 - 4;
        algae.position.z = Math.random() * 100 - 50;
        
        // Random rotation
        algae.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        // Store velocity for animation
        algae.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.02
        );
        
        algae.userData.rotationSpeed = new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01
        );
        
        algae.castShadow = true;
        scene.add(algae);
        algaeModels.push(algae);
    }
}

// Update algae visibility based on bloom type
function updateAlgaeVisibility3D() {
    createAlgaeModels3D();
}

// Animate algae models
function animateAlgae3D() {
    algaeModels.forEach(algae => {
        // Move algae
        algae.position.add(algae.userData.velocity);
        
        // Rotate algae
        algae.rotation.x += algae.userData.rotationSpeed.x;
        algae.rotation.y += algae.userData.rotationSpeed.y;
        algae.rotation.z += algae.userData.rotationSpeed.z;
        
        // Boundary check
        if (Math.abs(algae.position.x) > 50) {
            algae.userData.velocity.x *= -1;
        }
        if (algae.position.y < -4 || algae.position.y > 5) {
            algae.userData.velocity.y *= -1;
        }
        if (Math.abs(algae.position.z) > 50) {
            algae.userData.velocity.z *= -1;
        }
        
        // Update opacity based on bloom intensity
        algae.material.opacity = 0.5 + (bloomIntensity / 100) * 0.5;
    });
}

// Create ambient elements (fish, bubbles, etc.)
function createAmbientElements3D() {
    // Create fish with better models
    createFish3D();

    // Create bubbles
    createBubbles3D();
    
    // Create seaweed
    createSeaweed3D();
}

// Create fish
function createFish3D() {
    for (let i = 0; i < 15; i++) {
        const fishGroup = new THREE.Group();
        
        // Fish body
        const bodyGeometry = new THREE.ConeGeometry(0.3, 1.2, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
            roughness: 0.5,
            metalness: 0.3
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.rotation.z = Math.PI / 2;
        fishGroup.add(body);
        
        // Fish tail
        const tailGeometry = new THREE.ConeGeometry(0.2, 0.5, 3);
        const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
        tail.position.x = -0.6;
        tail.rotation.z = Math.PI / 2;
        fishGroup.add(tail);
        
        // Fish fins
        const finGeometry = new THREE.ConeGeometry(0.1, 0.3, 3);
        const finTop = new THREE.Mesh(finGeometry, bodyMaterial);
        finTop.position.y = 0.2;
        finTop.rotation.z = Math.PI / 4;
        fishGroup.add(finTop);
        
        const finBottom = new THREE.Mesh(finGeometry, bodyMaterial);
        finBottom.position.y = -0.2;
        finBottom.rotation.z = -Math.PI / 4;
        fishGroup.add(finBottom);
        
        fishGroup.position.x = Math.random() * 80 - 40;
        fishGroup.position.y = Math.random() * 8 - 2;
        fishGroup.position.z = Math.random() * 80 - 40;
        fishGroup.userData.speed = Math.random() * 0.02 + 0.01;
        fishGroup.userData.angle = Math.random() * Math.PI * 2;
        fishGroup.userData.swimOffset = Math.random() * Math.PI * 2;
        fishGroup.castShadow = true;
        scene.add(fishGroup);
    }
}

// Create bubbles
function createBubbles3D() {
    const bubbleGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const bubbleMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.4,
        roughness: 0.1,
        metalness: 0.9
    });

    for (let i = 0; i < 80; i++) {
        const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
        bubble.position.x = Math.random() * 100 - 50;
        bubble.position.y = Math.random() * 10 - 5;
        bubble.position.z = Math.random() * 100 - 50;
        bubble.userData.speed = Math.random() * 0.03 + 0.01;
        bubble.userData.wobble = Math.random() * 0.02;
        bubble.userData.wobbleOffset = Math.random() * Math.PI * 2;
        bubble.scale.set(
            Math.random() * 0.5 + 0.5,
            Math.random() * 0.5 + 0.5,
            Math.random() * 0.5 + 0.5
        );
        scene.add(bubble);
    }
}

// Create seaweed
function createSeaweed3D() {
    // Create tall kelp-like seaweed
    for (let i = 0; i < 40; i++) {
        const seaweedGroup = new THREE.Group();
        const segments = Math.floor(Math.random() * 8) + 6;
        const seaweedType = Math.floor(Math.random() * 3);
        
        let seaweedColor;
        if (seaweedType === 0) {
            seaweedColor = new THREE.Color().setHSL(0.28, 0.7, 0.35); // Dark green
        } else if (seaweedType === 1) {
            seaweedColor = new THREE.Color().setHSL(0.35, 0.6, 0.4); // Lighter green
        } else {
            seaweedColor = new THREE.Color().setHSL(0.15, 0.5, 0.3); // Brown-green
        }
        
        for (let j = 0; j < segments; j++) {
            const segmentHeight = 0.6 + Math.random() * 0.3;
            const segmentWidth = 0.08 - (j / segments) * 0.03;
            
            const segmentGeometry = new THREE.CylinderGeometry(
                segmentWidth * 0.8,
                segmentWidth,
                segmentHeight,
                8
            );
            
            const segmentMaterial = new THREE.MeshStandardMaterial({
                color: seaweedColor,
                roughness: 0.8,
                metalness: 0.1,
                side: THREE.DoubleSide
            });
            
            const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
            segment.position.y = j * segmentHeight * 0.9;
            segment.position.x = Math.sin(j * 0.4) * 0.15;
            segment.position.z = Math.cos(j * 0.4) * 0.1;
            segment.rotation.z = Math.sin(j * 0.3) * 0.25;
            segment.rotation.x = Math.cos(j * 0.3) * 0.15;
            segment.castShadow = true;
            segment.receiveShadow = true;
            seaweedGroup.add(segment);
            
            // Add leaves to some segments
            if (j > 2 && Math.random() > 0.6) {
                const leafGeometry = new THREE.ConeGeometry(0.15, 0.5, 8);
                const leafMaterial = new THREE.MeshStandardMaterial({
                    color: seaweedColor,
                    roughness: 0.7,
                    metalness: 0.1,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.9
                });
                
                const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
                leaf.position.copy(segment.position);
                leaf.position.x += (Math.random() - 0.5) * 0.2;
                leaf.position.y += segmentHeight * 0.3;
                leaf.rotation.z = Math.PI / 2 + (Math.random() - 0.5) * 0.5;
                leaf.rotation.y = Math.random() * Math.PI * 2;
                leaf.scale.set(0.8, 1, 0.3);
                leaf.castShadow = true;
                seaweedGroup.add(leaf);
            }
        }
        
        seaweedGroup.position.x = Math.random() * 160 - 80;
        seaweedGroup.position.z = Math.random() * 160 - 80;
        seaweedGroup.position.y = -9;
        seaweedGroup.userData.swaySpeed = Math.random() * 0.4 + 0.6;
        seaweedGroup.userData.swayAmount = Math.random() * 0.25 + 0.15;
        seaweedGroup.userData.swayOffset = Math.random() * Math.PI * 2;
        scene.add(seaweedGroup);
    }
    
    // Create bushy underwater plants
    for (let i = 0; i < 25; i++) {
        const plantGroup = new THREE.Group();
        const branches = Math.floor(Math.random() * 6) + 4;
        
        const plantColor = new THREE.Color().setHSL(
            0.25 + Math.random() * 0.15,
            0.6,
            0.35 + Math.random() * 0.15
        );
        
        for (let j = 0; j < branches; j++) {
            const branchHeight = Math.random() * 1.5 + 1;
            const branchGeometry = new THREE.CylinderGeometry(0.05, 0.08, branchHeight, 6);
            const branchMaterial = new THREE.MeshStandardMaterial({
                color: plantColor,
                roughness: 0.8,
                metalness: 0.1
            });
            
            const branch = new THREE.Mesh(branchGeometry, branchMaterial);
            branch.position.y = branchHeight / 2;
            branch.position.x = (Math.random() - 0.5) * 0.5;
            branch.position.z = (Math.random() - 0.5) * 0.5;
            branch.rotation.z = (Math.random() - 0.5) * 0.6;
            branch.rotation.x = (Math.random() - 0.5) * 0.6;
            branch.castShadow = true;
            plantGroup.add(branch);
            
            // Add small leaves
            const leafCount = Math.floor(Math.random() * 4) + 3;
            for (let k = 0; k < leafCount; k++) {
                const leafGeometry = new THREE.SphereGeometry(0.08, 8, 8);
                const leafMaterial = new THREE.MeshStandardMaterial({
                    color: plantColor,
                    roughness: 0.7,
                    metalness: 0.1
                });
                
                const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
                leaf.position.copy(branch.position);
                leaf.position.y += (k / leafCount) * branchHeight - branchHeight * 0.3;
                leaf.position.x += (Math.random() - 0.5) * 0.15;
                leaf.position.z += (Math.random() - 0.5) * 0.15;
                leaf.scale.set(1, 0.5, 0.5);
                leaf.castShadow = true;
                plantGroup.add(leaf);
            }
        }
        
        plantGroup.position.x = Math.random() * 160 - 80;
        plantGroup.position.z = Math.random() * 160 - 80;
        plantGroup.position.y = -9;
        plantGroup.userData.swaySpeed = Math.random() * 0.5 + 0.5;
        plantGroup.userData.swayAmount = Math.random() * 0.2 + 0.1;
        plantGroup.userData.swayOffset = Math.random() * Math.PI * 2;
        scene.add(plantGroup);
    }
}

// Animate ambient elements
function animateAmbientElements3D() {
    const time = Date.now() * 0.001;
    
    scene.children.forEach(child => {
        // Animate fish
        if (child.type === 'Group' && child.children.length > 0 && 
            child.children[0].geometry && child.children[0].geometry.type === 'ConeGeometry') {
            child.userData.angle += child.userData.speed;
            child.position.x += Math.cos(child.userData.angle) * 0.1;
            child.position.z += Math.sin(child.userData.angle) * 0.1;
            child.rotation.y = child.userData.angle;
            
            // Swimming animation
            child.position.y += Math.sin(time * 2 + child.userData.swimOffset) * 0.01;
            child.children[1].rotation.y = Math.sin(time * 5 + child.userData.swimOffset) * 0.3;
        }

        // Animate bubbles
        if (child.geometry && child.geometry.type === 'SphereGeometry' && 
            child.material.opacity < 0.5) {
            child.position.y += child.userData.speed;
            child.position.x += Math.sin(time + child.userData.wobbleOffset) * child.userData.wobble;
            
            if (child.position.y > 5) {
                child.position.y = -5;
                child.position.x = Math.random() * 100 - 50;
                child.position.z = Math.random() * 100 - 50;
            }
        }
        
        // Animate seaweed and plants
        if (child.type === 'Group' && child.userData.swaySpeed && child.userData.swayOffset !== undefined) {
            child.rotation.z = Math.sin(time * child.userData.swaySpeed + child.userData.swayOffset) * child.userData.swayAmount;
            child.rotation.x = Math.cos(time * child.userData.swaySpeed * 0.7 + child.userData.swayOffset) * child.userData.swayAmount * 0.5;
        }
    });
}

// Setup event listeners
function setupEventListeners3D() {
    // Window resize
    window.addEventListener('resize', onWindowResize3D, false);

    // Bloom type buttons
    document.querySelectorAll('[data-bloom-type]').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('[data-bloom-type]').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            bloomType = this.getAttribute('data-bloom-type');
            updateAlgaeVisibility3D();
        });
    });

    // Bloom intensity slider
    const intensitySlider = document.getElementById('bloom-intensity');
    const intensityValue = document.getElementById('intensity-value');
    if (intensitySlider && intensityValue) {
        intensitySlider.addEventListener('input', function() {
            bloomIntensity = parseInt(this.value);
            intensityValue.textContent = bloomIntensity + '%';
        });
    }

    // Water temperature slider
    const temperatureSlider = document.getElementById('water-temperature');
    const temperatureValue = document.getElementById('temperature-value');
    if (temperatureSlider && temperatureValue) {
        temperatureSlider.addEventListener('input', function() {
            waterTemperature = parseInt(this.value);
            temperatureValue.textContent = waterTemperature + '°C';
            updateWaterColor3D();
        });
    }

    // Time of day buttons
    document.querySelectorAll('[data-time]').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('[data-time]').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            timeOfDay = this.getAttribute('data-time');
            updateLighting3D();
        });
    });

    // Reset camera button
    const resetButton = document.getElementById('reset-camera');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            camera.position.set(0, 5, 35);
            controls.target.set(0, -5, 0);
            controls.update();
        });
    }
}

// Update water color based on temperature
function updateWaterColor3D() {
    if (!waterSurface) return;
    
    // Warmer water = more greenish (algae growth)
    const tempFactor = (waterTemperature - 15) / 20;
    const r = Math.floor(0 + tempFactor * 50);
    const g = Math.floor(119 + tempFactor * 100);
    const b = Math.floor(190 - tempFactor * 100);
    
    waterSurface.material.color.setRGB(r / 255, g / 255, b / 255);
}

// Handle window resize
function onWindowResize3D() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Animation loop
function animate3D() {
    animationId = requestAnimationFrame(animate3D);

    // Update controls
    controls.update();

    // Animate water
    animateWater3D();

    // Animate algae
    animateAlgae3D();

    // Animate ambient elements
    animateAmbientElements3D();

    // Render scene
    renderer.render(scene, camera);
}

// Scroll to visualization section
function scrollToVisualization() {
    const visualizationSection = document.getElementById('visualizacao');
    if (visualizationSection) {
        visualizationSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize 3D when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if 3D section exists
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        // Use Intersection Observer to load 3D only when section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !scene) {
                    init3D();
                    
                    // Update lighting on load
                    setTimeout(() => {
                        updateLighting3D();
                    }, 100);
                    
                    // Disconnect observer after initialization
                    observer.disconnect();
                }
            });
        }, {
            rootMargin: '100px'
        });
        
        observer.observe(canvasContainer);
    }
});

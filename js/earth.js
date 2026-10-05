// ======================================================
// STEPS TO LIFE
// EARTH.JS VERSION 2.0
// Part 1 of 2
// ======================================================


// ======================================================
// SCENE
// ======================================================

const scene = new THREE.Scene();


// ======================================================
// CAMERA
// ======================================================

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
);

camera.position.set(0,0,4.5);


// ======================================================
// RENDERER
// ======================================================

const renderer = new THREE.WebGLRenderer({

    antialias:true,
    alpha:true

});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio,2)
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setClearColor(0x000000,1);

document
.getElementById("earth-container")
.appendChild(renderer.domElement);


// ======================================================
// TEXTURES
// ======================================================

const loader = new THREE.TextureLoader();

const earthTexture =
loader.load("textures/earth.jpg");

const normalTexture =
loader.load("textures/earth_normal.jpg");

const specularTexture =
loader.load("textures/earth_specular.jpg");

const cloudTexture =
loader.load("textures/earth_clouds.png");


// ======================================================
// EARTH
// ======================================================

const earthGeometry =
new THREE.SphereGeometry(
1.35,
128,
128
);

const earthMaterial =
new THREE.MeshPhongMaterial({

map:earthTexture,

normalMap:normalTexture,

specularMap:specularTexture,

shininess:8,

specular:new THREE.Color(0x666666)

});

const earth =
new THREE.Mesh(
earthGeometry,
earthMaterial
);

scene.add(earth);

earth.position.set(-0.9,0,0);


// ======================================================
// CLOUDS
// ======================================================

const cloudGeometry =
new THREE.SphereGeometry(
1.37,
128,
128
);

const cloudMaterial =
new THREE.MeshPhongMaterial({

map:cloudTexture,

transparent:true,

opacity:0.82,

depthWrite:false

});

const clouds =
new THREE.Mesh(
cloudGeometry,
cloudMaterial
);

scene.add(clouds);

clouds.position.copy(earth.position);


// ======================================================
// ATMOSPHERE
// ======================================================

const atmosphereGeometry =
new THREE.SphereGeometry(
1.43,
128,
128
);

const atmosphereMaterial =
new THREE.MeshBasicMaterial({

color:0x66ccff,

transparent:true,

opacity:0.08,

blending:THREE.AdditiveBlending,

side:THREE.BackSide

});

const atmosphere =
new THREE.Mesh(
atmosphereGeometry,
atmosphereMaterial
);

scene.add(atmosphere);

atmosphere.position.copy(earth.position);


// ======================================================
// SUNRISE GLOW
// ======================================================

const sunriseGeometry =
new THREE.SphereGeometry(
1.46,
128,
128
);

const sunriseMaterial =
new THREE.MeshBasicMaterial({

color:0x4fc3ff,

transparent:true,

opacity:0.035,

blending:THREE.AdditiveBlending,

side:THREE.BackSide

});

const sunrise =
new THREE.Mesh(
sunriseGeometry,
sunriseMaterial
);

scene.add(sunrise);

sunrise.position.copy(earth.position);


// ======================================================
// INTRO ANIMATION
// ======================================================

earth.scale.set(.15,.15,.15);
clouds.scale.set(.15,.15,.15);
atmosphere.scale.set(.15,.15,.15);
sunrise.scale.set(.15,.15,.15);

earth.position.z=-8;
clouds.position.z=-8;
atmosphere.position.z=-8;
sunrise.position.z=-8;

let introProgress=0;


// ======================================================
// STAR FIELD
// ======================================================

function createStars(count,radius,size,opacity){

const geometry =
new THREE.BufferGeometry();

const vertices=[];

for(let i=0;i<count;i++){

const r=radius+Math.random()*600;

const theta=Math.random()*Math.PI*2;

const phi=Math.acos(2*Math.random()-1);

vertices.push(

r*Math.sin(phi)*Math.cos(theta),

r*Math.sin(phi)*Math.sin(theta),

r*Math.cos(phi)

);

}

geometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(vertices,3)

);

const material=
new THREE.PointsMaterial({

color:0xffffff,

size:size,

transparent:true,

opacity:opacity,

sizeAttenuation:false

});

const stars=
new THREE.Points(
geometry,
material
);

scene.add(stars);

return stars;

}


const starsSmall=createStars(
32000,
700,
0.35,
0.70
);

const starsMedium=createStars(
9000,
700,
0.70,
0.90
);

const starsLarge=createStars(
1200,
700,
1.40,
1
);


// ======================================================
// SHOOTING STAR
// ======================================================

const shootingGeometry=
new THREE.BufferGeometry();

shootingGeometry.setAttribute(

"position",

new THREE.Float32BufferAttribute([0,0,0],3)

);

const shootingMaterial=
new THREE.PointsMaterial({

color:0xffffff,

size:3,

transparent:true,

opacity:1,

sizeAttenuation:false

});

const shootingStar=
new THREE.Points(

shootingGeometry,

shootingMaterial

);

scene.add(shootingStar);

function resetShootingStar(){

shootingStar.position.set(

-300+Math.random()*150,

150+Math.random()*200,

-250+Math.random()*500

);

}

resetShootingStar();


// ======================================================
// LIGHTING
// ======================================================

scene.add(

new THREE.AmbientLight(
0xffffff,
0.28
)

);

const sunLight=
new THREE.DirectionalLight(
0xffffff,
1.5
);

sunLight.position.set(
12,
6,
10
);

scene.add(sunLight);

const rimLight=
new THREE.DirectionalLight(
0x66ccff,
0.8
);

rimLight.position.set(
-10,
2,
-8
);

scene.add(rimLight);

const fillLight=
new THREE.DirectionalLight(
0xffffff,
0.4
);

fillLight.position.set(
-3,
-2,
5
);

scene.add(fillLight);

const glowLight=
new THREE.PointLight(
0x66ccff,
0.8,
10
);

glowLight.position.copy(
sunLight.position
);

scene.add(glowLight);


// ======================================================
// GLOBAL CAMERA ZOOM VARIABLES
// ======================================================

window.zooming=false;

window.zoomTarget=3.6;
// ======================================================
// ANIMATION LOOP
// Part 2 of 2
// ======================================================

function animate() {

    requestAnimationFrame(animate);

    const time = Date.now() * 0.0005;

    // -------------------------------------
    // INTRO ANIMATION
    // -------------------------------------

    if (introProgress < 1) {

        introProgress += 0.006;

        const scale = 0.15 + introProgress * 0.85;

        earth.scale.set(scale, scale, scale);
        clouds.scale.set(scale, scale, scale);
        atmosphere.scale.set(scale, scale, scale);
        sunrise.scale.set(scale, scale, scale);

        const z = -8 + introProgress * 8;

        earth.position.z = z;
        clouds.position.z = z;
        atmosphere.position.z = z;
        sunrise.position.z = z;

    }

    // -------------------------------------
    // EARTH ROTATION
    // -------------------------------------

    earth.rotation.y += 0.0012;
    clouds.rotation.y += 0.0022;
    atmosphere.rotation.y += 0.0015;
    sunrise.rotation.y += 0.0015;

    // -------------------------------------
    // FLOATING EFFECT
    // -------------------------------------

    const floatY = Math.sin(time) * 0.05;

    earth.position.y = floatY;
    clouds.position.y = floatY;
    atmosphere.position.y = floatY;
    sunrise.position.y = floatY;

    // Keep everything aligned horizontally

    clouds.position.x = earth.position.x;
    atmosphere.position.x = earth.position.x;
    sunrise.position.x = earth.position.x;

    // -------------------------------------
    // STAR MOVEMENT
    // -------------------------------------

    starsSmall.rotation.y += 0.00002;
    starsMedium.rotation.y += 0.000035;
    starsLarge.rotation.y += 0.00005;

    starsSmall.material.opacity =
        0.65 + Math.sin(time * 2.5) * 0.15;

    starsMedium.material.opacity =
        0.85 + Math.sin(time * 3.5) * 0.10;

    starsLarge.material.opacity =
        0.95 + Math.sin(time * 5.0) * 0.05;

    // -------------------------------------
    // CAMERA MOTION
    // -------------------------------------

    camera.position.x =
        Math.sin(time * 0.40) * 0.35;

    camera.position.y =
        Math.cos(time * 0.30) * 0.15;

    // Only float while NOT zooming

    if (!window.zooming) {

        camera.position.z =
            4.5 + Math.sin(time * 0.20) * 0.08;

    } else {

        camera.position.z +=
            (window.zoomTarget - camera.position.z) * 0.03;

    }

    camera.lookAt(earth.position);

    // -------------------------------------
    // SHOOTING STAR
    // -------------------------------------

    shootingStar.position.x += 1.8;
    shootingStar.position.y -= 0.8;

    if (shootingStar.position.x > 350) {

        resetShootingStar();

    }

    // -------------------------------------
    // RENDER
    // -------------------------------------

    renderer.render(scene, camera);

}


// ======================================================
// START ANIMATION
// ======================================================

animate();


// ======================================================
// WINDOW RESIZE
// ======================================================

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

});


// ======================================================
// OPTIONAL FUNCTIONS
// These can be called from main.js
// ======================================================

// Zoom in toward the Earth
window.startEarthZoom = function () {

    window.zoomTarget = 3.2;
    window.zooming = true;

};

// Return to the normal camera distance
window.resetEarthZoom = function () {

    window.zoomTarget = 4.5;
    window.zooming = false;

};


// ======================================================
// END OF FILE
// ======================================================

if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

var renderer, camera, scene, div, controls;

var aspect = window.innerWidth / window.innerHeight;

SYSTEM = {}

SYSTEM.init = function() {
    var self = this;
    camera = new THREE.PerspectiveCamera(50, aspect, 100, 600000);

    // Camera position
    camera.position.set(30000, 6000, 0);

    // Create a scene
    scene = new THREE.Scene();

    // Create a renderer
    renderer = new THREE.WebGLRenderer({
    	antialias: true
    });

    // renderer settings
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    div = document.getElementById('main_display');
    div.appendChild(renderer.domElement);

    // add resize listener for window resize
    window.addEventListener('resize', self.on_window_resize, false );

    trackballControl(scene);
    self.animate();
    self.create_solar_sys();
}

// define on_window_resize listener
SYSTEM.on_window_resize = function() {
    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (controls)
    	controls.handleResize();
}

// global var solar_sys to store the solar system instance
var solar_sys;

SYSTEM.create_solar_sys = function() {
    // create star from solar_system_info
    var planets = [];
    for (var i = 0; i < planet_info_arr.length; i++) {
        var curr_planet_info = planet_info_arr[i];
        var satellites = [];
        for (var j = 0; j < curr_planet_info.satellites.length; j++) {
            var curr_satellite = curr_planet_info.satellites[j];
            satellites.push(curr_satellite);
        }
        curr_planet_info.satellites = satellites;
        var curr_planet = curr_planet_info;
        planets.push(curr_planet);
    }

    var star = create_star(star_info.radius, star_info.rot_time, planets);

    console.log(star);

    solar_sys = new SolarSystem({
    	name : 'Galaxy',
    	radius : 19000,
    	scene : scene,
	    show_grids : true,
	    star: star
    });
}

SYSTEM.animate = function() {
    requestAnimationFrame(SYSTEM.animate);

    if (solar_sys) {
        solar_sys.parent.traverse(function(child) {
            if (child.animate)
            child.animate();
        });
    }

    if (controls)
    	controls.update();

    renderer.render(scene, camera);
}

SYSTEM.init();
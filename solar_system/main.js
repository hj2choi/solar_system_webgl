
if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

var renderer, camera, scene, div, controls, controller;

var aspect = window.innerWidth / window.innerHeight;

var clock = new THREE.Clock();

SYSTEM = {}

SYSTEM.init = function() {
    var self = this;
    camera = new THREE.PerspectiveCamera(30, aspect, 19, 600000);

    // Camera position
    camera.position.set(30000, 9000, 0);

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

    //trackballControl(scene);
    //Initiate TrackballControls
    /*controller = new THREE.TrackballControls( camera );
				controller.rotateSpeed = 1.0;
				controller.zoomSpeed = 1.2;
				controller.panSpeed = 0.8;
				//controller.noZoom = false;
				//controller.noPan = false;
				controller.staticMoving = true;
				//controller.dynamicDampingFactor = 0.3;
				//controller.keys = [ 65, 83, 68 ];
				controller.addEventListener( 'change', renderer );*/

    Utils.addBackgroundStars(scene,30000);
    // LIGHT
    var light = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(light);
    var light1 = new THREE.PointLight(0xffffff, 2, 30000);
    light1.position.set(0, 0, 0);
    scene.add(light1);
    //Utils.addLensFlare(scene,1000,0,1000,0);

    camera.lookAt(0,0,0);

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
    //controller.handleResize();
}

// global var solar_sys to store the solar system instance
var solar_sys;

SYSTEM.create_solar_sys = function() {
    // create star from solar_system_info
    /*
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
    }*/

    //var star = create_star(star_info.radius, star_info.rot_time, planets);

    var star = {
      radius : 800,
      rot_time : 350,
      satellites : [
        {
          name : 'mercury',
          radius : 150,
          project : true,
          rotation : 0,
          pos : [1600, 0, 0],
          type : 'vividEarth',
          rev_time : 70,
          rot_time : 10,
          satellites : [{
            name : 'moon1',
            radius : 10,
            pos : [140, 0, 0],
            type : 'Moon',
            rev_time : 20,
            rot_time : 3
          }]
        }, {
          name : 'venus',
          radius : 260,
          rotation : 0,
          project : true,
          pos : [2400, 0, 0],
          rev_time : 140,
          rot_time : 30
        }, {
          name : 'earth',
          radius : 300,
          rotation : 0,
          project : true,
          pos : [3400, 0, 0],
          rev_time : 200,
          rot_time : 30,
          satellites : [{
            name : 'OVERLAY:earth_clouds_map.jpg',
            radius : 320,
            pos : [0, 0, 0],
            rev_time : 1000,
            rot_time : 23,
          },{
            name : 'moon',
            radius : 60,
            pos : [540, 0, 0],
            type : 'Moon',
            rev_time : 45,
            rot_time : 3
          }]
        }, {
          name : 'mars',
          radius : 200,
          pos : [4600, 0, 0],
          rev_time : 350,
          project : true,
          rot_time : 30,
          satellites : [{
            name : 'moon2',
            radius : 20,
            pos : [300, 0, 0],
            type : 'Moon',
            rev_time : 15,
            rotation : 0,
            rot_time : 3
          }, {
            name : 'moon3',
            radius : 8,
            pos : [240, 0, 0],
            type : 'Moon',
            rev_time : 20,
            rot_time : 3,
            rotation : -20
          }]
        }, {
          name : 'jupiter',
          radius : 900,
          project : true,
          rotation : 0,
          pos : [8000, 0, 0],
          type : 'vividEarth',
          rev_time : 700,
          rot_time : 100,
          satellites : [{
            name : 'moon1',
            radius : 80,
            rotation : 50,
            pos : [800, 0, 0],
            type : 'Moon',
            rev_time : 200,
            rot_time : 3
          }, {
            name : 'moon3',
            radius : 50,
            rotation : 10,
            pos : [900, 100, 0],
            type : 'Moon',
            rev_time : 100,
            rot_time : 3
          }]
        },{
          name : 'saturn',
          radius : 840,
          project : true,
          rotation : 0,
          pos : [12000, 0, 0],
          type : 'vividEarth',
          rev_time : 1100,
          rot_time : 40,
          satellites : [{
            name : 'moon2',
            radius : 100,
            rotation : 50,
            pos : [1000, 0, 0],
            type : 'Moon',
            rev_time : 200,
            rot_time : 3
          }]
        }, {
          name : 'uranus',
          radius : 550,
          project : true,
          rotation : 0,
          pos : [16000, 0, 0],
          type : 'vividEarth',
          rev_time : 1500,
          rot_time : 180
        }, {
          name : 'neptune',
          radius : 600,
          project : true,
          rotation : 0,
          pos : [19000, 0, 0],
          type : 'vividEarth',
          rev_time : 2400,
          rot_time : 100,
          satellites : [{
            name : 'moon4',
            radius : 30,
            pos : [650, 0, 0],
            type : 'Moon',
            rev_time : 15,
            rotation : 40,
            rot_time : 8
          }, {
            name : 'moon3',
            radius : 60,
            pos : [750, 0, 0],
            type : 'Moon',
            rev_time : 20,
            rot_time : 6,
            rotation : -200
          }, {
            name : 'moon2',
            radius : 50,
            pos : [750, 0, 0],
            type : 'Moon',
            rev_time : 30,
            rot_time : 12,
            rotation : -80
          }]
        }
      ]
    }


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
  var delta = clock.getDelta();

    requestAnimationFrame(SYSTEM.animate);

    if (solar_sys) {
        solar_sys.parent.traverse(function(child) {
            if (child.animate)
            child.animate();
        });
    }

    if (controls)
    	controls.update();
    //controller.update();
    //controller.update(delta);
    renderer.render(scene, camera);
}

SYSTEM.init();
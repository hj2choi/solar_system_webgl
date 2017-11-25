function CelestialBody(body_info_obj) {
    var self = this;

    self.name = body_info_obj.name;
    self.radius = body_info_obj.radius;
    self.rot_time = body_info_obj.rot_time || 1;
    self.rev_time = body_info_obj.rev_time || 0;
    self.satellites_info = body_info_obj.satellites || [];
    self.scene = body_info_obj.scene || null;
    self.is_satellite = body_info_obj.is_satellite || false;


    self.parallel_to_orbit = new THREE.Object3D();
    self.parallel_to_orbit.rotation.x = (Math.PI/180) * (body_info_obj.rotation || 0);

    self.pos = (body_info_obj.pos ? body_info_obj.pos : [0, 0, 0]);

    self.body_obj = new THREE.Object3D();
    self.body_obj.position.set(self.pos[0], 0, self.pos[2]);

    self.center_of_rev = new THREE.Object3D();

    if (body_info_obj.parent && self.is_satellite == false)
        body_info_obj.parent.add(self.body_obj);
    else if (body_info_obj.parent && self.is_satellite) {
        self.parallel_to_orbit.add(self.center_of_rev);
        self.center_of_rev.add(self.body_obj);
        body_info_obj.parent.add(self.parallel_to_orbit);
    }

    self.draw();
    self.draw_satellites();
    self.animations();
    self.draw_rev_circles();

    return self;
}

CelestialBody.prototype.draw = function() {
    var self = this;
    var material;

    // sun
    if (!self.name) {
      material = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        map: new THREE.TextureLoader().load("textures/sunmap.jpg"),
        wireframe: false,
        transparent: true,
        opacity: 1.0,
        visible:true
      });
    }
    // planets
    else if (PLANET_NAMES.indexOf(self.name)!=-1) {
      material = Materials.loadPlanetMat(PLANET_NAMES.indexOf(self.name));
    }
    // clouds and stuff
    else if (self.name.startsWith("OVERLAY")) {
      info = self.name.substr(8);
      //console.log(info);
      material = Materials.loadSphereMat(info, 0.8, 0.1, 0.3);
    }
    // satellites or unspecified
    else {
      material = Materials.loadSatelliteMat(self.name);
    }

    var geometry = new THREE.SphereGeometry(self.radius, 16, 16);

    self.body_mesh = new THREE.Mesh(geometry, material);

    self.body_obj.add(self.body_mesh);
}

CelestialBody.prototype.draw_satellites = function() {
    var self = this;
    var draw_satellite = function(sat_info1) {
        sat_info1.is_satellite = true;
        sat_info1.scene = scene;
        sat_info1.parent = self.body_obj;
        new CelestialBody(sat_info1);
    };

    for (var i = 0; i < self.satellites_info.length; i++) {
        draw_satellite(self.satellites_info[i]);
    }

    /*var self = this;

    console.log(self.satellites_info);
        self.satellites_info.forEach(function(dt) {
    	dt['is_satellite'] = true;

    	dt['scene'] = scene;
    	console.log(scene);
    	console.log(self.scene);

    	dt.parent = self.body_obj;
    	var pl = new CelestialBody(dt);
        });*/
}

// add animations
CelestialBody.prototype.animations = function() {
    var self = this;

    self.animation_func_arr = [];

    // rotation
    self.animation_func_arr.push(function() {
        self.body_mesh.rotation.y += 1 / self.rot_time;
    });

    // revolution
    if (self.center_of_rev) {
        self.animation_func_arr.push(function() {
            self.center_of_rev.rotation.y += 1 / self.rev_time;
        });
    }

    self.body_obj.animate = function() {
        self.animation_func_arr.forEach(function(animation_func) {
            animation_func();
        });
    };
}

CelestialBody.prototype.draw_rev_circles = function() {
}

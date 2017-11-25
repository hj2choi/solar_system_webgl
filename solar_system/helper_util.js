OBJ_TYPES = {
    STAR: 'star',
    PLANET: 'planet',
    SATELLITE: 'satellite'
};

function create_satellite(name, radius, rotation, pos, type, rev_time, rot_time) {
    return {
        name : name,
        radius : radius,
        rotation : rotation,
        pos : pos,
        type : type,
        rev_time : rev_time,
        rot_time : rot_time
    };
}

function create_planet(name, radius, rotation, pos, type, rev_time, rot_time, satellites) {
    return {
        name : name,
        radius : radius,
        pos : pos,
        type : type,
        rev_time : rev_time,
        rot_time : rot_time,
        satellites : satellites
    };
}

function create_star(radius, rot_time, satellites) {
    return {
        radius : radius,
        rot_time : rot_time,
        satellites : satellites
    };
}

/*

1. satellite prototype

{
    name : string,
    radius : number,
    rotation : angle in number,
    pos : [x, y, z],
    type : OBJ_TYPES.ENUM,
    rev_time : revolution period in number,
    rot_time : rotation period in number
}

2. planet prototype

{
    name : string,
    radius : number,
    rotation : angle in number,
    pos : [x, y, z],
    type : OBJ_TYPES.ENUM,
    rev_time : revolution period in number,
    rot_time : rotation period in number,
    satellites : satellite array from create_satellites
}

3. star prototype

{
    radius : number,
    rot_time : rotation period in number,
    satellites: satellite array from create_planets
}

*/
Utils = {}

Utils.addBackgroundStars = function(scene, distance) {
  var stars_geometry = new THREE.Geometry();
  var stars_material = new THREE.ParticleBasicMaterial({color:0xe6e6fa, opacity:0.3, size:1,sizeAttenuation:false});
  var background_stars;
  for (var i =0; i<5000; ++i) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random()*2-1;
    vertex.y = Math.random()*2-1;
    vertex.z = Math.random()*2-1;
    vertex.multiplyScalar(distance);
    stars_geometry.vertices.push(vertex);
  }
  background_stars = new THREE.ParticleSystem(stars_geometry, stars_material);
  background_stars.scale.set(20,20,20);
  scene.add(background_stars);

  var stars_geometry = new THREE.Geometry();
  var stars_material = new THREE.ParticleBasicMaterial({color:0xa6a6da, opacity:1, size:1,sizeAttenuation:false});
  var background_stars;
  for (var i =0; i<5000; ++i) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random()*2-1;
    vertex.y = Math.random()*2-1;
    vertex.z = Math.random()*2-1;
    vertex.multiplyScalar(distance);
    stars_geometry.vertices.push(vertex);
  }
  background_stars = new THREE.ParticleSystem(stars_geometry, stars_material);
  background_stars.scale.set(20,20,20);
  scene.add(background_stars);

  var stars_geometry = new THREE.Geometry();
  var stars_material = new THREE.ParticleBasicMaterial({color:0xe6e6fa, opacity:0.8, size:2,sizeAttenuation:false});
  var background_stars;
  for (var i =0; i<500; ++i) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random()*2-1;
    vertex.y = Math.random()*2-1;
    vertex.z = Math.random()*2-1;
    vertex.multiplyScalar(distance);
    stars_geometry.vertices.push(vertex);
  }
  background_stars = new THREE.ParticleSystem(stars_geometry, stars_material);
  background_stars.scale.set(20,20,20);
  scene.add(background_stars);
}


Utils.addLensFlare = function(scene, radius, x, y, z) {

  var textureLoader = new THREE.TextureLoader();

  var textureFlare0 = textureLoader.load( "textures/lensflare0.png" );
  //var textureFlare2 = textureLoader.load( "textures/lensflare2.png" );
  //var textureFlare3 = textureLoader.load( "textures/lensflare3.png" );
  h = 0.8;
  s = 0.9;
  l = 0.5;

  var flareColor = new THREE.Color( 0xffffff );
  flareColor.setHSL( h, s, l + 0.5 );

  var lensFlare = new THREE.LensFlare( textureFlare0, 200, 0, THREE.AdditiveBlending, flareColor );

  //lensFlare.add( textureFlare2, 100, 0.0, THREE.AdditiveBlending );
  //lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
  //lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );

  //lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
  //lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
  //lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
  //lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );

  //lensFlare.customUpdateCallback = lensFlareUpdateCallback;
  //lensFlare.position.copy( light.position );
  lensFlare.position.set( x, y, z );

  scene.add( lensFlare );
}


Utils.addSun = function(scene, radius, x,y,z) {
  var map = THREE.ImageUtils.loadTexture( "textures/lensflare0.png" );
  var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true, transparent:false, alphaMap:map,blending:THREE.AdditiveBlending} );
  var sprite = new THREE.Sprite( material );
  sprite.scale.set(8000,8000,8000);
  sprite.position.set(0,300,0);
  scene.add( sprite );
}

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

var trackballControl = function() {
    controls = new THREE.TrackballControls( camera );

    // only need to modify the following properties: staticMoving (default to false)
    controls.staticMoving = true;
}

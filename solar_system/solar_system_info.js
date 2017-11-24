PLANETS = {
    MERCURY: 0,
    VENUS: 1,
    EARTH: 2,
    MARS: 3,
    JUPITER: 4,
    SATURN: 5,
    URANUS: 6,
    NEPTUNE: 7
};

var satellite_info_arr = [
    // MERCURY
    [{
        name : '1',
        radius : 100,
    	rotation : 50,
        pos : [1300, 0, 0],
        type : OBJ_TYPES.SATELLITE,
        rev_time : 200,
        rot_time : 3
      },
      {
        name : '2',
        radius : 60,
    	rotation : 10,
        pos : [1300, 100, 0],
        type : OBJ_TYPES.SATELLITE,
        rev_time : 100,
        rot_time : 3
    }]
];

var planet_info_arr = [
    // MERCURY
    {
        name : 'Earth',
        radius : 1000,
        rotation : 40,
        pos : [6400, 550, 0],
        type : OBJ_TYPES.SATELLITE,
        rev_time : 700,
        rot_time : 100
    }
];

// set up planets completely
for (var i = 0; i < planet_info_arr.length; i++) {
    planet_info_arr[i].satellites = satellite_info_arr[i];
}

var star_info = {
    radius : 700,
    rot_time : 350,
    satellites: planet_info_arr
};

/*
var star = {
    	    radius : 700,
    	    rotation_time : 350,
	    propagation : {
            enabled : true,
            speed : 70,
            max : 14000,
            min : 700
	    },
    	    satellites : [
		{
    		    name : 'Earth',
		    radius : 1000,
		    project : true,
		    rotation : 40,
    		    coordinates : [6400, 550, 0],
    		    type : 'vividEarth',
    		    revolution_time : 700,
    		    rotation_time : 100,
    		    satellites : [{
    			name : 'Lune',
    			radius : 100,
			rotation : 50,
    			coordinates : [1300, 0, 0],
    			type : 'Moon',
    			revolution_time : 200,
    			rotation_time : 3
    		    },{
    			name : 'Lune',
    			radius : 60,
			rotation : 10,
    			coordinates : [1300, 100, 0],
    			type : 'Moon',
    			revolution_time : 100,
    			rotation_time : 3
    		    }]
		},
		{
    		name : 'Earth',
    		radius : 100,
		project : true,
		    rotation : 19,
    		coordinates : [1400, 550, 0],
    		type : 'vividEarth',
    		revolution_time : 70,
    		rotation_time : 10,
    		satellites : [{
    		    name : 'Lune',
    		    radius : 10,
    		    coordinates : [140, 0, 0],
    		    type : 'Moon',
    		    revolution_time : 20,
    		    rotation_time : 3
    		}]
    	    }, {
	    	name : 'Orion',
	    	radius : 230,
		rotation : -20,
		project : true,
	    	coordinates : [-1800, -400, -400],
	    	revolution_time : 130,
	    	rotation_time : 30
	    }, {
		name : 'Megathron',
		radius : 530,
		rotation : 130,
		project : true,
		coordinates : [3800, 90, -400],
		revolution_time : 230,
	    	rotation_time : 30,
		satellites : [{
    		    name : 'Lune',
    		    radius : 30,
    		    coordinates : [620, 0, 0],
    		    type : 'Moon',
    		    revolution_time : 45,
    		    rotation_time : 3
    		}]
	    }, {
		name : 'Megathron',
		radius : 300,
		coordinates : [-4800, -1130, 1800],
		revolution_time : 330,
		project : true,
	    	rotation_time : 30,
    		satellites : [{
    		    name : 'Lune',
    		    radius : 30,
    		    coordinates : [360, 0, 0],
    		    type : 'Moon',
    		    revolution_time : 15,
		    rotation : 45,
    		    rotation_time : 3
    		}, {
		    name : 'Lune',
    		    radius : 10,
    		    coordinates : [330, 0, 0],
    		    type : 'Moon',
    		    revolution_time : 20,
    		    rotation_time : 3,
		    rotation : -20
    		}]
	    }]}
	    */
## Solar System Visualized

# Execution guide
python -m http.server 8000
enter URL localhost:8000 in web browser (tested with Python 3.6 and Chrome)


# Directory and files

index.html:

CelestialBody.js: handles recursive rendering of each planet / satellite

gui.js: ui objects and event handlers

helper_util.js:

materials.js:

SolarSystem.js: creates and maintains data structure for objects in the scene.

./textures: includes image files that are used as textures

./lib: includes external libraries used in the project, such as three.js and TrackballControls.js

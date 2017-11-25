function displayGUI() {
  var gui = new dat.GUI();
  var jar;
  var gui_step = 0.1;


  parameters = {
    a: "cube",
    b: "Cube",
    c: true,
    d: "#0000ff",
    e: "",
    f: "",
    g:1,h:1,i:1,
    camera_focus:"Sun",
    play:true,
    playback_speed:1,
    show_wireframe:false
  }

  var playback_folder = gui.addFolder('playback');
  var play = playback_folder.add(parameters, 'play').name('play');
  play.onChange(onChangePlay);
  var playback_speed = playback_folder.add(parameters, 'playback_speed').min(0).max(5).step(gui_step).name('speed');
  playback_speed.onChange(onChangePlaybackSpeed);
  playback_folder.open();

  var camera_folder = gui.addFolder('camera control');
  var camera_focus = camera_folder.add(parameters, 'camera_focus', ["Sun","Earth", "Jupiter", "NewPlanet","newPlanet2"]).name('Look at');
  camera_focus.onChange(onChangeCameraFocus);
  camera_folder.open();

  var graphics_folder = gui.addFolder('graphics');
  var show_wireframe = graphics_folder.add(parameters, 'show_wireframe').name('show wireframe');
  show_wireframe.onChange(onChangeWireframeDisplay);
  graphics_folder.open();
/*
  var folder1 = gui.addFolder('folder1');
  var folder2 = gui.addFolder('position');
  var folder3 = gui.addFolder('layers');


  folder1.add(parameters, 'a').name('Name');
  folder1.add(parameters, 'b', ["Cube", "Sphere", "Prism"]).name('Planets');
  folder1.add(parameters, 'c').name('Show Wireframe');
  folder1.addColor(parameters, 'd').name('Color');


  folder2.add(parameters, 'g').min(1).max(20).step(gui_step).name('x-axis');
  folder2.add(parameters, 'h').min(1).max(20).step(gui_step).name('y-axis');
  folder2.add(parameters, 'i').min(1).max(20).step(gui_step).name('z-axis');

  folder3.add(parameters, 'e', [1,2,3,4,5]).name('layer');
*/

  gui.open();


}

function onChangePlay(param) {
  //console.log("play = "+param);
  option_play = param;
}

function onChangePlaybackSpeed(param) {
  console.log("playback_speed = "+param);
}

function onChangeCameraFocus(param) {
  console.log("focusing on "+param);
}

function onChangeWireframeDisplay(param) {
  console.log("show wireframe = "+param);
}

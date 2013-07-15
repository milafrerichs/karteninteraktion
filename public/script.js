function pan(map,hand_position,hand_position_before,elbow_position) {
  if(hand_position.length > 2 && elbow_position.length > 2) {
    if(hand_position[1] > elbow_position[1] && hand_position[0] > elbow_position[0]) {
      treshold = elbow_position[1]*1.1;
      if (hand_position[0]+treshold > elbow_position[0] || hand_position[0]-treshold < elbow_position[0] ) {
        if (hand_position_before.length > 2) {
          if (hand_position[0] > hand_position_before[0]*1.5 && hand_position[0] != hand_position_before[0]) {
            console.log("pan");
            map.panBy([5, 5]);
          }
        }
      }
    }
  }
}


$(document).ready(function() {

    var api_key = "5417a6b95e8544b7a8814ac874ebd27b"

    var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/'+api_key+'/{styleId}/256/{z}/{x}/{y}.png',
        cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade';

    var minimal   = L.tileLayer(cloudmadeUrl, {styleId: 22677, attribution: cloudmadeAttribution}),
        midnight  = L.tileLayer(cloudmadeUrl, {styleId: 999,   attribution: cloudmadeAttribution}),
        motorways = L.tileLayer(cloudmadeUrl, {styleId: 46561, attribution: cloudmadeAttribution});
    var map = L.map('map',{layers: [minimal, motorways]}).setView([51.505, -0.09], 13);
    var baseMaps = {
        "Minimal": minimal,
        "Night View": midnight
    };

    L.control.layers(baseMaps).addTo(map);

var kinect = openni('/skeleton');
jointNames = [
  "head",
  "neck",
  "torso",
  "waist",
  "left_collar",
  "left_shoulder",
  "left_elbow",
  "left_wrist",
  "left_hand",
  "left_fingertip",
  "right_collar",
  "right_shoulder",
  "right_elbow",
  "right_wrist",
  "right_hand",
  "right_fingertip",
  "left_hip",
  "left_knee",
  "left_ankle",
  "left_foot",
  "right_hip",
  "right_knee",
  "right_ankle",
  "right_foot"
];
userId = 0;

kinect.on('Wave', function(gesture) {
  console.log('wave');
});
kinect.on('Click', function(gesture) {
  console.log('click');
});

kinect.on('newuser', function(userId) {
  userId = userId;
  console.log('newuser', userId);
});
//context.setJoints(['left_elbow', 'left_hand']);
date_before = new Date();
time_before = date_before.getMilliseconds();
ms = 0;
var position_left_elbow, position_left_hand, position_left_hand_before, position_right_elbow, position_right_hand, position_right_hand_before = [];
jointNames.forEach(function(jointName) {
  kinect.on(jointName, function(userId, x, y, z) {
    if(jointName == "left_hand") {
      position_left_hand = [parseInt(x),parseInt(y),parseInt(z)];
      date_now = new Date();
      time = date_now.getMilliseconds();

    }
    if(jointName == "left_elbow") {
      position_left_elbow = [parseInt(x),parseInt(y),parseInt(z)];
    }
    if(jointName == "right_hand") {
      position_right_hand = [parseInt(x),parseInt(y),parseInt(z)];
    }
    if(jointName == "right_elbow") {
      position_right_elbow = [parseInt(x),parseInt(y),parseInt(z)];
    }
    //pan(map,position_left_hand,position_left_hand_before,position_left_elbow);
    //position_left_hand_before = position_left_hand;

    //pan(map,position_right_hand,position_right_hand_before,position_right_elbow);
    //position_right_hand_before = position_right_hand;


  });
});
[
  'posedetected',
  'calibrationstart',
  'calibrationsuccess',
  'calibrationfail',
  'gesturerecognized'
].forEach(function(userEventType) {
  kinect.on(userEventType, function(userId) {
    console.log(userEventType + ' (' + userId + ')');
  });
});
});

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
kinect.on('newuser', function(userId) {
  userId = userId;
  console.log('newuser', userId);
});
jointNames.forEach(function(jointName) {
  kinect.on(jointName, function(userId, x, y, z) {
    if(jointName == "left_hand") {
      console.log('moved to (' + x + ', ' + y + ', ' + z + ')');
    }
    //console.log('The joint ' + jointName + ' of user ' + userId +
      //' moved to (' + x + ', ' + y + ', ' + z + ')');
  });
});
[
  'posedetected',
  'calibrationstart',
  'calibrationsuccess',
  'calibrationfail'
].forEach(function(userEventType) {
  kinect.on(userEventType, function(userId) {
    console.log(userEventType + ' (' + userId + ')');
  });
});

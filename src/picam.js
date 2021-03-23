"use strict";

const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/test1.jpg`,
  width: 640,
  height: 480,
  nopreview: true,
});
 
myCamera.snap()
  .then((result) => {
    // Your picture was captured
  })
  .catch((error) => {
     // Handle your error
  });
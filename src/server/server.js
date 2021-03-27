import express from 'express';
import i2cBus from "i2c-bus";
import {Pca9685Driver} from "pca9685";
import Servo from "./servo.js";
import Robot from './robot.js';


const app = express();
const port = 3001;

const options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 30,
    debug: false
};



process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

const pulseLengths = [950, 1300];
const steeringChannel = 3;

var pwm;
var nextPulse = 0;
var timer;
var pulse;
var linkEstablished = false;
var leftWrist;
var rightWrist;
var rightClaw;
var leftClaw;
var robo;


// function servoLoop(steeringChannel, pulse) {
//     pwm.setPulseLength(steeringChannel, pulse);
// }
function setup() {
    pwm = new Pca9685Driver(options, (err) => {
        if (err) {
            console.error("Error initializing PCA9685");
            console.log(err);
            // process.exit(-1);
        } else {
            console.log("Servo link established");
            linkEstablished = true;
            robo = new Robot(pwm);
        }

    });
};

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }

    pwm.dispose();

    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
}

app.get('/', (req, res) => {
    res.send("Try turning the servos");
})

app.get('/move', (req, res) => {
    if (linkEstablished) {
        robo.executeSingleMove(req.query.limb, parseInt(req.query.dir));
        // rightWrist.setPulse(parseInt(req.query.pulse));
        res.send("Receieved request for "+req.query.limb);
    } else {
        res.send("No link established")
    }
 })

app.get('/status', (req, res) => {
    if (linkEstablished) {
        return res.send("1");
    } else {
        return res.send("0");
    }
})

app.get('/getstate', (req, res) => {
    if (linkEstablished) {
        return res.send("1");
    } else {
        return res.send("0");
    }
})



const server = app.listen(port, () => {
    console.log("Starting server. Will try to establish link to the PCA driver");
    setup();

    // pwm = new Pca9685Driver(options, (err) => {
    //     if (err) {
    //         console.error("Error initializing PCA9685");
    //         console.log(err);
    //         // process.exit(-1);
    //     } else {
    //         console.log("Servo link established");
    //         linkEstablished = true;
    //     }

    // })
});

import Servo from './servo.js';
import Claw from './claw.js';
import Wrist from './wrist.js';

export default class Robot {
    constructor(pwm) {
        var rightClaw, leftClaw, rightWrist, leftWrist;
        this.pwm=pwm;
        this.rightClaw = new Claw(3, "rightClaw", 890, 1300, 890, pwm);
        this.leftClaw = new Claw(1, "leftClaw", 1850, 2100, 1850, pwm);
        this.leftWrist = new Wrist(0, "leftArm", 800, 2200, 1500, pwm);
        this.rightWrist = new Wrist(2, "rightWrist", 800, 2120, 1500, pwm);
    };

    async Home() {
        this.rightClaw.Home()
        .then(this.leftClaw.Home())
        .then(this.leftWrist.Home())
        .then(this.rightWrist.Home());
    };

    getState() {
        return {
            'left': this.leftWrist.getCurrentState(),
            'right': this.rightWrist.getCrrentState()
        };
    };

    willGearsCollide(limb, pulse) {
        if (limb==="rightClaw" | limb==="leftClaw") {
            return false;
        };

        if (limb === "leftWrist") {
            if ((this.leftWrist.SimulateMove(pulse) === 2 | this.leftWrist.SimulateMove(pulse) === 0) & (this.rightWrist.getCurrentState() === 2 | this.rightWrist.getCurrentState() === 0)) {
                return true;
            }
        };

        if (limb === "rightWrist") {
            if ((this.rightWrist.SimulateMove(pulse)===2 | this.rightWrist.SimulateMove(pulse)===0) & (this.leftWrist.getCurrentState()===2 | this.leftWrist.getCurrentState()===0)) {
                return true;
            }
        };

        return false;
    };

    executeSingleMove(limb, pulse) {
        if (limb=="rightClaw") {
            this.rightClaw.isOpened?this.rightClaw.Close():this.rightClaw.Open();
        };
        if (limb=="leftClaw") {
            this.leftClaw.isOpened?this.leftClaw.Close():this.leftClaw.Open();
            };
        if (limb=="leftWrist") {
            if (this.willGearsCollide(limb, pulse)) {
                if (this.rightClaw.isOpened) {
                    this.rightWrist.Home();
                } else {
                    this.rightClaw.Open()
                    .then(this.rightWrist.Home())
                    .then(this.rightClaw.Close());
                }
                // this.rightWrist.Home();
                console.log('leftwrist will collide');
            } else {
                // return 1;
                console.log('leftwrist will not collide');
                pulse === 1 ? this.leftWrist.Move() : this.leftWrist.MovePrime();
            };
            };
        if (limb=="rightWrist") {
            if (this.willGearsCollide(limb, pulse)) {
                if (this.leftClaw.isOpened) {
                    this.leftWrist.Home();
                } else {
                    this.leftClaw.Open()
                    .then(this.leftWrist.Home())
                    .then(this.leftClaw.Close())
                    .then(pulse === 1 ? this.rightWrist.Move() : this.rightWrist.MovePrime());
                }
                // this.rightWrist.Home();
                console.log('rightwrist will collide');
            } else {
                // return 1;
                console.log('rightwrist will not collide');
                pulse === 1 ? this.rightWrist.Move() : this.rightWrist.MovePrime();
            };
            };
    };

    };

    // executeMoveSequence() {
    //     return 1;
    // }
// }
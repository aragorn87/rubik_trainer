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
    }

    Home() {
        this.rightClaw.Home();
        this.leftClaw.Home();
        this.leftWrist.Home()
        this.rightWrist.Home();
    }

    willGearsCollide(limb, pulse) {
        if (limb==="rightClaw" | limb==="leftClaw") {
            return False;
        }


    }

    executeSingleMove(limb, pulse) {
        if (limb=="rightClaw") {
            this.rightClaw.isOpened?this.rightClaw.Close():this.rightClaw.Open();
        };
        if (limb=="leftClaw") {
            this.leftClaw.isOpened?this.leftClaw.Close():this.leftClaw.Open();
            };
        if (limb=="leftWrist") {
            if (pulse==1) {
                if ((this.leftWrist.SimulateMove(1)==2 | this.leftWrist.SimulateMove(1)==0) & (this.rightWrist.getCurrentState()==2 | this.rightWrist.getCurrentState()==0)) {
                    this.rightWrist.Home();
                    // return -1
                }
                this.leftWrist.Move();
            } else {
                if ((this.leftWrist.SimulateMove(0)==2 | this.leftWrist.SimulateMove(0)==0) & (this.rightWrist.getCurrentState()==2 | this.rightWrist.getCurrentState()==0)) {
                    return -1
                }
                this.leftWrist.MovePrime();
            }
            };
            if (limb=="rightWrist") {
                if (pulse==1) {
                    if ((this.rightWrist.SimulateMove(1)==2 | this.rightWrist.SimulateMove(1)==0) & (this.leftWrist.getCurrentState()==2 | this.leftWrist.getCurrentState()==0)) {
                        return -1
                    }
                    this.rightWrist.Move();
                } else {
                    if ((this.rightWrist.SimulateMove(0)==2 | this.rightWrist.SimulateMove(0)==0) & (this.leftWrist.getCurrentState()==2 | this.leftWrist.getCurrentState()==0)) {
                        return -1
                    }
                    this.rightWrist.MovePrime();
                }
                };
        };

    };

    // executeMoveSequence() {
    //     return 1;
    // }
// }
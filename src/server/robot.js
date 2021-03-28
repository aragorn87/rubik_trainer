import Servo from './servo.js';
import Claw from './claw.js';
import Wrist from './wrist.js';
import MoveConstraints from './moves.js';

export default class Robot {
    constructor(pwm) {
        var rightClaw, leftClaw, rightWrist, leftWrist;
        this.pwm=pwm;
        this.rightClaw = new Claw(3, "rightClaw", 875, 1300, 875, pwm);
        this.leftClaw = new Claw(1, "leftClaw", 1820, 2100, 1820, pwm);
        this.leftWrist = new Wrist(0, "leftArm", 800, 2150, 1500, pwm);
        this.rightWrist = new Wrist(2, "rightWrist", 800, 2160, 1500, pwm);
        this.initState=false;
    };

    Home() {
        return this.rightClaw.Home()
        .then(this.leftClaw.Home())
        .then(this.leftWrist.Home())
        .then(this.rightWrist.Home());
    };

    initCube() {
        if(!this.initState) {
            this.Home();
            this.rightClaw.Init();
            this.leftClaw.Init();
            this.initState=true;
        } else {
            this.rightClaw.Close();
            this.leftClaw.Close();
            this.initState=false;
        }

    }

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
            return this.rightClaw.isOpened?this.rightClaw.Close():this.rightClaw.Open();
        };
        if (limb=="leftClaw") {
            return this.leftClaw.isOpened?this.leftClaw.Close():this.leftClaw.Open();
            };
        if (limb=="leftWrist") {
            if (this.willGearsCollide(limb, pulse)) {
                if (this.rightClaw.isOpened) {
                    return this.rightWrist.Home()
                    .then(()=>{
                        pulse === 1 ? this.leftWrist.Move(): this.leftWrist.MovePrime();
                    });
                } else {
                    return this.rightClaw.Open()
                    .then(()=>{
                        this.rightWrist.Home()
                        .then(()=>{
                            this.rightClaw.Close()
                            .then(()=>{
                                pulse === 1 ? this.leftWrist.Move(): this.leftWrist.MovePrime();
                            });
                        });
                    })
                }
            } else {
                return pulse === 1 ? this.leftWrist.Move(): this.leftWrist.MovePrime();
            };
            };
            if (limb=="rightWrist") {
                if (this.willGearsCollide(limb, pulse)) {
                    if (this.leftClaw.isOpened) {
                        return this.leftWrist.Home()
                        .then(()=>{
                            pulse === 1 ? this.rightWrist.Move(): this.rightWrist.MovePrime();
                        });
                    } else {
                        return this.leftClaw.Open()
                        .then(()=>{
                            this.leftWrist.Home()
                            .then(()=>{
                                this.leftClaw.Close()
                                .then(()=>{
                                    pulse === 1 ? this.rightWrist.Move(): this.rightWrist.MovePrime();
                                });
                            });
                        })
                    }
                } else {
                    return pulse === 1 ? this.rightWrist.Move(): this.rightWrist.MovePrime();
                };
                };
    };

    convertToAtomicMoves(move) {
        var listOfMoves=[];
        const multiplier = move.includes("'")?-1:1;
        const scaler = move.includes("2")?2:1;
        const dir = multiplier*scaler;
        console.log(dir)

        MoveConstraints.forEach((moveObj)=>{
            if (moveObj.move===move[0]) {
                if (moveObj.isAtomic) {
                    if (this.leftClaw.isOpened===moveObj.isLeftClawOpenBeforeMoving) {
                        if (this.rightClaw.isOpened===moveObj.isrightClawOpenBeforeMoving) {
                            //do nothing
                        } else {
                            listOfMoves.push({
                                limb:'rightClaw',
                                dir:dir});
                        }
                    } else {
                        if (!moveObj.isLeftClawOpenBeforeMoving) {
                            listOfMoves.push({
                                limb:'leftClaw',
                                dir:dir});
                            if (this.rightClaw.isOpened===moveObj.isrightClawOpenBeforeMoving) {
                                //do nothing
                            } else {
                                listOfMoves.push({
                                    limb:'rightClaw',
                                    dir:dir});
                            } 
                        } else {
                            if (this.rightClaw.isOpened) {
                                listOfMoves.push({
                                    limb:'rightClaw',
                                    dir:multiplier*scaler});
                                listOfMoves.push({
                                    limb:'leftClaw',
                                    dir:multiplier*scaler});
                            } else {
                                listOfMoves.push({
                                    limb:'leftClaw',
                                    dir:dir});
                                if (this.rightClaw.isOpened===moveObj.isrightClawOpenBeforeMoving) {
                                    //do nothing
                                } else {
                                    listOfMoves.push({
                                        limb:'rightClaw',
                                        dir:dir});
                                }
                            }
                        }
                    }
                    listOfMoves.push({
                        limb:moveObj.limb,
                        dir:moveObj.direction
                    });
                    //pre-flight
                    //execute
                } else {
                    //
                    moveObj.subMoves.forEach(move=>{
                        var tempArray = this.convertToAtomicMoves(move);
                        tempArray.forEach(_moves=>listOfMoves.push(_moves));
                        // listOfMoves.push(this.convertToAtomicMoves(move));
                    });
                }
            }
        })
        return listOfMoves;
    }

    executeMoveSequence(array) {
        return new Promise(resolve=>{
            if (array.length===0) {
                resolve();
            } else {
                const nextMove = array.pop();
                console.log(array)
                console.log(nextMove.limb, nextMove.dir);
                return this.executeSingleMove(nextMove.limb, nextMove.dir)
                .then(()=>{
                    this.executeMoveSequence(array); 
                });
            }
        })

    }

    executeNamedMove(move) {
        var movesList = this.convertToAtomicMoves(move);
        movesList.reverse();
        return this.executeMoveSequence(movesList);
    }

    };

    // executeMoveSequence() {
    //     return 1;
    // }
// }
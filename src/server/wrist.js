import Servo from './servo.js';

export default class Wrist extends Servo {
    constructor(channelId, name, minPulse, maxPulse, startPos, pcaHandler) {
        var logicalSeq;
        super(channelId, name, minPulse, maxPulse, startPos, pcaHandler);
        this.logicalSeq = [minPulse, startPos, maxPulse];
    };

    getCurrentState() {
        return this.logicalSeq.indexOf(this.currentPos);
    };

    SimulateMove(dir) {
        var currentIndex = this.getCurrentState();
        if (dir>0) {
            return (currentIndex+dir) % this.logicalSeq.length;
        } else {
            return (currentIndex+dir)<0?this.logicalSeq.length+currentIndex+dir:(currentIndex+dir);
        }
    }; 

    Move(dir) {
        var currentIndex = this.getCurrentState();
        if (currentIndex==-1) {
            return;
        } else {
            this.setPulse(this.logicalSeq[(currentIndex+1) % this.logicalSeq.length]);
        }

    };

    MovePrime() {
        var currentIndex = this.getCurrentState();
        if (currentIndex==-1) {
            return;
        } else {
            this.setPulse(this.logicalSeq[(currentIndex-1)<0?this.logicalSeq.length-1:(currentIndex-1)]);
        }

    };
}
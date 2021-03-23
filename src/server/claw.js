import Servo from './servo.js';

export default class Claw extends Servo {
    constructor(channelId, name, minPulse, maxPulse, startPos, pcaHandler) {
        super(channelId, name, minPulse, maxPulse, startPos, pcaHandler);
        this.isOpened = false;
    };

    Open(){
        if (!this.isOpened){
            if(this.currentPos!=this.min){
                this.setPulse(this.min);
            }  else {
                this.setPulse(this.max);
            };
            this.isOpened=true;
        };
    };

    Close(){
        if (this.isOpened){
            if(this.currentPos!=this.min){
                this.setPulse(this.min);
            }  else {
                this.setPulse(this.max);
            };
            this.isOpened = false;
        };
    };
}
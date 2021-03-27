import Servo from './servo.js';

export default class Claw extends Servo {
    constructor(channelId, name, minPulse, maxPulse, startPos, pcaHandler) {
        super(channelId, name, minPulse, maxPulse, startPos, pcaHandler);
        this.isOpened = false;
    };

    Open(){
        console.log(Date.now());
        console.log("Entering open loop now");
        if (!this.isOpened){
            if(this.currentPos!=this.min){
                this.isOpened=true;
                console.log("opened");
                return this.setPulse(this.min);
            }  else {
                this.isOpened=true;
                console.log("opened");
                return this.setPulse(this.max);
            };
        };
    };

    Close(){
        console.log(Date.now());
        console.log("Entering close loop now");
        if (this.isOpened){
            if(this.currentPos!=this.min){
                this.isOpened = false;
                console.log("closed");
                return this.setPulse(this.min);
                
            }  else {
                this.isOpened = false;
                console.log("closed");
                return this.setPulse(this.max);
            };
        };

    };
}
export default class Servo {
    constructor(channelId, name, minPulse, maxPulse, startPos, pcaHandler) {
        this.id=channelId;
        this.name=name;
        this.min=minPulse;
        this.max=maxPulse;
        this.pcaHandler = pcaHandler;
        this.startPos=startPos;
        this.currentPos=startPos;
        this.pcaHandler.setPulseLength(this.id, startPos);
    }
    
    setPulse(newPulse) {
        return new Promise(resolve => {
            var incremental;
            if(newPulse<this.minPulse | newPulse>this.maxPulse) {
                resolve();
            } else {
                while (this.currentPos!=newPulse) {
                    if (newPulse>this.currentPos) {
                        incremental = 5;
                    } else {
                        incremental = -5;
                    }
                    this.pcaHandler.setPulseLength(this.id, this.currentPos+incremental);
                    this.currentPos = this.currentPos + incremental;
                setTimeout(() => {this.setPulse(newPulse)}, 50);
                }
                resolve();
            }
        });

    }
 
    Home() {
        return new Promise(resolve => {
            console.log("Homing " + this.name);
            // this.pcaHandler.setPulseLength(this.id, this.startPos);
            this.setPulse(this.startPos);
            this.currentPos=this.startPos;
            resolve();
        });
    }
};